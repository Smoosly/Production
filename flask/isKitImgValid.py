from turtle import right
from flask import request, jsonify, Blueprint
from operator import itemgetter
from scipy.interpolate import interp1d
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import pymysql
import math
import json
import cv2
import os
import logging
import logging.handlers
from slack_sdk import WebClient

log = logging.getLogger("isKitImgValid")
log.setLevel(logging.DEBUG)

formatter = logging.Formatter("[%(levelname)s] (%(filename)s:%(lineno)d) > %(message)s")

fileHandler = logging.FileHandler("logs/isKitImgValid.log")
streamHandler = logging.StreamHandler()

fileHandler.setFormatter(formatter)
streamHandler.setFormatter(formatter)

log.addHandler(fileHandler)
log.addHandler(streamHandler)

log.info("logtest")
blueprint = Blueprint("isKitImgValid", __name__, url_prefix="/")

kitPath = "../KitUploads/"
lsPath = "../LowerShapes/"

matplotlib.use("Agg")

myToken = "xoxb-2373155174243-3168997936240-3X35cyzmitJ90mwiAt8C8pXY"
slackKit = WebClient(token = myToken)

with open("config.json", "r") as f:
    config = json.load(f)

def getVolume(mINNER_LEN, mINNER_WIDTH_LC, mOUTER_LEN, mOUTER_WIDTH_LC, mHEIGHT):
        height = []
        candidate = []
        if mINNER_WIDTH_LC < mINNER_LEN:
                height.append(math.sqrt (mINNER_LEN**2 - mINNER_WIDTH_LC**2 ))
        else:
                diff = mINNER_WIDTH_LC - mINNER_LEN
                mINNER_WIDTH_LC = mINNER_WIDTH_LC - diff * 1.2
                candidate.append(math.sqrt (mINNER_LEN**2 - mINNER_WIDTH_LC**2 ))
                
        if mOUTER_WIDTH_LC < mOUTER_LEN:
                height.append(math.sqrt (mOUTER_LEN**2 - mOUTER_WIDTH_LC**2 ))
        else:
                diff = mOUTER_WIDTH_LC - mOUTER_LEN
                mOUTER_WIDTH_LC = mOUTER_WIDTH_LC - diff * 1.2
                candidate.append(math.sqrt (mOUTER_LEN**2 - mOUTER_WIDTH_LC**2 ))
                
        if len(height) != 0:
                meanHeight = np.mean(np.array(height))
                mVolume = (mINNER_WIDTH_LC + mOUTER_WIDTH_LC) /2 * 0.25 * mHEIGHT * math.pi * meanHeight
                return mVolume * 2
        else:
                meanHeight = np.mean(np.array(candidate))
                mVolume = (mINNER_WIDTH_LC + mOUTER_WIDTH_LC) /2 * 0.25 * mHEIGHT * math.pi * meanHeight
                return mVolume * 2
        
def find_nearest(array, x, value):
        idxes = (np.abs(array[:, 1] - value)).argsort()
        for idx in idxes:
                if array[idx][0] < x:
                        return array[idx][0]
        
def save_as_graph(arr, filename, dir, ratio, rratio, xDiff, yDiff):
        # dir : 0 left
        # dir : 1 right
        # cv2.imwrite('aaa.jpg', arr)
        realSize = arr.shape
        arr = np.transpose(np.array(arr))
        x = np.arange(5, arr.shape[0]-5, int(realSize[1]/15))
        y = []
        for i in x:
                black = np.where(arr[i] > 0)[0]
                if len(black) > 0 : 
                        y.append(np.max(black))
                else:
                        x = np.delete(x, np.where(x == i))
        f2 = interp1d(x, y, kind='cubic')
        plt.cla()
        plt.plot(x, f2(x), color = 'black', linewidth=4)
        plt.axis('off')
        plt.savefig(filename.split('.')[0]+'.png',bbox_inches='tight', pad_inches=0, transparent = True)
        finalImg = cv2.imread(filename.split('.')[0]+'.png', cv2.IMREAD_UNCHANGED)
        finalImg = cv2.flip(finalImg, 0)
        realRatio = ratio * xDiff / 5
        finalImg = cv2.resize(finalImg, dsize=(1000,int(1000*rratio)), interpolation=cv2.INTER_LANCZOS4)
        finalImg = cv2.resize(finalImg, dsize=(0,0), fx = realRatio, fy = realRatio, interpolation=cv2.INTER_LANCZOS4)
        finalImg = cv2.resize(finalImg, dsize=(0,0), fx = 0.2, fy = 0.2, interpolation=cv2.INTER_LANCZOS4)
        
        if dir:
                finalImg = cv2.flip(finalImg, 1)

        fill = cv2.cvtColor(finalImg, cv2.COLOR_BGR2GRAY)
        y = np.where(fill < 255)[0].max()
        x = int(np.mean(np.where(fill[y,:] < 255)))
        os.remove(filename.split('.')[0]+'.png')
        
        blankHigh = np.ones(( 600-y,fill.shape[1],4), dtype = np.int8)
        blankHigh[:,:,:3] = 255
        blankHigh[:,:,3] = 0
        blankLow = np.ones(( 50 - (fill.shape[0]-y),fill.shape[1],4), dtype = np.int8)
        blankLow[:,:,:3] = 255
        blankLow[:,:,3] = 0
        blankLeft = np.ones(( 650, 500-x, 4), dtype = np.int8)
        blankLeft[:,:,:3] = 255
        blankLeft[:,:,3] = 0
        blankRight = np.ones((650, 500-(fill.shape[1]-x), 4), dtype = np.int8)
        blankRight[:,:,:3] = 255
        blankRight[:,:,3] = 0
        finalImg = np.concatenate([blankHigh, finalImg], axis = 0)
        finalImg = np.concatenate([finalImg, blankLow], axis = 0)
        finalImg = np.concatenate([blankLeft, finalImg], axis = 1)
        finalImg = np.concatenate([finalImg, blankRight], axis = 1)
  
        cv2.imwrite(lsPath+filename.split('.')[0]+'.png', finalImg)    



def measure(filename, type, dir = 0):
    # type 0: Breast, type 1: Bra
        log.info(f"{kitPath}{filename}")
        img = cv2.imread(kitPath+filename)
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        h, w = img_gray.shape
        kernelSize = int(min(h,w)/55)

        canny = cv2.Canny(img_gray, 100, 450)
        kernel = np.ones((kernelSize, kernelSize), np.uint8)
        morph = cv2.morphologyEx(canny, cv2.MORPH_CLOSE, kernel)
        contours, _ = cv2.findContours(morph, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        contourAreas = np.array([cv2.contourArea(cont) for cont in contours])
        cont = contours[contourAreas.argmax()]
        approx = np.squeeze(np.array(cv2.approxPolyDP(cont, cv2.arcLength(cont, True) * 0.01, True)), 1)
        xMin = approx[:, 0].min()
        xMax = approx[:, 0].max()
        yMin = approx[:, 1].min()
        yMax = approx[:, 1].max()
        ratio = (xMax - xMin) / (yMax - yMin)
        if ( (ratio > 0.7) & (ratio < 0.8)) | ((ratio > 1.3) & (ratio < 1.4)): # [Warning] 4:3 Box 
                h = yMax - yMin - 10
                w = xMax - xMin - 10
                morph = morph.copy()[yMin + 5 : yMax - 5, xMin + 5 :xMax - 5]

                contours, _ = cv2.findContours(
                morph, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
                )

        rectangleContours = []

        contourAreas = np.array([cv2.contourArea(cont) for cont in contours])

        for idx, cont in enumerate(contours):
                if cv2.contourArea(cont) > h * w * 0.03:
                        approx = np.squeeze(
                                np.array(
                                cv2.approxPolyDP(cont, cv2.arcLength(cont, True) * 0.01, True)
                                ),
                                1,
                        )
                        xMean, yMean = np.mean(approx, axis=0)

                        dictContour = {}
                        dictContour["xMin"] = approx[:, 0].min()
                        dictContour["xMax"] = approx[:, 0].max()
                        dictContour["yMin"] = approx[:, 1].min()
                        dictContour["yMax"] = approx[:, 1].max()

                        rectangleContours.append(dictContour)

        data = sorted(rectangleContours, key=itemgetter("xMin")) # Box Sort by xMin
        if len(data) != 4: # Box Missing
                return {"success": "no", "error": "0", "dir" : "{}".format(dir)}
        
        # Mediate Direction
        dirComRatios = [5.58, 0.167, 0.616, 1.93]
        dirTrue = [(0, cv2.ROTATE_90_COUNTERCLOCKWISE), (1, cv2.ROTATE_90_CLOCKWISE), (1, cv2.ROTATE_90_COUNTERCLOCKWISE), (0, cv2.ROTATE_90_COUNTERCLOCKWISE)] # forward, 90_COUNTERLOCKWISE, 90_CLOCKWISE, converted
        ratioCom = (data[0]["xMin"] - data[0]['xMax']) / (data[0]["yMin"] - data[0]['yMax'])
        dirArray = np.array([abs(ratioCom - num) for num in dirComRatios])
        mediation = dirTrue[dirArray.argmin()]
        
        if dirArray.argmin() == 3: # The direction of image is converted
                return {"success" : "no", "error" : "1", "dir" : "{}".format(dir)}
                
        for i in range(mediation[0]):
                morph = cv2.rotate(morph, mediation[1])
                contours, _ = cv2.findContours(
                morph, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
                )
                rectangleContours = []

                contourAreas = np.array([cv2.contourArea(cont) for cont in contours])
                for idx, cont in enumerate(contours):
                        if cv2.contourArea(cont) > h * w * 0.03:
                                approx = np.squeeze(
                                np.array(
                                        cv2.approxPolyDP(cont, cv2.arcLength(cont, True) * 0.01, True)
                                ),
                                1,
                                )
                                xMean, yMean = np.mean(approx, axis=0)

                                dictContour = {}
                                dictContour["xMin"] = approx[:, 0].min()
                                dictContour["xMax"] = approx[:, 0].max()
                                dictContour["yMin"] = approx[:, 1].min()
                                dictContour["yMax"] = approx[:, 1].max()

                                rectangleContours.append(dictContour)

                data = sorted(rectangleContours, key=itemgetter("xMin"))
    

        standarImgForMeasure = math.sqrt(
                (data[0]["xMax"] - data[0]["xMin"]) ** 2
                + (data[0]["yMax"] - data[0]["yMin"]) ** 2
        )

        img_key = ["INNER_LEN", "LOWER_LEN", "LOWER_SHAPE", "OUTER_LEN"]
        imgDropOffset = [[kernelSize, kernelSize, kernelSize, kernelSize], [kernelSize, kernelSize, kernelSize, kernelSize]]
        ratioOffset = [5.56, 0.235, 1.623, 5.95]
        imgDirection = [0, 1, 2, 0]
        standard = [16.21 / (standarImgForMeasure - 5), 16.45 / (standarImgForMeasure - 5)]
        ratio = standard[type]
        measures = []

        for idx, rectangle in enumerate(data):
                xMin = rectangle["xMin"]
                xMax = rectangle["xMax"]
                yMin = rectangle["yMin"]
                yMax = rectangle["yMax"]
        
                boxRatio = (xMax - xMin) / (yMax - yMin)
                if (boxRatio > ratioOffset[idx] + 1) | (boxRatio < ratioOffset[idx] - 1):
                        return {"success" : "no", "error" : "{}".format(idx + 2), "dir" : "{}".format(dir)}

                grayImg = morph.copy()[
                        int(yMin + imgDropOffset[1][idx]) : int(yMax - imgDropOffset[1][idx]),
                        int(xMin + imgDropOffset[0][idx]) : int(xMax - imgDropOffset[0][idx]),
                ]
                
                if idx == 2:
                        grayImg = morph.copy()[
                                int(yMin + imgDropOffset[1][idx]) : int(yMax - imgDropOffset[1][idx]),
                                int(xMin + imgDropOffset[0][idx]) : int(xMax - imgDropOffset[0][idx] * 2),
                        ]

                # cv2.imwrite("{}.jpg".format(idx), grayImg)     
                contours, _ = cv2.findContours(
                        grayImg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
                )
                length = np.array([cv2.arcLength(x, closed=True) for x in contours])
                
                if len(length) != 0:
                        cont = contours[length.argmax()]
                        approx = np.squeeze(
                                np.array(
                                cv2.approxPolyDP(cont, cv2.arcLength(cont, True) * 0.01, True)
                                ),
                                1,
                        )
                        xMin = approx[:, 0].min()
                        xMax = approx[:, 0].max()
                        yMin = approx[:, 1].min()
                        yMax = approx[:, 1].max()
                        if imgDirection[idx] == 0:
                                measures.append(round(standard[type] * (xMax - xMin), 4))
                        elif imgDirection[idx] == 1:
                                measures.append(round(standard[type] * (yMax - yMin), 4))
                        elif imgDirection[idx] == 2:
                                dictLowercup = {}
                                approx = np.squeeze(np.array(cont), 1)
                                xMin = approx[:, 0].min()
                                xMax = approx[:, 0].max()
                                yMin = approx[:, 1].min()
                                yMax = approx[:, 1].max()
                                x1 = xMax
                                y1 = approx[approx[:, 0].argmax()][1]
                                y2 = yMin
                                x2 = approx[approx[:, 1].argmin()][0]
                                x3 = find_nearest(approx, (xMin + xMax) / 2, y1)
                                y3 = yMax
                                x4 = approx[approx[:, 1].argmax()][0]
                                lowerInnerW = round(standard[type] * abs(x1 - x4), 4)
                                lowerInnerH = round(standard[type] * abs(y1 - y3), 4)
                                lowerOuterW = round(standard[type] * abs(x4 - x2), 4)
                                lowerOuterH = round(standard[type] * abs(y2 - y3), 4)
                                innerCurvature = round(
                                        lowerInnerH / 2 + ((lowerInnerW * 2) ** 2) / (8 * lowerInnerH), 4
                                )
                                outerCurvature = round(
                                        lowerOuterH / 2 + ((lowerOuterW * 2) ** 2) / (8 * lowerOuterH), 4
                                )
                                width = round(standard[type] * abs(xMax - xMin), 4)
                                height = round(standard[type] * abs(y1 - y3), 4)
                                dictLowercup["inner_width"] = lowerInnerW
                                dictLowercup["outer_width"] = lowerOuterW
                                dictLowercup["width"] = width
                                dictLowercup["height"] = height
                                dictLowercup["outer_curvature"] = outerCurvature
                                dictLowercup["inner_curvature"] = innerCurvature
                                dictLowercup["length"] = round(
                                        (cv2.arcLength(cont, closed=True) * standard[type] - 0.2) / 2, 4
                                )
                                # Save LowerShape Img
                                lsImg = grayImg[yMin:yMax+3,xMin:xMax]
                                aspectRatio = (yMax - yMin) / (xMax - xMin)
                                # kernel = np.ones((kernelSize,kernelSize), np.uint8)
                                # lsmorph = cv2.morphologyEx(lsImg, cv2.MORPH_CLOSE, kernel)
                                save_as_graph(lsImg, filename, dir, ratio, aspectRatio, xMax-xMin, yMax-yMin)
                                measures.append(dictLowercup)

                else:
                        return {"success": "no", "error": "{}".format(2 + idx), "dir" : "{}".format(dir)}

        return measures


# @app.route("/isKitImgValid", methods=["POST"])
@blueprint.route("isKitImgValid", methods=["POST"])
def kitVision():
        try:
                log.info("Image Processing in here!")
                requestData = request.data.decode("utf-8")
                log.info(f"---> {type(request.data)},{type(requestData)}")
                Data = json.loads(requestData)
                kitType = int(Data["type"])
                leftImgPath = Data["leftImgPath"]
                rightImgPath = Data["rightImgPath"]
                log.info(f"---> {kitType}, {leftImgPath}, {rightImgPath}")
                whereBt = -1
                
        

                if kitType == 0:  # Breast kit
                
                        mInnerLenL = None
                        mOuterLenL = None
                        mLowerLenL = None
                        mWidthLcL = None
                        mInnerWidthLcL = None
                        mOuterWidthLcL = None
                        mLenLcL = None
                        mCurveInnerLcL = None
                        mCurveOuterLcL = None
                        mHeightLcL = None
                        mVolumeL = None
                        mInnerLenR = None
                        mOuterLenR = None
                        mLowerLenR = None
                        mWidthLcR = None
                        mInnerWidthLcR = None
                        mOuterWidthLcR = None
                        mLenLcR = None
                        mCurveInnerLcR = None
                        mCurveOuterLcR = None
                        mHeightLcR = None
                        mVolumeR = None
                
                        if leftImgPath != "":
                                pkID = leftImgPath.split(".")[0].split("/")[-1].split("_")[0]
                                measureResult = measure(leftImgPath, type=0)
                                log.info("measureResult left=>")
                                log.info(f"{measureResult}, {isinstance(measureResult, dict)}")
                                if isinstance(measureResult, dict):
                                        return jsonify(measureResult)
                                else:
                                        mInnerLenL, mLowerLenL, lowerShapeL, mOuterLenL = measure(leftImgPath, type=0)
                                whereBt = 0
                                (
                                        mHeightLcL,
                                        mLenLcL,
                                        mWidthLcL,
                                        mInnerWidthLcL,
                                        mOuterWidthLcL,
                                        mCurveInnerLcL,
                                        mCurveOuterLcL,
                                ) = (
                                        lowerShapeL["height"],
                                        lowerShapeL["length"],
                                        lowerShapeL["width"],
                                        lowerShapeL["inner_width"],
                                        lowerShapeL["outer_width"],
                                        lowerShapeL["inner_curvature"],
                                        lowerShapeL["outer_curvature"],
                                )
                                mVolumeL = getVolume(mInnerLenL, mInnerWidthLcL, mOuterLenL, mOuterWidthLcL, mHeightLcL)

                        if rightImgPath != "":
                                pkID = rightImgPath.split(".")[0].split("/")[-1].split("_")[0]
                                if whereBt == 0:
                                        whereBt = 2
                                else:
                                        whereBt = 1
                                # mInnerLenR, mLowerLenR, lowerShapeR, mOuterLenR = measure(rightImgPath, type=0, dir = 1)
                                measureResult = measure(rightImgPath, type=0, dir = 1)
                                log.info("measureResult right=>")
                                log.info(f"{measureResult}, {isinstance(measureResult, dict)}")
                                if isinstance(measureResult, dict):
                                        return jsonify(measureResult)
                                else:
                                        mInnerLenR, mLowerLenR, lowerShapeR, mOuterLenR = measure(rightImgPath, type=0, dir = 1)

                                (
                                        mHeightLcR,
                                        mLenLcR,
                                        mWidthLcR,
                                        mInnerWidthLcR,
                                        mOuterWidthLcR,
                                        mCurveInnerLcR,
                                        mCurveOuterLcR,
                                ) = (
                                        lowerShapeR["height"],
                                        lowerShapeR["length"],
                                        lowerShapeR["width"],
                                        lowerShapeR["inner_width"],
                                        lowerShapeR["outer_width"],
                                        lowerShapeR["inner_curvature"],
                                        lowerShapeR["outer_curvature"],
                                )
                                mVolumeR = getVolume(mInnerLenR, mInnerWidthLcR, mOuterLenR, mOuterWidthLcR, mHeightLcR)

                        if whereBt == -1:  # Error, No Data path come in
                                return jsonify({"success": "no", "error": "10"})

                        else:
                                db = pymysql.connect(
                                        host=config["host"],
                                        user=config["user"],
                                        db=config["db"],
                                        password=config["password"],
                                        charset=config["charset"],
                                )
                                curs = db.cursor()
                                sql = "UPDATE `BREAST_TEST` SET WHERE_BT = %s, mINNER_LEN_L=%s, mOUTER_LEN_L=%s, mLOWER_LEN_L=%s, mHEIGHT_LC_L=%s, mLEN_LC_L=%s, mWIDTH_LC_L=%s, mINNER_WIDTH_LC_L=%s, mOUTER_WIDTH_LC_L=%s, mCURVE_INNER_LC_L=%s, mCURVE_OUTER_LC_L=%s, mVOLUME_L = %s, mINNER_LEN_R=%s, mOUTER_LEN_R=%s, mLOWER_LEN_R=%s, mHEIGHT_LC_R=%s, mLEN_LC_R=%s, mWIDTH_LC_R=%s, mINNER_WIDTH_LC_R=%s, mOUTER_WIDTH_LC_R=%s, mCURVE_INNER_LC_R=%s, mCURVE_OUTER_LC_R=%s, mVOLUME_R = %s WHERE PK_ID=%s"
                                curs.execute(sql, (whereBt,
                                        mInnerLenL,
                                        mOuterLenL,
                                        mLowerLenL,
                                        mHeightLcL,
                                        mLenLcL,
                                        mWidthLcL,
                                        mInnerWidthLcL,
                                        mOuterWidthLcL,
                                        mCurveInnerLcL,
                                        mCurveOuterLcL,
                                        mVolumeL,
                                        mInnerLenR,
                                        mOuterLenR,
                                        mLowerLenR,
                                        mHeightLcR,
                                        mLenLcR,
                                        mWidthLcR,
                                        mInnerWidthLcR,
                                        mOuterWidthLcR,
                                        mCurveInnerLcR,
                                        mCurveOuterLcR,
                                        mVolumeR,
                                        pkID))
                                db.commit()
                                current = open('now.txt', 'r')
                                lines = current.readlines()
                                kitUploads = list(map(int, lines[0].strip().split(' ')))
                                breastTests = list(map(int, lines[1].strip().split(' ')))
                                braRecommends = list(map(int, lines[2].strip().split(' ')))
                                kitAll, kitNow = kitUploads
                                kitNow += 1
                                breastAll, breastNow = breastTests
                                braAll, braNow = braRecommends
                                slackKit.chat_postMessage(channel = "#웹테스트", text = "{}님이 키트 업로드하였습니다.\n키트 업로드 진행한 사람 : {}/{}\n {}명 남았습니다".format(pkID, kitNow, kitAll, kitAll-kitNow))
                                
                                
                                current.close()
                                
                                update = open('now.txt', 'w')
                                update.write("{} {}\n{} {}\n{} {}".format(kitAll, kitNow, breastAll, breastNow, braAll, braNow))
                                update.close()
                                log.info(f"{pkID}'s breast update complete!")
                                return jsonify({"success": "yes", "message": "Kit upload success",})

                else:  # Bra kit
                        result = measure(leftImgPath, type=0)
                        return jsonify({"success": "yes", "error": "", "dir": ""})
                
        except Exception as e:
                slackKit.chat_postMessage(channel = "#웹테스트", text = "{}님이 키트 업로드하는데 예기치 못한 오류가 발생하였습니다".format(pkID))
                log.exception(f"{str(e)}, {type(e)}")
                return jsonify({"success": "no", "error": str(e)})
        
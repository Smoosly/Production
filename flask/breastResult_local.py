from flask import request, jsonify, Blueprint
import pymysql
import json
import logging
import logging.handlers
from slack_sdk import WebClient

kitPath = "../KitUploads/"
lsPath = "../LowerShapes/"

with open("config.json", "r") as f:
    config = json.load(f)


def generalSize(mUnderBust, mUpperBust):
        underArr = ["60", "65", "70", "75", "80", "85", "90", "95", "100", "105", "110"]
        cupArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        diff = mUpperBust - mUnderBust
        if diff <= 8.5:
                cup = "AA"
        else:
                cup = cupArr[int((diff - 8.5) // 2.51)]
        under = underArr[int((mUnderBust + 2) // 5 - 12)]
        return under + cup


def saveBreastResult(pkID):
        pkId = pkID
        db = pymysql.connect(
                host=config["host"],
                user=config["user"],
                db=config["db"],
                password=config["password"],
                charset=config["charset"],
        )
        sql = "SELECT * FROM BREAST_TEST where PK_ID = %s"
        sql_bratabase = "SELECT * FROM 3RD_BRATABASE where NUM_BRATABASE = %s"
        btVolumediff = None
        btLsdiff = None

        with db:
                with db.cursor() as cur:
                        complete = 0
                        cur.execute(sql, pkId)
                        result = cur.fetchall()
                        (
                                _,
                                _,
                                leftImgPath,
                                rightImgPath,
                                _,
                                whereBt,
                                _,
                                _,
                                _,
                                mWidthLcL,
                                mInnerWidthLcL,
                                mOuterWidthLcL,
                                _,
                                mCurveInnerLcL,
                                mCurveOuterLcL,
                                _,
                                mVolumeL,
                                _,
                                _,
                                _,
                                _,
                                _,
                                mWidthLcR,
                                mInnerWidthLcR,
                                mOuterWIdthLcR,
                                mCurveInnerLcR,
                                mCurveOuterLcR,
                                mVolumeR,
                                mUnderBust,
                                mUpperBust,
                                _,
                                mShoulder,
                                _,
                                _,
                                numBratabase,
                                diffBtGap,
                                diffBpDir,
                                diffBtSag,
                                _,
                                typeBtSizediff,
                                typeBtFlesh,
                                typeShoulder,
                                typeRib,
                                typeAccbreast,
                                typeFinishBtL,
                                typeFinishBtR,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                                _,
                        ) = result[0]

                        print(result)
                        # log.info(
                        #         whereBt,
                        #         mWidthLcL,
                        #         mVolumeL,
                        #         mWidthLcR,
                        #         mVolumeR,
                        #         mUnderBust,
                        #         mUpperBust,
                        #         numBratabase,
                        #         diffBtGap,
                        #         diffBpDir,
                        #         diffBtSag,
                        #         typeBtSizediff,
                        #         typeBtFlesh,
                        #         typeShoulder,
                        #         typeRib,
                        #         typeAccbreast,
                        #         typeFinishBtL,
                        #         typeFinishBtR,
                        # )

                        breastSizeGeneral = generalSize(mUnderBust, mUpperBust)
                        leftFinish = typeFinishBtL
                        rightFinish = typeFinishBtR

                        cur.execute(sql_bratabase, (numBratabase))
                        (
                                _,
                                _,
                                btShape,
                                inoutVolume,
                                updownVolume,
                                bratabaseBpDir,
                                bratabaseBtSag,
                                bratabaseBtGap,
                        ) = cur.fetchall()[0]
                        
                        

                        if diffBtSag == 0:
                                btSag = max(0, (bratabaseBtSag - 1))
                        elif diffBtSag == 1:    
                                btSag = bratabaseBtSag
                        else:
                                btSag = min(2, (bratabaseBtSag + 1))

                        
                        if diffBtGap == 0:
                                btGap = max(0, (bratabaseBtGap - 1))
                        elif diffBtGap == 1:    
                                btGap = bratabaseBtGap
                        else:
                                btGap = min(2, (bratabaseBtGap + 1))
                        
                        if diffBpDir == 0:
                                bpDir = max(0, (bratabaseBpDir - 1))
                        elif diffBpDir == 1:    
                                bpDir = bratabaseBpDir
                        else:
                                bpDir = min(2, (bratabaseBpDir + 1))
                                
                        

                        if leftImgPath != None:
                                leftLowerShapeImgPath = leftImgPath.split('.')[0] +'.png'
                        else:
                                leftLowerShapeImgPath = None
                                
                        if rightImgPath != None:
                                rightLowerShapeImgPath = rightImgPath.split('.')[0] +'.png'
                        else:
                                rightLowerShapeImgPath = None
                                
                        leftWidthLc = mWidthLcL
                        rightWidthLc = mWidthLcR
                        leftCurveInnerLc = mCurveInnerLcL
                        rightCurveInnerLc = mCurveInnerLcR
                        leftCurveOuterLc = mCurveOuterLcL
                        rightCurveOuterLc = mCurveOuterLcR
                        btSizediff = max(0, (typeBtSizediff - 1))

                        if whereBt == 2:
                                btVolumediff = abs(mVolumeL - mVolumeR)
                                btLsdiff = abs(mWidthLcL - mWidthLcR)

                        shoulderShape = typeShoulder

                        if mShoulder <= 31:
                                shoulderWidth = 1
                        else:
                                shoulderWidth = 0

                        rib = typeRib
                        accbreast = typeAccbreast
                        if typeBtFlesh <= 1:
                                flesh = 0
                        else:
                                flesh = 1

                        sql_insert = "INSERT INTO BREAST_RESULT(PK_ID, BREAST_SIZE_GENERAL, LEFT_lOWER_SHAPE_IMG_PATH, RIGHT_LOWER_SHAPE_IMG_PATH, LEFT_WIDTH_LC, RIGHT_WIDTH_LC,\
                                                LEFT_CURVE_INNER_LC, RIGHT_CURVE_INNER_LC, LEFT_CURVE_OUTER_LC, RIGHT_CURVE_OUTER_LC, LEFT_FINISH, RIGHT_FINISH, BT_SHAPE, INOUT_VOLUME, UPDOWN_VOLUME, BP_DIR, BT_SAG, BT_GAP,\
                                                        BT_SIZEDIFF, BT_VOLUMEDIFF, BT_LSDIFF, SHOULDER_SHAPE, SHOULDER_WIDTH, RIB, ACCBREAST, FLESH) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
                        cur.execute(
                                sql_insert,
                                (
                                pkId,
                                breastSizeGeneral,
                                leftLowerShapeImgPath,
                                rightLowerShapeImgPath,
                                leftWidthLc,
                                rightWidthLc,
                                leftCurveInnerLc,
                                rightCurveInnerLc,
                                leftCurveOuterLc,
                                rightCurveOuterLc,
                                leftFinish,
                                rightFinish,
                                btShape,
                                inoutVolume,
                                updownVolume,
                                bpDir,
                                btSag,
                                btGap,
                                btSizediff,
                                btVolumediff,
                                btLsdiff,
                                shoulderShape,
                                shoulderWidth,
                                rib,
                                accbreast,
                                flesh,
                                ),
                        )
                        
                        print(pkId,
                                breastSizeGeneral,
                                leftLowerShapeImgPath,
                                rightLowerShapeImgPath,
                                leftWidthLc,
                                rightWidthLc,
                                leftCurveInnerLc,
                                rightCurveInnerLc,
                                leftCurveOuterLc,
                                rightCurveOuterLc,
                                leftFinish,
                                rightFinish,
                                btShape,
                                inoutVolume,
                                updownVolume,
                                bpDir,
                                btSag,
                                btGap,
                                btSizediff,
                                btVolumediff,
                                btLsdiff,
                                shoulderShape,
                                shoulderWidth,
                                rib,
                                accbreast,
                                flesh)
                        
                        db.commit()
                        print("Success")


if __name__ == "__main__":
        saveBreastResult("3ewcjcc4hr")
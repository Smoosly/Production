from email.policy import default
from flask import request, Blueprint, jsonify
import numpy as np
import pandas as pd
import pymysql
import math
import json
import logging
import logging.handlers
from slack_sdk import WebClient

log = logging.getLogger("braRecommend")
log.setLevel(logging.DEBUG)

formatter = logging.Formatter("[%(levelname)s] (%(filename)s:%(lineno)d) > %(message)s")

fileHandler = logging.FileHandler("logs/braRecommend.log")
streamHandler = logging.StreamHandler()

fileHandler.setFormatter(formatter)
streamHandler.setFormatter(formatter)

log.addHandler(fileHandler)
log.addHandler(streamHandler)

log.info("logtest3")
blueprint = Blueprint("braRecommend", __name__, url_prefix="/")

myToken = 'xoxb-2373155174243-3142698051189-XlqjsEmXLlcbLX61Fjy1TCFM'
slackKit = WebClient(token = myToken)

with open("config.json", "r") as f:
        config = json.load(f)

def get_defaultSize(mUnderBust, mUpperBust, wPressure, breastSizeGeneral, braSizeUb, braSizeCup):
        unders = ['65', '70', '75', '80', '85', '90', '95', '100', '105', '110']
        cups = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        diffs = []
        diff = mUpperBust - mUnderBust
        for i in range(len(cups)):
                diffs.append(7.5+2.5*i)
        Size = []
        small = breastSizeGeneral in ['65AA', '65A', '65B', '70AA', '70A', '70B', '75AA', '75A']
        under = breastSizeGeneral[:2]
        cup = breastSizeGeneral[2:]
        braSize = unders[braSizeUb] + cups[braSizeCup]
        if under == "65": # only 65
                if (cup == 'A') | (cup == 'AA'): # 65, A/AA
                        defaultSize = '65A'
                        Size.append(defaultSize)
                        Size.append('70AA')
                        if wPressure <= 4:
                                Size.append('70A')
                        else:
                                Size.append('65B')
                else: # 65, B~
                        defaultSize = breastSizeGeneral
                        Size.append(defaultSize)
                        Size.append(unders[unders.index(under)+1]+cups[cups.index(cup)-1])
                        if wPressure <= 4:
                                if mUnderBust <= 63:
                                        Size.append(under+cups[cups.index(cup)-1])
                                else:
                                        Size.append(unders[unders.index(under)+1]+cups[cups.index(cup)-2])
                        else:
                                Size.append(under+cups[cups.index(cup)-1])
        else: # 70~
                if cup == 'AA': # 70~ , AA
                        if under == '70': # 70, AA
                                defaultSize = breastSizeGeneral
                                Size.append(defaultSize)
                                if wPressure <= 4:
                                        Size.append('75AA')
                                        Size.append('70A')
                                else:
                                        Size.append('65A')
                                        if mUnderBust <= 69:
                                                Size.append('65AA')
                                        else:
                                                Size.append('70A')
                        else: # 75~, AA
                                defaultSize = breastSizeGeneral
                                Size.append(defaultSize)
                                if wPressure <= 4:
                                        Size.append(unders[unders.index(under)+1]+cup)
                                        if mUnderBust <= 74:
                                                Size.append(under+cups[cups.index(cup)+1])
                                        else:
                                                Size.append(unders[unders.index(under)+1]+cups[cups.index(cup)+1])
                                        
                                else:
                                        Size.append(unders[unders.index(under)-1]+cups[cups.index(cup)+1])
                                        if mUnderBust <= 74:
                                                Size.append(unders[unders.index(under)-1]+cup)
                                        else:
                                                Size.append(under+cups[cups.index(cup)+1])
                else: # 70~, A~
                        if (under == '70') & (cup == 'A'): # 70, A
                                defaultSize = breastSizeGeneral
                                Size.append(defaultSize)
                                if wPressure <= 4:
                                        if diff < diffs[cups.index(cup)]:
                                                Size.append('75A')
                                                if braSize in Size:
                                                        Size.append('75AA')
                                                else:
                                                        Size.append(braSize)
                                        else:
                                                Size.append('70B')
                                                if braSize in Size:
                                                        Size.append('75A')
                                                else:
                                                        Size.append(braSize)
                                else:
                                        if diff < diffs[cups.index(cup)]:
                                                Size.append('70B')
                                                if braSize in Size:
                                                        Size.append('75AA')
                                                else:
                                                        Size.append(braSize)
                                        else:
                                                Size.append('70B')
                                                if braSize in Size:
                                                        Size.append('75A')
                                                else:
                                                        Size.append(braSize)
                                        

                        else: # 70~, A~ , not 70A
                                defaultSize = breastSizeGeneral
                                Size.append(defaultSize)
                                if wPressure <= 4:
                                        if mUnderBust < int(defaultSize[:2]):
                                                if diff < diffs[cups.index(cup)]:
                                                        Size.append(under+cups[cups.index(cup)-1])
                                                        if braSize == Size[0]:
                                                                Size.append(unders[unders.index(under)+1]+cups[cups.index(cup)-1])
                                                        elif braSize == Size[1]:
                                                                Size.append(unders[unders.index(under)+1]+cups[cups.index(cup)-1])
                                                        else:
                                                                Size.append(braSize)
                                                else:
                                                        Size.append(under+cups[cups.index(cup)+1])
                                                        if braSize == Size[0]:
                                                                Size.append(unders[unders.index(under)+1]+cups[cups.index(cup)-1])
                                                        elif braSize == Size[1]:
                                                                Size.append(unders[unders.index(under)+1]+cup)
                                                        else:
                                                                Size.append(braSize)
                                        else:
                                                if diff < diffs[cups.index(cup)]:
                                                        Size.append(unders[unders.index(under)+1]+cups[cups.index(cup)-1])
                                                        if braSize == Size[0]:
                                                                Size.append(under+cups[cups.index(cup)-1])
                                                        elif braSize == Size[1]:
                                                                Size.append(under+cups[cups.index(cup)-1])
                                                        else:
                                                                Size.append(braSize)
                                                else:
                                                        Size.append(unders[unders.index(under)+1]+cups[cups.index(cup)-1])
                                                        if braSize == Size[0]:
                                                                Size.append(under+cups[cups.index(cup)+1])
                                                        elif braSize == Size[1]:
                                                                Size.append(under+cups[cups.index(cup)+1])
                                                        else:
                                                                Size.append(braSize)
                                else:
                                        if mUnderBust < int(defaultSize[:2]):
                                                if diff < diffs[cups.index(cup)]:
                                                        Size.append(unders[unders.index(under)-1]+cup)
                                                        if braSize == Size[0]:
                                                                Size.append(under+cups[cups.index(cup)-1])
                                                        elif braSize == Size[1]:
                                                                Size.append(unders[unders.index(under)-1]+cups[cups.index(cup)+1])
                                                        else:
                                                                Size.append(braSize)
                                                else:
                                                        Size.append(unders[unders.index(under)-1]+cups[cups.index(cup)+1])
                                                        if braSize == Size[0]:
                                                                Size.append(under+cups[cups.index(cup)+1])
                                                        elif braSize == Size[1]:
                                                                Size.append(unders[unders.index(under)-1]+cups[cups.index(cup)+2])
                                                        else:
                                                                Size.append(braSize)
                                        else:
                                                if diff < diffs[cups.index(cup)]:
                                                        Size.append(under+cups[cups.index(cup)-1])
                                                        if braSize == Size[0]:
                                                                Size.append(unders[unders.index(under)-1]+cups[cups.index(cup)+1])
                                                        elif braSize == Size[1]:
                                                                Size.append(unders[unders.index(under)-1]+cups[cups.index(cup)+1])
                                                        else:
                                                                Size.append(braSize)
                                                else:
                                                        Size.append(under+cups[cups.index(cup)+1])
                                                        if braSize == Size[0]:
                                                                Size.append(unders[unders.index(under)-1]+cups[cups.index(cup)+1])
                                                        elif braSize == Size[1]:
                                                                Size.append(unders[unders.index(under)-1]+cups[cups.index(cup)+2])
                                                        else:
                                                                Size.append(braSize)
                                
        return defaultSize, Size



def score_breastFit(x):
        score = x.BREAST_FIT_SCORE
        small = defaultSize in ['65AA', '65A', '65B', '70AA', '70A', '70B', '75AA', '75A']
        
        if small:
                if (x.EXISTENCE_PP == 1) | (x.DETACH_PP == 1):
                        score += 4
                if x.EXISTENCE_PP == 1:
                        score += math.ceil(x.mTHICKNESS_PP)
                if x.CUP_SHAPE == 0:
                        score += 7
                if x.UPPER_COVER == 1:
                        score += 6

    
        if btSag == 1:
                arrSidebone = [0,3,3,2]
                if x.mWIDTH_INNER_WING >= 9:
                        score += 4
                if x.CUP_SHAPE == 0:
                        score += 4
                score += arrSidebone[x.NUM_SIDEBONE]
                if x.mTHICKNESS_STRAP >= 1.3:
                        score += 3
                if x.EXISTENCE_PP == 1:
                        score += math.ceil(x.mTHICKNESS_PP / 2)
                if x.LOC_PP == 1:
                        score += 1
                if x.WIRE != 0:
                        score += 1
                    
        elif btSag == 2:
                arrSidebone = [0,3,4,3]
                if x.mWIDTH_INNER_WING >= 9:
                        score += 6
                if x.CUP_SHAPE == 0:
                        score += 5
                if x.mTHICKNESS_STRAP >= 1.3:
                        score += 3
                score += arrSidebone[x.NUM_SIDEBONE]
                if x.EXISTENCE_PP == 1:
                        score += math.ceil(x.mTHICKNESS_PP / 2)
                        if x.LOC_PP == 1:
                                score += 2
                if x.WIRE != 0:
                        score += 1
                
        return score

def score_effectFit(x):
        score = x.EFFECT_FIT_SCORE
        if 1 in brEffect:
                biggerArray = [80,50,20]
                if x.BIGGER_SCORE != 0:
                        score += biggerArray[x.BIGGER_DEGREE]
        elif 10 in brEffect:
                biggerArray = [20,50,80]
                if x.BIGGER_SCORE != 0:
                        score += biggerArray[x.BIGGER_DEGREE] 
        if 2 in brEffect:
                gatherArray = [80,50,20]
                if x.GATHER_SCORE != 0:
                        score += gatherArray[x.GATHER_DEGREE]
        elif 20 in brEffect:
                gatherArray = [20,50,80]
                if x.GATHER_SCORE != 0:
                        score += gatherArray[x.GATHER_DEGREE]
        if 3 in brEffect:
                pushupArray = [80,50,20]
                if x.PUSHUP_SCORE != 0:
                        score += pushupArray[x.PUSHUP_DEGREE]
        elif 30 in brEffect:
                pushupArray = [20,50,80]
                if x.PUSHUP_SCORE != 0:
                        score += pushupArray[x.PUSHUP_DEGREE]
        if 4 in brEffect:
                score += x.SUPPORT_SCORE
        if 6 in brEffect:
                score += x.ACCBREAST_SCORE
        if 7 in brEffect:
                score += x.BACK_SCORE
                
        if wBrEffectMost != 0:
                if wBrEffectMost == 1:
                        biggerArray = [80,50,20]
                        if x.BIGGER_SCORE != 0:
                                score += biggerArray[x.BIGGER_DEGREE]
                elif wBrEffectMost == 10:
                        biggerArray = [20,50,80]
                        if x.BIGGER_SCORE != 0:
                                score += biggerArray[x.BIGGER_DEGREE] 
                elif wBrEffectMost == 2:
                        gatherArray = [80,50,20]
                        if x.GATHER_SCORE != 0:
                                score += gatherArray[x.GATHER_DEGREE]
                elif wBrEffectMost == 20:
                        gatherArray = [20,50,80]
                        if x.GATHER_SCORE != 0:
                                score += gatherArray[x.GATHER_DEGREE]
                elif wBrEffectMost == 3:
                        pushupArray = [80,50,20]
                        if x.PUSHUP_SCORE != 0:
                                score += pushupArray[x.PUSHUP_DEGREE]
                elif wBrEffectMost == 30:
                        pushupArray = [20,50,80]
                        if x.PUSHUP_SCORE != 0:
                                score += pushupArray[x.PUSHUP_DEGREE]
                elif wBrEffectMost == 4:
                        score += x.SUPPORT_SCORE
                elif wBrEffectMost == 6:
                        score += x.ACCBREAST_SCORE
                elif wBrEffectMost == 7:
                        score += x.BACK_SCORE
                
        return score

def filter_size(x):
        sizeonlys = x.SIZE_ONLY.split(',')
        sizes = x.SIZE.split(',')
        score = 0
        realSizes = []
        sizeFine = 0

        for size in sizeonlys:
                if (len(size) < 4) | (size[2:] == 'AA'):
                        if Size[0] == size:
                                sizeFine = 1
                                break
                else:
                        if (Size[0][:2] in size) & (Size[0][2:] in size):
                                sizeFine = 1
                                break

        if sizeFine == 1:
                for size in sizes:
                        for idx, pSize in enumerate(Size):
                                if (len(size) < 4) | (size[2:] == 'AA'):
                                        if (pSize == size) & (size not in realSizes):
                                                score += 10**(2-idx)
                                                realSizes.append(size)
                                else:
                                        if (pSize[:2] in size) & (pSize[2:] in size) & (size not in realSizes):
                                                score += 10**(2-idx)
                                                realSizes.append(size)
                
        if (sizeFine == 1) & (score > 100):
                return 1
        else:
                return 0

    
def get_each_size(x):
        sizes = x.split(',')
        realSizes = []
        for size in sizes:
                for idx, pSize in enumerate(Size):
                        if (len(size) < 4) | (size[2:] == 'AA'):
                                if (pSize == size) & (size not in realSizes):
                                        realSizes.append(size)
                        else:
                                if (pSize[:2] in size) & (pSize[2:] in size) & (size not in realSizes):
                                        realSizes.append(size)
                
        realSizes = ",".join(realSizes)
        realSizes = realSizes + ','
        return realSizes

@blueprint.route("braRecommend", methods=["POST"])
def recommend():
        try:
                requestData = request.data.decode("utf-8")
                Data = json.loads(requestData)
                pkId = Data['PK_ID']
                db = pymysql.connect(
                        host=config["host"],
                        user=config["user"],
                        db=config["db"],
                        password=config["password"],
                        charset=config["charset"],
                )
                cur = db.cursor()
        
                for i in range(1,11):
                        globals()['pkItem{}'.format(i)] = None
                        globals()['oldKey{}'.format(i)] = None
                        globals()['size{}'.format(i)] = None
                        globals()['breastScore{}'.format(i)] = None
                        globals()['effectScore{}'.format(i)] = None
            
                
                sql_breastTest = "SELECT * FROM BREAST_TEST where PK_ID = %s"
                sql_breastResult = "SELECT * FROM BREAST_RESULT where PK_ID = %s"
        
                cur.execute(sql_breastResult, pkId)
                result_breastResult = cur.fetchall()
                global btSag, flesh
                _, _, breastSizeGeneral, _, _, _, _, _, _, _, _, _, _, _, _, _, _, btSag, _, _, _, _, _, _, rib, _, flesh, _, _ = result_breastResult[0]
                
                cur.execute(sql_breastTest, pkId)
                result_breastTest = cur.fetchall()
                global brEffect, wBrEffectMost
                _, _, _, _, _, whereBt, _, _, _, _, _, _, _, _, _, mHeightLcL, _, _, _, _, mHeightLcR, _, _, _, _, _, _, _,\
                mUnderBust, mUpperBust, _, _, braSizeUb, braSizeCup, _, _, _, _, _, _,\
                        _, _, _, _, _, _, wPressure, wType, wPP, wBrEffect, wBrEffectMost, _, _, wDesignConcept, _, _, wPriceMax, wImportant, _, _, _ = result_breastTest[0]

                if wDesignConcept[-1] == ',':
                        wDesignConcept = wDesignConcept[:len(wDesignConcept)-1]
                wDesignConcept = wDesignConcept.split(',')
                wDesignConcept = list(map(int, wDesignConcept))
                
                if wType[-1] == ',':
                        wType = wType[:len(wType)-1]
                wType = wType.split(',')
                wType = list(map(int, wType))

                if whereBt == 0:
                        mHeightLc = mHeightLcL
                elif whereBt == 1:
                        mHeightLc = mHeightLcR
                else:
                        mHeightLc = (mHeightLcL + mHeightLcR)/2
                
                if wBrEffect[-1] == ',':
                        wBrEffect = wBrEffect[:len(wBrEffect)-1] 
                brEffect = wBrEffect.split(",")
                brEffect = list(map(int, brEffect))
                wBrEffect = wBrEffect + ','
                
        
                
                sql_brAll = "select * from BR_ALL"
                sql_brCh = "select * from BR_CH"
                sql_brNum = "select * from BR_NUM"
                sql_brDetail = "select * from BR_DETAIL"
                
                # Get BR_ALL
                df_brAll = pd.read_sql(sql_brAll, db)
                # log.debug(df_brAll.head())
                
                
                # Get the recommend size
                global defaultSize # One Default Size
                global Size # List
                defaultSize, Size = get_defaultSize(mUnderBust, mUpperBust, wPressure, breastSizeGeneral, braSizeUb, braSizeCup)
                log.debug(Size[0])

                # Size Fitering
                df_brAll['SIZE_FILTER'] = df_brAll.apply(filter_size, axis = 1)
                df_brAll = df_brAll[df_brAll.SIZE_FILTER == 1]
                # Get BR_CH 
                df_brCh = pd.read_sql(sql_brCh, db)

                # Get BR_NUM
                df_brNum = pd.read_sql(sql_brNum, db)

                # Get BR_DETAIL
                df_brDetail = pd.read_sql(sql_brDetail, db)
                df_brDetail = df_brDetail[['PK_ITEM', 'OLD_KEY', 'BIGGER_DEGREE', 'GATHER_DEGREE', 'PUSHUP_DEGREE']]
        
        
                # df = pd.merge(left = df_brAll, right = df_brCh, on = ['PK_ITEM', 'OLD_KEY'])
                df = pd.merge(left = df_brAll, right = df_brCh, how = 'left', on = ['PK_ITEM', 'OLD_KEY']) 
                df = pd.merge(left = df, right = df_brNum, how = 'left', on = ['PK_ITEM', 'OLD_KEY'])
                df = pd.merge(left = df, right = df_brDetail, how = 'left', on = ['PK_ITEM', 'OLD_KEY'])
                df['BREAST_FIT_SCORE'] = 0
                df['EFFECT_FIT_SCORE'] = 0

               
                
                # log.debug(len(df_brAll))
                if len(df.OLD_KEY.unique()) > 0:
                        
                
                        if len(df.OLD_KEY.unique()) > 6:
                        # Filtering
                        
                                if (flesh == 1) & (defaultSize not in ['65AA', '65A', '65B', '70AA', '70A', '70B', '75AA', '75A']):
                                        df.mTHICKNESS_PP.fillna(0, inplace = True)
                                        df.mTHICKNESS_DETACH_PP.fillna(-1, inplace = True)
                                        isPPs = []
                                        for idx, row in df.iterrows():
                                                isPP = (max(0, row.mTHICKNESS_DETACH_PP) + row.mTHICKNESS_PP) <= 1.5
                                                isPPs.append(isPP)
                                        df = df[isPPs]
                                        df.replace({'mTHICKNESS_PP':0}, {'mTHICKNESS_PP':np.nan}, inplace = True)
                                        df.replace({'mTHICKNESS_DETACH_PP' : -1}, {'mTHICKNESS_DETACH_PP':np.nan}, inplace = True)
                                
                                if 1 not in wType: # Wire Filtering
                                        df = df[df.WIRE != 0]  
                                
                                if rib == 1:
                                        df = df[df.L_SHAPE == 0]
                                
                                elif rib == 2:
                                        df = df[df.mHEIGHT <= mHeightLc]
                                        
                                
                                if len(df) > 0:
                                        dfTemp = df.copy()
                                        if wPP == 0:
                                                df = df[df.PP_SCORE == -1]
                                                if len(df.OLD_KEY.unique()) < 6:
                                                        df = dfTemp.copy()
                                                        df['EFFECT_FIT_SCORE'] = df.apply(lambda x:x.EFFECT_FIT_SCORE+200 if x.PP_SCORE == -1 else x.EFFECT_FIT_SCORE, axis = 1)
        
                                        elif wPP == 1:
                                                if not ((10 in brEffect) | (20 in brEffect) | (30 in brEffect)):
                                                        df = df[(df.PP_SCORE == 0) | (df.PP_SCORE == 1) | (df.PP_SCORE == -1)]
                                                        if len(df.OLD_KEY.unique()) < 6:
                                                                df = dfTemp.copy()
                                                                df['EFFECT_FIT_SCORE'] = df.apply(lambda x:x.EFFECT_FIT_SCORE+200 if ((row.PP_SCORE == 0) | (row.PP_SCORE == 1) | (row.PP_SCORE == -1)) else x.EFFECT_FIT_SCORE, axis = 1)
                                        elif wPP == 2:
                                                if (10 in brEffect) | (20 in brEffect) | (30 in brEffect):
                                                        df = df[(df.PP_SCORE == 2) | (df.PP_SCORE == 1)]
                                                        if len(df.OLD_KEY.unique()) < 6:
                                                                df = dfTemp.copy()
                                                                df['EFFECT_FIT_SCORE'] = df.apply(lambda x:x.EFFECT_FIT_SCORE+200 if ((row.PP_SCORE == 2) | (row.PP_SCORE == 1)) else x.EFFECT_FIT_SCORE, axis = 1)
                                                
                                                else:
                                                        df = df[(df.PP_SCORE == 0) | (df.PP_SCORE == 1) | (df.PP_SCORE == 2)]
                                                        if len(df.OLD_KEY.unique()) < 6:
                                                                df = dfTemp.copy()
                                                                df['EFFECT_FIT_SCORE'] = df.apply(lambda x:x.EFFECT_FIT_SCORE+200 if ((row.PP_SCORE == 0) | (row.PP_SCORE == 1) | (row.PP_SCORE == 2)) else x.EFFECT_FIT_SCORE, axis = 1)
                                                

                                        
                                        dfTemp = df.copy()
                                        
                                        if wImportant == 3:
                                                isDesignConcept = []
                                                for idx, row in df.iterrows():
                                                        isDesignConcept.append(row.DESIGN_CONCEPT in wDesignConcept)

                                                df = df[isDesignConcept]
                                                if len(df.OLD_KEY.unique()) < 6:
                                                        df = dfTemp.copy()
                                                        df['BREAST_FIT_SCORE'] = df.apply(lambda x:x.BREAST_FIT_SCORE+200 if x.DESIGN_CONCEPT in wDesignConcept else x.BREAST_FIT_SCORE, axis = 1)
                                                
                                        
                                        elif wImportant == 5:
                                                isPrice = []
                                                for idx, row in df.iterrows():
                                                        isPrice.append(row.PRICE <= wPriceMax)
                                                df = df[isPrice]
                                                if len(df.OLD_KEY.unique()) < 6:
                                                        df = dfTemp.copy()
                                                        df['BREAST_FIT_SCORE'] = df.apply(lambda x:x.BREAST_FIT_SCORE+50 if x.PRICE <= wPriceMax else x.BREAST_FIT_SCORE, axis = 1)
                        

                        effectWeight = 1
                        if wImportant == 1:
                                effectWeight = 1.5             

                        if len(df.OLD_KEY.unique()) > 0:
                                # Score
                                df['BREAST_FIT_SCORE'] = df.apply(score_breastFit, axis = 1)
                                df['EFFECT_FIT_SCORE'] = df.apply(score_effectFit, axis = 1)
                                
                        
                
                                if wBrEffectMost == 0:
                                        df["SCORE"] = df.apply(
                                                lambda x: x.BREAST_FIT_SCORE + x.EFFECT_FIT_SCORE - (x.BIGGER_SCORE + x.GATHER_SCORE + x.PUSHUP_SCORE + x.SUPPORT_SCORE + x.ACCBREAST_SCORE + x.BACK_SCORE) * effectWeight, axis=1
                                        )
                                        df['EFFECT_FIT_SCORE'] = df.apply(
                                                lambda x: x.BIGGER_SCORE + x.GATHER_SCORE + x.PUSHUP_SCORE + x.SUPPORT_SCORE + x.ACCBREAST_SCORE + x.BACK_SCORE, axis=1
                                        )
                                
                                else: 
                                        df["SCORE"] = df.apply(
                                                lambda x: x.BREAST_FIT_SCORE + x.EFFECT_FIT_SCORE * effectWeight, axis=1
                                        )
                                
                                df.sort_values(by = 'SCORE', ascending = False, inplace = True)
                                df.drop_duplicates(['OLD_KEY'],keep='first',inplace=True)
                                df.reset_index(drop = True, inplace = True)
                        
                                # Brand Balancing
                                counts = df.SCORE.value_counts().to_list()
                                for idx, key in enumerate(df.SCORE.value_counts().keys().tolist()):
                                
                                        if counts[idx] > 1:
                                                dfTemp = df[df.SCORE == key].copy()
                                                start = dfTemp.index[0]
                                                finish = dfTemp.index[-1]
                                                dfLen = len(dfTemp)
                                                dfTemp['BD_NAME'] = dfTemp.PK_ITEM.apply(lambda x:x[:2])
                                                bdNames = dfTemp.BD_NAME.value_counts().keys().tolist()
                                                bdNamesLen = len(bdNames)
                                                
                                                for idx, name in enumerate(bdNames):
                                                        globals()['df{}'.format(idx)] = dfTemp[dfTemp.BD_NAME == name].copy()
                                                        globals()['df{}'.format(idx)].reset_index(drop = True, inplace = True)
                                                
                                                dfNew = pd.DataFrame(index=range(0,0), columns=dfTemp.columns)
                                                stamp = 0
                                                for i in range(dfLen):
                                                        dfNew = dfNew.append(globals()['df{}'.format(stamp)].iloc[0])
                                                        globals()['df{}'.format(stamp)].drop(0, inplace = True)
                                                        globals()['df{}'.format(stamp)].reset_index(drop = True, inplace = True)
                                                        stamp = (stamp+1) % bdNamesLen
                                                        if i != dfLen -1:
                                                                while len(globals()['df{}'.format(stamp)]) == 0:
                                                                        stamp = (stamp+1) % bdNamesLen
                                                dfNew.reset_index(drop = True, inplace = True)
                                                df[start:finish+1] = dfNew

                df.reset_index(drop = True, inplace = True)
                maxLen = min(len(df), 10)
                df = df[:maxLen]
        
                for i in range(1,len(df)+1):
                        globals()['pkItem{}'.format(i)] = df.iloc[i-1].PK_ITEM
                        globals()['oldKey{}'.format(i)] = df.iloc[i-1].OLD_KEY
                        globals()['size{}'.format(i)] = get_each_size(df.iloc[i-1].SIZE)
                        globals()['breastScore{}'.format(i)] = df.iloc[i-1].BREAST_FIT_SCORE
                        globals()['effectScore{}'.format(i)] = df.iloc[i-1].EFFECT_FIT_SCORE
                
                Size = ",".join(Size)
                Size = Size + ','

                checkAll = 0
                checkAdmin = 0
                hFittingApply = 0
                num = maxLen
                decision = None

                sql_recomBra = "INSERT INTO BRA_RECOM(PK_ID, NUM, DECISION, SIZE, wBR_EFFECT, PK_ITEM_1, OLD_KEY_1, SIZE_1, SELECTED_COLOR_1,\
                        BREAST_SCORE_1, EFFECT_SCORE_1, PK_ITEM_2, OLD_KEY_2, SIZE_2, SELECTED_COLOR_2, BREAST_SCORE_2, EFFECT_SCORE_2, PK_ITEM_3, OLD_KEY_3, SIZE_3, SELECTED_COLOR_3, BREAST_SCORE_3, EFFECT_SCORE_3,\
                                PK_ITEM_4, OLD_KEY_4, SIZE_4, SELECTED_COLOR_4, BREAST_SCORE_4, EFFECT_SCORE_4, PK_ITEM_5, OLD_KEY_5, SIZE_5, SELECTED_COLOR_5, BREAST_SCORE_5, EFFECT_SCORE_5,\
                                PK_ITEM_6, OLD_KEY_6, SIZE_6, SELECTED_COLOR_6, BREAST_SCORE_6, EFFECT_SCORE_6, PK_ITEM_7, OLD_KEY_7, SIZE_7, SELECTED_COLOR_7, BREAST_SCORE_7, EFFECT_SCORE_7,\
                                        PK_ITEM_8, OLD_KEY_8, SIZE_8, SELECTED_COLOR_8, BREAST_SCORE_8, EFFECT_SCORE_8, PK_ITEM_9, OLD_KEY_9, SIZE_9, SELECTED_COLOR_9, BREAST_SCORE_9, EFFECT_SCORE_9, PK_ITEM_10, OLD_KEY_10, SIZE_10, SELECTED_COLOR_10, BREAST_SCORE_10, EFFECT_SCORE_10) VALUES(\
                        %s,%s,%s,%s,%s,\
                                %s,%s,%s,%s,%s,%s,\
                                        %s,%s,%s,%s,%s,%s,\
                                                %s,%s,%s,%s,%s,%s,\
                                                        %s,%s,%s,%s,%s,%s,\
                                                                %s,%s,%s,%s,%s,%s,\
                                                                        %s,%s,%s,%s,%s,%s,\
                                                                                %s,%s,%s,%s,%s,%s,\
                                                                                        %s,%s,%s,%s,%s,%s,\
                                                                                                %s,%s,%s,%s,%s,%s,\
                                                                                                        %s,%s,%s,%s,%s,%s)"
                cur.execute(sql_recomBra, (pkId, num, decision, Size, wBrEffect, 
                        globals()['pkItem1'], globals()['oldKey1'], globals()['size1'], None, globals()['breastScore1'], globals()['effectScore1'], 
                        globals()['pkItem2'], globals()['oldKey2'], globals()['size2'], None, globals()['breastScore2'], globals()['effectScore2'],
                        globals()['pkItem3'], globals()['oldKey3'], globals()['size3'], None, globals()['breastScore3'], globals()['effectScore3'],
                        globals()['pkItem4'], globals()['oldKey4'], globals()['size4'], None, globals()['breastScore4'], globals()['effectScore4'], 
                        globals()['pkItem5'], globals()['oldKey5'], globals()['size5'], None, globals()['breastScore5'], globals()['effectScore5'],
                        globals()['pkItem6'], globals()['oldKey6'], globals()['size6'], None, globals()['breastScore6'], globals()['effectScore6'], 
                        globals()['pkItem7'], globals()['oldKey7'], globals()['size7'], None, globals()['breastScore7'], globals()['effectScore7'], 
                        globals()['pkItem8'], globals()['oldKey8'], globals()['size8'], None, globals()['breastScore8'], globals()['effectScore8'], 
                        globals()['pkItem9'], globals()['oldKey9'], globals()['size9'], None, globals()['breastScore9'], globals()['effectScore9'], 
                        globals()['pkItem10'], globals()['oldKey10'], globals()['size10'], None, globals()['breastScore10'], globals()['effectScore10']))
                db.commit()

                current = open('now.txt', 'r')
                lines = current.readlines()
                kitUploads = list(map(int, lines[0].strip().split(' ')))
                breastTests = list(map(int, lines[1].strip().split(' ')))
                braRecommends = list(map(int, lines[2].strip().split(' ')))
                
                kitAll, kitNow = kitUploads
                breastAll, breastNow = breastTests
                braAll, braNow = braRecommends
                braNow += 1
                slackKit.chat_postMessage(channel = "#웹테스트", text = "{}님의 브라 추천이 완료되었습니다.\n브라 추천된 사람 : {}/{}\n {}명 남았습니다".format(pkId, braNow, braAll, braAll-braNow))
                
                
                current.close()
                
                update = open('now.txt', 'w')
                update.write("{} {}\n{} {}\n{} {}".format(kitAll, kitNow, breastAll, breastNow, braAll, braNow))
                update.close()
        
                return jsonify({"success": "yes", "error": ""})
        
        except Exception as e:
                log.exception(f"{str(e)}, {type(e)}")
                slackKit.chat_postMessage(channel = "#웹테스트", text = "{}님의 브라 추천 코드에서 오류가 발생하였습니다".format(pkId))
                return jsonify({"success": "no", "error": str(e)})

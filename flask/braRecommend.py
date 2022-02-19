from flask import request, Blueprint, jsonify
import numpy as np
import pandas as pd
import pymysql
import math
import json
import logging
import logging.handlers

log = logging.getLogger("braRecommend")
log.setLevel(logging.DEBUG)

formatter = logging.Formatter("[%(levelname)s] (%(filename)s:%(lineno)d) > %(message)s")

fileHandler = logging.FileHandler("logs/braRecommend.log")
streamHandler = logging.StreamHandler()

fileHandler.setFormatter(formatter)
streamHandler.setFormatter(formatter)

log.addHandler(fileHandler)
log.addHandler(streamHandler)

blueprint = Blueprint("braRecommend", __name__, url_prefix="/")

with open("config.json", "r") as f:
    config = json.load(f)


def get_defaultSize(
    mUnderBust, mUpperBust, wPressure, breastSizeGeneral, braSizeUb, braSizeCup
):
    unders = ["65", "70", "75", "80", "85", "90", "95", "100", "105", "110"]
    cups = ["AA", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    diffs = []
    diff = mUpperBust - mUnderBust
    for i in range(len(cups)):
        diffs.append(7.5 + 2.5 * i)
    Size = []
    small = breastSizeGeneral in [
        "65AA",
        "65A",
        "65B",
        "70AA",
        "70A",
        "70B",
        "75AA",
        "75A",
    ]
    under = breastSizeGeneral[:2]
    cup = breastSizeGeneral[2:]
    braSize = unders[braSizeUb] + cups[braSizeCup]
    if under == "65":
        if (cup == "A") | (cup == "AA"):
            defaultSize = "65A"
            Size.append(defaultSize)
            Size.append("70AA")
            if wPressure <= 4:
                Size.append("70A")
            else:
                Size.append("65B")
        else:
            defaultSize = breastSizeGeneral
            Size.append(defaultSize)
            Size.append("70A")
            if wPressure <= 4:
                if mUnderBust <= 63:
                    Size.append("65A")
                else:
                    Size.append("70AA")
            else:
                Size.append("65A")
    else:
        if cup == "AA":
            if under == "70":
                defaultSize = breastSizeGeneral
                Size.append(defaultSize)
                if wPressure <= 4:
                    Size.append("75AA")
                    Size.append("70A")
                else:
                    Size.append("65A")
                    if mUnderBust <= 69:
                        Size.append("65AA")
                    else:
                        Size.append("70A")
            else:
                defaultSize = breastSizeGeneral
                Size.append(defaultSize)
                if wPressure <= 4:
                    Size.append("80AA")
                    if mUnderBust <= 74:
                        Size.append("75A")
                    else:
                        Size.append("80A")

                else:
                    Size.append("70A")
                    if mUnderBust <= 74:
                        Size.append("70AA")
                    else:
                        Size.append("75A")
        else:
            defaultSize = breastSizeGeneral
            Size.append(defaultSize)
            if wPressure <= 4:
                if mUnderBust < int(defaultSize[:2]):
                    if diff < diffs[cups.index(cup)]:
                        Size.append(under + cups[cups.index(cup) - 1])
                        if braSize == Size[0]:
                            Size.append(
                                unders[unders.index(under) + 1]
                                + cups[cups.index(cup) - 1]
                            )
                        elif braSize == Size[1]:
                            Size.append(
                                unders[unders.index(under) + 1]
                                + cups[cups.index(cup) - 1]
                            )
                        else:
                            Size.append(braSize)
                    else:
                        Size.append(under + cups[cups.index(cup) + 1])
                        if braSize == Size[0]:
                            Size.append(
                                unders[unders.index(under) + 1]
                                + cups[cups.index(cup) - 1]
                            )
                        elif braSize == Size[1]:
                            Size.append(unders[unders.index(under) + 1] + cup)
                        else:
                            Size.append(braSize)
                else:
                    if diff < diffs[cups.index(cup)]:
                        Size.append(
                            unders[unders.index(under) + 1] + cups[cups.index(cup) - 1]
                        )
                        if braSize == Size[0]:
                            Size.append(under + cups[cups.index(cup) - 1])
                        elif braSize == Size[1]:
                            Size.append(under + cups[cups.index(cup) - 1])
                        else:
                            Size.append(braSize)
                    else:
                        Size.append(
                            unders[unders.index(under) + 1] + cups[cups.index(cup) - 1]
                        )
                        if braSize == Size[0]:
                            Size.append(under + cups[cups.index(cup) + 1])
                        elif braSize == Size[1]:
                            Size.append(under + cups[cups.index(cup) + 1])
                        else:
                            Size.append(braSize)
            else:
                if mUnderBust < int(defaultSize[:2]):
                    if diff < diffs[cups.index(cup)]:
                        Size.append(unders[unders.index(under) - 1] + cup)
                        if braSize == Size[0]:
                            Size.append(under + cups[cups.index(cup) - 1])
                        elif braSize == Size[1]:
                            Size.append(
                                unders[unders.index(under) - 1]
                                + cups[cups.index(cup) + 1]
                            )
                        else:
                            Size.append(braSize)
                    else:
                        Size.append(
                            unders[unders.index(under) - 1] + cups[cups.index(cup) + 1]
                        )
                        if braSize == Size[0]:
                            Size.append(under + cups[cups.index(cup) + 1])
                        elif braSize == Size[1]:
                            Size.append(
                                unders[unders.index(under) - 1]
                                + cups[cups.index(cup) + 2]
                            )
                        else:
                            Size.append(braSize)
                else:
                    if diff < diffs[cups.index(cup)]:
                        Size.append(under + cups[cups.index(cup) - 1])
                        if braSize == Size[0]:
                            Size.append(
                                unders[unders.index(under) - 1]
                                + cups[cups.index(cup) + 1]
                            )
                        elif braSize == Size[1]:
                            Size.append(
                                unders[unders.index(under) - 1]
                                + cups[cups.index(cup) + 1]
                            )
                        else:
                            Size.append(braSize)
                    else:
                        Size.append(under + cups[cups.index(cup) + 1])
                        if braSize == Size[0]:
                            Size.append(
                                unders[unders.index(under) - 1]
                                + cups[cups.index(cup) + 1]
                            )
                        elif braSize == Size[1]:
                            Size.append(
                                unders[unders.index(under) - 1]
                                + cups[cups.index(cup) + 2]
                            )
                        else:
                            Size.append(braSize)

    return defaultSize, Size


def score_breastFit(x):
    score = x.BREAST_FIT_SCORE
    small = defaultSize in ["65AA", "65A", "65B", "70AA", "70A", "70B", "75AA", "75A"]

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
        arrSidebone = [0, 3, 3, 2]
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
        arrSidebone = [0, 3, 4, 3]
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
        score += x.BIGGER_SCORE / 15 * 10
    elif 10 in brEffect:
        score += x.BIGGER_SCORE
    if 2 in brEffect:
        score += x.GATHER_SCORE / 22 * 15
    elif 20 in brEffect:
        score += x.GATHER_SCORE
    if 3 in brEffect:
        score += x.PUSHUP_SCORE / 15 * 9
    elif 30 in brEffect:
        score += x.PUSHUP_SCORE
    if 4 in brEffect:
        score += x.SUPPORT_SCORE
    if 6 in brEffect:
        score += x.ACCBREAST_SCORE
    if 7 in brEffect:
        score += x.BACK_SCORE

    if wBrEffectMost != 0:
        if wBrEffectMost == 1:
            score += x.BIGGER_SCORE / 15 * 10
        elif wBrEffectMost == 10:
            score += x.BIGGER_SCORE
        elif wBrEffectMost == 2:
            score += x.GATHER_SCORE / 22 * 15
        elif wBrEffectMost == 20:
            score += x.GATHER_SCORE
        elif wBrEffectMost == 3:
            score += x.PUSHUP_SCORE / 15 * 9
        elif wBrEffectMost == 30:
            score += x.PUSHUP_SCORE
        elif wBrEffectMost == 4:
            score += x.SUPPORT_SCORE
        elif wBrEffectMost == 6:
            score += x.ACCBREAST_SCORE
        elif wBrEffectMost == 7:
            score += x.BACK_SCORE

    return score


def filter_size(x):
    sizes = x.split(",")
    score = 0
    realSizes = ""
    for size in sizes:
        for idx, pSize in enumerate(Size):
            if "(" not in size:
                if (pSize[:2] in size) & (pSize[2:] in size) & (size not in realSizes):
                    score += 10 ** (2 - idx)
                    realSizes += size + ","
            else:
                if (pSize in size) & (size not in realSizes):
                    score += 10 ** (2 - idx)
                    realSizes += size + ","

    if score > 100:
        return 1
    else:
        return 0


def get_each_size(x):
    sizes = x.split(",")
    realSizes = ""
    for size in sizes:
        for idx, pSize in enumerate(Size):
            if "(" not in size:
                if (pSize[:2] in size) & (pSize[2:] in size):
                    if size not in realSizes:
                        realSizes += size + ","
            else:
                if pSize in size:
                    if size not in realSizes:
                        realSizes += size + ","

    return realSizes


@blueprint.route("braRecommend", methods=["POST"])
def recommend():
    try:
        requestData = request.data.decode("utf-8")
        Data = json.loads(requestData)
        pkId = Data["PK_ID"]
        db = pymysql.connect(
            host=config["host"],
            user=config["user"],
            db=config["db"],
            password=config["password"],
            charset=config["charset"],
        )
        cur = db.cursor()

        for i in range(1, 11):
            globals()["pkItem{}".format(i)] = None
            globals()["oldKey{}".format(i)] = None
            globals()["size{}".format(i)] = None
            globals()["breastScore{}".format(i)] = None
            globals()["effectScore{}".format(i)] = None

        sql_breastTest = "SELECT * FROM BREAST_TEST where PK_ID = %s"
        sql_breastResult = "SELECT * FROM BREAST_RESULT where PK_ID = %s"

        cur.execute(sql_breastResult, pkId)
        result_breastResult = cur.fetchall()
        global btSag, flesh
        (
            _,
            _,
            breastSizeGeneral,
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
            btSag,
            _,
            _,
            _,
            _,
            _,
            _,
            rib,
            _,
            flesh,
            _,
            _,
        ) = result_breastResult[0]

        cur.execute(sql_breastTest, pkId)
        result_breastTest = cur.fetchall()
        global brEffect, wBrEffectMost
        (
            _,
            _,
            _,
            _,
            _,
            whereBt,
            _,
            _,
            _,
            _,
            _,
            _,
            _,
            _,
            _,
            mHeightLcL,
            _,
            _,
            _,
            _,
            mHeightLcR,
            _,
            _,
            _,
            _,
            _,
            _,
            _,
            mUnderBust,
            mUpperBust,
            _,
            _,
            braSizeUb,
            braSizeCup,
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
            wPressure,
            _,
            wPP,
            wBrEffect,
            wBrEffectMost,
            _,
            _,
            wDesignConcept,
            _,
            _,
            wPriceMax,
            wImportant,
            _,
            _,
            _,
        ) = result_breastTest[0]

        if wDesignConcept[-1] == ",":
            wDesignConcept = wDesignConcept[: len(wDesignConcept) - 1]
        wDesignConcept = wDesignConcept.split(",")
        wDesignConcept = list(map(int, wDesignConcept))

        if whereBt == 0:
            mHeightLc = mHeightLcL
        elif whereBt == 1:
            mHeightLc = mHeightLcR
        else:
            mHeightLc = (mHeightLcL + mHeightLcR) / 2

        if wBrEffect[-1] == ",":
            wBrEffect = wBrEffect[: len(wBrEffect) - 1]
        brEffect = wBrEffect.split(",")
        brEffect = list(map(int, brEffect))
        wBrEffect = wBrEffect + ","

        sql_brAll = "select * from BR_ALL"
        sql_brCh = "select * from BR_CH"
        sql_brNum = "select * from BR_NUM"

        # Get BR_ALL
        df_brAll = pd.read_sql(sql_brAll, db)

        # Get the recommend size
        global defaultSize  # One Default Size
        global Size  # List
        defaultSize, Size = get_defaultSize(
            mUnderBust, mUpperBust, wPressure, breastSizeGeneral, braSizeUb, braSizeCup
        )

        # Size Fitering
        df_brAll["SIZE_FILTER"] = df_brAll.SIZE.apply(filter_size)
        df_brAll = df_brAll[df_brAll.SIZE_FILTER == 1]

        # Get BR_CH
        df_brCh = pd.read_sql(sql_brCh, db)

        # Get BR_NUM
        df_brNum = pd.read_sql(sql_brNum, db)

        # df = pd.merge(left = df_brAll, right = df_brCh, on = ['PK_ITEM', 'OLD_KEY'])
        df = pd.merge(
            left=df_brAll, right=df_brCh, how="left", on=["PK_ITEM", "OLD_KEY"]
        )
        df = pd.merge(left=df, right=df_brNum, how="left", on=["PK_ITEM", "OLD_KEY"])

        df["BREAST_FIT_SCORE"] = 0
        df["EFFECT_FIT_SCORE"] = 0

        if len(df) > 6:
            # Filtering

            if (flesh == 1) & (
                defaultSize
                not in ["65AA", "65A", "65B", "70AA", "70A", "70B", "75AA", "75A"]
            ):
                df.mTHICKNESS_PP.fillna(0, inplace=True)
                df.mTHICKNESS_DETACH_PP.fillna(-1, inplace=True)
                isPPs = []
                for idx, row in df.iterrows():
                    isPP = (max(0, row.mTHICKNESS_DETACH_PP) + row.mTHICKNESS_PP) <= 1.5
                    isPPs.append(isPP)
                df = df[isPPs]
                df.replace(
                    {"mTHICKNESS_PP": 0}, {"mTHICKNESS_PP": np.nan}, inplace=True
                )
                df.replace(
                    {"mTHICKNESS_DETACH_PP": -1},
                    {"mTHICKNESS_DETACH_PP": np.nan},
                    inplace=True,
                )

            if rib == 1:
                df = df[df.L_SHAPE == 0]

            elif rib == 2:
                df = df[df.mHEIGHT <= mHeightLc]

            dfTemp = df.copy()
            if wPP == 0:
                # df = df[df.EXISTENCE_PP == 0 & ( (df.mTHICKNESS_DETACH_PP == None) | (df.mTHICKNESS_DETACH_PP == 0) )]
                df = df[df.PP_SCORE == -1]
                if len(df.OLD_KEY.unique()) < 6:
                    df = dfTemp.copy()
                    df["EFFECT_FIT_SCORE"] = df.apply(
                        lambda x: x.EFFECT_FIT_SCORE + 100
                        if x.PP_SCORE == -1
                        else x.EFFECT_FIT_SCORE,
                        axis=1,
                    )
            elif wPP == 1:
                if not ((10 in brEffect) | (20 in brEffect) | (30 in brEffect)):
                    df = df[
                        (df.PP_SCORE == 0) | (df.PP_SCORE == 1) | (df.PP_SCORE == -1)
                    ]
                    if len(df.OLD_KEY.unique()) < 6:
                        df = dfTemp.copy()
                        df["EFFECT_FIT_SCORE"] = df.apply(
                            lambda x: x.EFFECT_FIT_SCORE + 100
                            if (
                                (row.PP_SCORE == 0)
                                | (row.PP_SCORE == 1)
                                | (row.PP_SCORE == -1)
                            )
                            else x.EFFECT_FIT_SCORE,
                            axis=1,
                        )
            elif wPP == 2:
                if (10 in brEffect) | (20 in brEffect) | (30 in brEffect):
                    df = df[(df.PP_SCORE == 2) | (df.PP_SCORE == 1)]
                    if len(df.OLD_KEY.unique()) < 6:
                        df = dfTemp.copy()
                        df["EFFECT_FIT_SCORE"] = df.apply(
                            lambda x: x.EFFECT_FIT_SCORE + 100
                            if ((row.PP_SCORE == 2) | (row.PP_SCORE == 1))
                            else x.EFFECT_FIT_SCORE,
                            axis=1,
                        )

                else:
                    df = df[
                        (df.PP_SCORE == 0) | (df.PP_SCORE == 1) | (df.PP_SCORE == 2)
                    ]
                    if len(df.OLD_KEY.unique()) < 6:
                        df = dfTemp.copy()
                        df["EFFECT_FIT_SCORE"] = df.apply(
                            lambda x: x.EFFECT_FIT_SCORE + 100
                            if (
                                (row.PP_SCORE == 0)
                                | (row.PP_SCORE == 1)
                                | (row.PP_SCORE == 2)
                            )
                            else x.EFFECT_FIT_SCORE,
                            axis=1,
                        )

            dfTemp = df.copy()

            if wImportant == 3:
                isDesignConcept = []
                for idx, row in df.iterrows():
                    isDesignConcept.append(row.DESIGN_CONCEPT in wDesignConcept)

                df = df[isDesignConcept]
                if len(df.OLD_KEY.unique()) < 6:
                    df = dfTemp.copy()
                    df["BREAST_FIT_SCORE"] = df.apply(
                        lambda x: x.BREAST_FIT_SCORE + 50
                        if x.DESIGN_CONCEPT in wDesignConcept
                        else x.BREAST_FIT_SCORE,
                        axis=1,
                    )

            elif wImportant == 5:
                isPrice = []
                for idx, row in df.iterrows():
                    isPrice.append(row.PRICE <= wPriceMax)
                df = df[isPrice]
                if len(df.OLD_KEY.unique()) < 6:
                    df = dfTemp.copy()
                    df["BREAST_FIT_SCORE"] = df.apply(
                        lambda x: x.BREAST_FIT_SCORE + 50
                        if x.PRICE <= wPriceMax
                        else x.BREAST_FIT_SCORE,
                        axis=1,
                    )

        effectWeight = 1.5
        if wImportant == 1:
            effectWeight = 2

        # Score
        df["BREAST_FIT_SCORE"] = df.apply(score_breastFit, axis=1)
        df["EFFECT_FIT_SCORE"] = df.apply(score_effectFit, axis=1)

        df["SCORE"] = df.apply(
            lambda x: x.BREAST_FIT_SCORE + x.EFFECT_FIT_SCORE * effectWeight, axis=1
        )
        df.sort_values(by="SCORE", ascending=False, inplace=True)
        df.drop_duplicates(["OLD_KEY"], keep="first", inplace=True)
        df.reset_index(drop=True, inplace=True)

        # Brand Balancing
        counts = df.SCORE.value_counts().to_list()
        for idx, key in enumerate(df.SCORE.value_counts().keys().tolist()):

            if counts[idx] > 1:
                dfTemp = df[df.SCORE == key].copy()
                start = dfTemp.index[0]
                finish = dfTemp.index[-1]
                dfLen = len(dfTemp)
                dfTemp["BD_NAME"] = dfTemp.PK_ITEM.apply(lambda x: x[:2])
                bdNames = dfTemp.BD_NAME.value_counts().keys().tolist()
                bdNamesLen = len(bdNames)

                for idx, name in enumerate(bdNames):
                    globals()["df{}".format(idx)] = dfTemp[
                        dfTemp.BD_NAME == name
                    ].copy()
                    globals()["df{}".format(idx)].reset_index(drop=True, inplace=True)

                dfNew = pd.DataFrame(index=range(0, 0), columns=dfTemp.columns)
                stamp = 0
                for i in range(dfLen):
                    dfNew = dfNew.append(globals()["df{}".format(stamp)].iloc[0])
                    globals()["df{}".format(stamp)].drop(0, inplace=True)
                    globals()["df{}".format(stamp)].reset_index(drop=True, inplace=True)
                    stamp = (stamp + 1) % bdNamesLen
                    if i != dfLen - 1:
                        while len(globals()["df{}".format(stamp)]) == 0:
                            stamp = (stamp + 1) % bdNamesLen
                dfNew.reset_index(drop=True, inplace=True)
                df[start : finish + 1] = dfNew

        df.reset_index(drop=True, inplace=True)

        maxLen = min(len(df), 10)
        df = df[:maxLen]

        for i in range(1, len(df) + 1):
            globals()["pkItem{}".format(i)] = df.iloc[i - 1].PK_ITEM
            globals()["oldKey{}".format(i)] = df.iloc[i - 1].OLD_KEY
            globals()["size{}".format(i)] = get_each_size(df.iloc[i - 1].SIZE)
            globals()["breastScore{}".format(i)] = df.iloc[i - 1].BREAST_FIT_SCORE
            globals()["effectScore{}".format(i)] = df.iloc[i - 1].EFFECT_FIT_SCORE

        Size = ",".join(Size)
        Size = Size + ","

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
        cur.execute(
            sql_recomBra,
            (
                pkId,
                num,
                decision,
                Size,
                wBrEffect,
                pkItem1,
                oldKey1,
                size1,
                None,
                breastScore1,
                effectScore1,
                pkItem2,
                oldKey2,
                size2,
                None,
                breastScore2,
                effectScore2,
                pkItem3,
                oldKey3,
                size3,
                None,
                breastScore3,
                effectScore3,
                pkItem4,
                oldKey4,
                size4,
                None,
                breastScore4,
                effectScore4,
                pkItem5,
                oldKey5,
                size5,
                None,
                breastScore5,
                effectScore5,
                pkItem6,
                oldKey6,
                size6,
                None,
                breastScore6,
                effectScore6,
                pkItem7,
                oldKey7,
                size7,
                None,
                breastScore7,
                effectScore7,
                pkItem8,
                oldKey8,
                size8,
                None,
                breastScore8,
                effectScore8,
                pkItem9,
                oldKey9,
                size9,
                None,
                breastScore9,
                effectScore9,
                pkItem10,
                oldKey10,
                size10,
                None,
                breastScore10,
                effectScore10,
            ),
        )
        db.commit()
        log.info(f"{pkId}'s Bra Recommend Success!")
        return jsonify({"success": "yes", "message": "Bra Recommend Success"})

    except Exception as e:
        log.exception(f"{str(e)}, {type(e)}")
        return jsonify({"success": "no", "error": str(e)})

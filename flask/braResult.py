from flask import Blueprint, jsonify
import pandas as pd
import pymysql
import json
import logging
import logging.handlers

log = logging.getLogger("braResult")
log.setLevel(logging.DEBUG)

formatter = logging.Formatter("[%(levelname)s] (%(filename)s:%(lineno)d) > %(message)s")

fileHandler = logging.FileHandler("logs/braResult.log")
streamHandler = logging.StreamHandler()

fileHandler.setFormatter(formatter)
streamHandler.setFormatter(formatter)

log.addHandler(fileHandler)
log.addHandler(streamHandler)

blueprint = Blueprint("braResult", __name__, url_prefix="/")

with open("config.json", "r") as f:
    config = json.load(f)


@blueprint.route("braResult", methods=["POST"])
def result():
    try:
        db = pymysql.connect(
            host=config["host"],
            user=config["user"],
            db=config["db"],
            password=config["password"],
            charset=config["charset"],
        )
        cur = db.cursor()

        sql_brAll = "select * from BR_ALL"
        # Get BR_ALL
        cur.execute(sql_brAll)
        result_brAll = cur.fetchall()
        df_brAll = pd.DataFrame(result_brAll)
        sql_column = "select column_name from information_schema.columns where table_name = %s order by ordinal_position"
        cur.execute(sql_column, ("BR_ALL"))
        result_column = cur.fetchall()
        columns = []
        for i in result_column:
            columns.append(i[0])
        df_brAll.columns = columns
        df_brAll = df_brAll[["PK_ITEM", "OLD_KEY", "LINK", "PRICE"]]

        sql = "select * from BRA_RECOM"

        cur.execute(sql)
        result_brAll = cur.fetchall()
        df = pd.DataFrame(result_brAll)

        sql_column = "select column_name from information_schema.columns where table_name = %s order by ordinal_position"
        cur.execute(sql_column, ("BRA_RECOM"))
        result_column = cur.fetchall()
        columns = []
        for i in result_column:
            columns.append(i[0])

        df.columns = columns

        df_result = pd.DataFrame(
            index=range(0, 0), columns=["PK_ID", "PK_ITEM", "OLD_KEY", "SIZE", "COLOR"]
        )
        df_fix = pd.DataFrame(
            index=range(0, 0),
            columns=[
                "PK_ID",
                "COMPLETE",
                "NUM",
                "SIZE",
                "PK_ITEM_1",
                "OLD_KEY_1",
                "SIZE_1",
                "PK_SIZE_1",
                "PK_ITEM_2",
                "OLD_KEY_2",
                "SIZE_2",
                "PK_SIZE_2",
                "PK_ITEM_3",
                "OLD_KEY_3",
                "SIZE_3",
                "PK_SIZE_3",
                "PK_ITEM_4",
                "OLD_KEY_4",
                "SIZE_4",
                "PK_SIZE_4",
            ],
        )

        for idx, row in df.iterrows():
            decisions = row.DECISION
            if decisions[-1] == ",":
                decisions = decisions[: len(decisions) - 1].split(",")
            decisions = list(map(int, decisions))
            generalSize = row.SIZE.split(",")[0]

            fixArray = [row.PK_ID, row.COMPLETE, len(decisions), generalSize]
            for decision in decisions:
                sizes = row["SIZE_{}".format(decision)]

                fixArray.extend(
                    [
                        row["PK_ITEM_{}".format(decision)],
                        row["OLD_KEY_{}".format(decision)],
                        sizes,
                        row["PK_ITEM_{}".format(decision)][:2] + generalSize,
                    ]
                )

                if sizes[-1] == ",":
                    sizes = sizes[: len(sizes) - 1].split(",")
                colors = row["SELECTED_COLOR_{}".format(decision)]
                colors = colors[: len(colors) - 1].split(",")
                for idx, size in enumerate(sizes):
                    df_result.loc[len(df_result)] = [
                        row.PK_ID,
                        row["PK_ITEM_{}".format(decision)],
                        row["OLD_KEY_{}".format(decision)],
                        size,
                        colors[min(idx, len(colors) - 1)],
                    ]

            if len(decisions) < 4:
                for i in range(4):
                    fixArray.append(None)

            df_fix.loc[len(df_fix)] = fixArray

        df_result = pd.merge(
            left=df_result, right=df_brAll, how="left", on=["PK_ITEM", "OLD_KEY"]
        )

        for idx, row in df_result.iterrows():
            sql_insert = "INSERT INTO RECOM_RESULT(PK_ID, PK_ITEM, OLD_KEY, SIZE, COLOR, LINK, PRICE) VALUES(%s,%s,%s,%s,%s,%s,%s)"
            sql_insert_2 = "INSERT INTO BRA_STOCK(PK_ID, PK_ITEM, OLD_KEY, COLOR, SEND_REAL, PROBLEM, NEED_WASH, NUM_WASH) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
            cur.execute(
                sql_insert,
                (
                    row.PK_ID,
                    row.PK_ITEM,
                    row.OLD_KEY,
                    row.SIZE,
                    row.COLOR,
                    row.LINK,
                    row.PRICE,
                ),
            )
            cur.execute(
                sql_insert_2,
                (row.PK_ID, row.PK_ITEM, row.OLD_KEY, row.COLOR, 0, 0, 0, 0),
            )

        for idx, row in df_fix.iterrows():
            sql_insert = "INSERT INTO BRA_FIX(PK_ID, NUM, SIZE, PK_ITEM_1, OLD_KEY_1, SIZE_1, PK_SIZE_1, \
					PK_ITEM_2, OLD_KEY_2, SIZE_2, PK_SIZE_2, PK_ITEM_3, OLD_KEY_3, SIZE_3, PK_SIZE_3, PK_ITEM_4, OLD_KEY_4, SIZE_4, PK_SIZE_4) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            cur.execute(
                sql_insert,
                (
                    row.PK_ID,
                    row.NUM,
                    row.SIZE,
                    row.PK_ITEM_1,
                    row.OLD_KEY_1,
                    row.SIZE_1,
                    row.PK_SIZE_1,
                    row.PK_ITEM_2,
                    row.OLD_KEY_2,
                    row.SIZE_2,
                    row.PK_SIZE_2,
                    row.PK_ITEM_3,
                    row.OLD_KEY_3,
                    row.SIZE_3,
                    row.PK_SIZE_3,
                    row.PK_ITEM_4,
                    row.OLD_KEY_4,
                    row.SIZE_4,
                    row.PK_SIZE_4,
                ),
            )

        db.commit()
        return jsonify({"success": "yes", "message": "braResult success"})

    except Exception as e:
        log.exception(f"{str(e)}, {type(e)}")
        return jsonify({"success": "no", "error": str(e)})

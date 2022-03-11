import logging.handlers
import pandas as pd
import logging
import pymysql
import json
import sys

log = logging.getLogger("braResult")
log.setLevel(logging.DEBUG)

formatter = logging.Formatter("[%(levelname)s] (%(filename)s:%(lineno)d) > %(message)s")

fileHandler = logging.FileHandler("python/logs/braResult.log")
streamHandler = logging.StreamHandler()

fileHandler.setFormatter(formatter)
streamHandler.setFormatter(formatter)

log.addHandler(fileHandler)
log.addHandler(streamHandler)


with open("config.json", "r") as f:
        config = json.load(f)


def result(requestData):
        try:
                db = pymysql.connect(
                        host=config["host"],
                        user=config["user"],
                        db=config["db"],
                        password=config["password"],
                        charset=config["charset"],
                )
                cur = db.cursor()
                Data = json.loads(requestData)
                realPkIds = Data["PK_IDs"]

                sql_brAll = "select * from BR_ALL"
                # Get BR_ALL
                
                df_brAll = pd.read_sql(sql_brAll, db)
                df_brAll = df_brAll[["PK_ITEM", "OLD_KEY", "LINK", "PRICE"]]

                sql_braRecom = "select * from BRA_RECOM"

                df = pd.read_sql(sql_braRecom, db)
                realArray = []
                for idx, row in df.iterrows():
                        if row.PK_ID in realPkIds:
                                realArray.append(True)
                        else:
                                realArray.append(False)

                df = df[realArray]

                df_result = pd.DataFrame(
                        index=range(0, 0), columns=["PK_ID", "PK_ITEM", "OLD_KEY", "SIZE", "COLOR"]
                )
                df_fix = pd.DataFrame(
                        index=range(0, 0),
                        columns=[
                                "PK_ID",
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
                        if decisions[-1] == ',':
                                decisions = decisions[:len(decisions)-1]
                        decisions = decisions.split(',')
                        decisions = list(map(int, decisions))
                        generalSize = row.SIZE.split(',')[0]

                        fixArray = [row.PK_ID, len(decisions), generalSize]
                        for decision in decisions:
                                sizes = row['SIZE_{}'.format(decision)]

                                fixArray.extend([ row['PK_ITEM_{}'.format(decision)], row['OLD_KEY_{}'.format(decision)], sizes])
                                

                                if sizes[-1] == ',' :
                                        sizes = sizes[:len(sizes)-1]
                                sizes = sizes.split(',')     
                                pkSize = row['PK_ITEM_{}'.format(decision)][:2] + sizes[0]
                                fixArray.extend([pkSize])
                                        
                                colors = row["SELECTED_COLOR_{}".format(decision)]
                                if colors[-1] == ',':
                                        colors = colors[:len(colors)-1]
                                colors = colors.split(',')
                                for idx, size in enumerate(sizes):
                                        df_result.loc[len(df_result)] = [row.PK_ID, row['PK_ITEM_{}'.format(decision)], row['OLD_KEY_{}'.format(decision)], size, colors[min(idx, len(colors)-1)]]
                                        

                        if len(decisions) < 4:
                                for i in range(4):
                                        fixArray.append(None)
                        
                        df_fix.loc[len(df_fix)] = fixArray

                df_result = pd.merge(
                        left=df_result, right=df_brAll, how="left", on=["PK_ITEM", "OLD_KEY"]
                )

                for idx, row in df_result.iterrows():
                        sql_insert = "INSERT INTO RECOM_RESULT(PK_ID, PK_ITEM, OLD_KEY, SIZE, COLOR, LINK, PRICE) VALUES(%s,%s,%s,%s,%s,%s,%s)"
                        sql_insert_2 = "INSERT INTO BRA_STOCK(PK_ID, PK_ITEM, PK_SIZE, OLD_KEY, COLOR, SEND_REAL, PROBLEM, NEED_WASH, NUM_WASH) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
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
                                (row.PK_ID, row.PK_ITEM, row.PK_ITEM[:2] + row.SIZE, row.OLD_KEY, row.COLOR, 0, 0, 0, 0),
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
                print('{"success": "yes", "message": "braResult success"}')
                sys.stdout.flush()

        except Exception as e:
                log.exception(f"{str(e)}, {type(e)}")
                print(f'{"success": "no", "message": "braResult fail", "error": {str(e)}}')
                sys.stdout.flush()

if __name__ == '__main__':
        result(sys.argv[1])
SELECT
    PK_ID,
    mINNER_LEN_L,
    mOUTER_LEN_L,
    mLOWER_LEN_L,
    mOUTER_LEN_R,
    mINNER_LEN_R,
    mLOWER_LEN_R,
    mUNDER_BUST,
    mUPPER_BUST,
    mSHtoBP,
    mSHOULDER,
    CASE
        WHEN BRA_SIZE_CUP = 0
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'AA')
        WHEN BRA_SIZE_CUP = 1
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'A')
        WHEN BRA_SIZE_CUP = 2
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'B')
        WHEN BRA_SIZE_CUP = 3
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'C')
        WHEN BRA_SIZE_CUP = 4
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'D')
        WHEN BRA_SIZE_CUP = 5
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'E')
        WHEN BRA_SIZE_CUP = 6
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'F')
        WHEN BRA_SIZE_CUP = 7
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'G')
        WHEN BRA_SIZE_CUP = 8
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'H')
        WHEN BRA_SIZE_CUP = 9
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'I')
        WHEN BRA_SIZE_CUP = 10
        AND BRA_SIZE_UB IS NOT NULL THEN CONCAT(65 + 5 * BRA_SIZE_UB, 'J')
        ELSE NULL
    END AS BRA_SIZE,
    NUM_BRATABASE,
    CASE
        DIFF_BT_GAP
        WHEN 2 THEN '내 가슴 사이의 거리가 더 멂'
        WHEN 0 THEN '내 가슴 사이의 거리가 더 좁음'
        WHEN 1 THEN '사진과 비슷함'
        ELSE NULL
    END AS DIFF_BT_GAP,
    CASE
        DIFF_BP_DIR
        WHEN 2 THEN '더 벌어져 있다'
        WHEN 0 THEN '덜 벌어져 있다'
        WHEN 1 THEN '사진과 비슷함'
        ELSE NULL
    END AS DIFF_BP_DIR,
    CASE
        DIFF_BT_SAG
        WHEN 2 THEN "더 처졌다"
        WHEN 0 THEN "덜 처졌다"
        WHEN 1 THEN "사진과 비슷함"
        ELSE NULL
    END AS DIFF_BT_SAG,
    DIFF_STR,
    CASE
        TYPE_BT_SIZEDIFF
        WHEN 0 THEN '비슷해요'
        WHEN 1 THEN '한쪽이 살짝 커요'
        WHEN 2 THEN '한쪽이 한컵 이상 커요'
        ELSE NULL
    END AS TYPE_BT_SIZEDIFF,
    CASE
        TYPE_SHOULDER
        WHEN 0 THEN '해당 없음'
        WHEN 1 THEN '세모형 어깨'
        ELSE NULL
    END AS TYPE_SHOULDER,
    CASE
        TYPE_RIB
        WHEN 1 THEN '오목가슴'
        WHEN 2 THEN '새가슴'
        WHEN 0 THEN '해당없음'
        ELSE NULL
    END AS TYPE_RIB,
    CASE
        TYPE_ACCBREAST
        WHEN 1 THEN '부유방이 있어요'
        WHEN 2 THEN '부유방 & 길이 나있어요'
        WHEN 0 THEN '해당없음'
        ELSE NULL
    END AS TYPE_ACCBREAST,
    CASE
        TYPE_BT_FINISH_L
        WHEN 0 THEN '겨드랑이 안쪽'
        WHEN 2 THEN '겨드랑이 바깥쪽'
        WHEN 1 THEN '겨드랑이 선과 거의 일치'
        ELSE NULL
    END AS TYPE_BT_FINISH_L,
    CASE
        TYPE_BT_FINISH_R
        WHEN 0 THEN '겨드랑이 안쪽'
        WHEN 2 THEN '겨드랑이 바깥쪽'
        WHEN 1 THEN '겨드랑이 선과 거의 일치'
        ELSE NULL
    END AS TYPE_BT_FINISH_R,
    CASE
        TYPE_BT_FLESH
        WHEN 0 THEN '0~25%, 대부분 지방'
        WHEN 1 THEN '26~50%, 대부분 지방, 군데군데 몽우리'
        WHEN 2 THEN '51~75%, 몽우리 보통'
        WHEN 3 THEN '76~100%, 대부분 몽우리'
        ELSE NULL
    END AS TYPE_BT_FLESH,
    wPRESSURE,
    wTYPE,
    CASE
        wPP
        WHEN 0 THEN "뽕 싫어"
        WHEN 1 THEN "뽕이 좀 있어도 괜찮아"
        WHEN 2 THEN "뽕 원해"
        ELSE NULL
    END AS wPP,
    wBR_EFFECT,
    CASE
        wBR_EFFECT_MOST
        WHEN 0 THEN "기능 원하지 않음"
        WHEN 1 THEN "조금 커보이기"
        WHEN 10 THEN "많이 커보이게"
        WHEN 2 THEN "조금 모아주기"
        WHEN 20 THEN "많이 모아주기"
        WHEN 3 THEN "조금 올려주기"
        WHEN 30 THEN "많이 올려주기"
        WHEN 4 THEN "받쳐주기"
        WHEN 5 THEN "작아보이기"
        WHEN 6 THEN "부유방 보정"
        WHEN 7 THEN "등살 보정"
        ELSE NULL
    END AS wBR_EFFECT_MOST,
    wMATERIAL,
    wMATERIAL_STR,
    wDESIGN_CONCEPT,
    wCOLOR_TASTE,
    CASE
        WHEN wPRICE_MIN IS NOT NULL
        AND wPRICE_MAX IS NOT NULL THEN CONCAT(wPRICE_MIN, '-', wPRICE_MAX)
        ELSE NULL
    END AS PRICE_RANGE,
    CASE
        wIMPORTANT
        WHEN 1 THEN '기능'
        WHEN 2 THEN '소재'
        WHEN 3 THEN '디자인'
        WHEN 4 THEN '색상'
        WHEN 5 THEN '가격'
        WHEN 0 THEN '중요한 한 가지는 딱히 없다. 골고루'
        ELSE NULL
    END AS wIMPORTANT,
    BIRTH_YEAR,
    CONCAT(YEAR(CURRENT_DATE()) - BIRTH_YEAR, "세") AS AGE
FROM
    BREAST_TEST
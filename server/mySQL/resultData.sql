SELECT
    CASE
        DAYOFWEEK(BREAST_RESULT.createdAt)
        WHEN '1' THEN CONCAT(
            date_format(BREAST_RESULT.createdAt, '%Y-%m-%d'),
            '(일)'
        )
        WHEN '2' THEN CONCAT(
            date_format(BREAST_RESULT.createdAt, '%Y-%m-%d'),
            '(월)'
        )
        WHEN '3' THEN CONCAT(
            date_format(BREAST_RESULT.createdAt, '%Y-%m-%d'),
            '(화)'
        )
        WHEN '4' THEN CONCAT(
            date_format(BREAST_RESULT.createdAt, '%Y-%m-%d'),
            '(수)'
)
        WHEN '5' THEN CONCAT(
            date_format(BREAST_RESULT.createdAt, '%Y-%m-%d'),
            '(목)'
        )
        WHEN '6' THEN CONCAT(
            date_format(BREAST_RESULT.createdAt, '%Y-%m-%d'),
            '(금)'
        )
        WHEN '7' THEN CONCAT(
            date_format(BREAST_RESULT.createdAt, '%Y-%m-%d'),
            '(토)'
        )
    END AS date,
    USER.username,
    BREAST_SIZE_GENERAL AS 'size',
    -- 가슴 밑선 --
    LEFT_LOWER_SHAPE_IMG_PATH AS 'leftLowerShapeImg',
    RIGHT_LOWER_SHAPE_IMG_PATH AS 'rightLowerShapeImg',
    CONCAT(round(LEFT_WIDTH_LC, 2), 'cm') AS 'leftWidth',
    CONCAT(round(RIGHT_WIDTH_LC, 2), 'cm') AS 'rightWidth',
    round(LEFT_CURVE_INNER_LC, 2) AS 'leftInnerCurve',
    round(RIGHT_CURVE_INNER_LC, 2) AS 'rightInnerCurve',
    round(LEFT_CURVE_OUTER_LC, 2) AS 'leftOuterCurve',
    round(RIGHT_CURVE_OUTER_LC, 2) AS 'rightOuterCurve',
    CASE
        LEFT_FINISH
        WHEN 0 THEN '겨드랑이 안쪽'
        WHEN 1 THEN '겨드랑이 선과 거의 일치'
        WHEN 2 THEN '겨드랑이 바깥쪽'
        ELSE NULL
    END AS 'leftFinish',
    CASE
        RIGHT_FINISH
        WHEN 0 THEN '겨드랑이 안쪽'
        WHEN 1 THEN '겨드랑이 선과 거의 일치'
        WHEN 2 THEN '겨드랑이 바깥쪽'
        ELSE NULL
    END AS 'rightFinish',
    -- 지방 분포 --
    CASE
        BT_SHAPE
        WHEN 0 THEN '돌출형'
        WHEN 1 THEN '고른형'
        WHEN 2 THEN '완만형'
        ELSE NULL
    END AS 'distAreaName',
    CASE
        INOUT_VOLUME
        WHEN 0 THEN '안쪽형'
        WHEN 1 THEN '고른형'
        WHEN 2 THEN '바깥형'
        ELSE NULL
    END AS 'distInOutName',
    CASE
        UPDOWN_VOLUME
        WHEN 0 THEN '위쪽형'
        WHEN 1 THEN '고른형'
        WHEN 2 THEN '아래형'
        ELSE NULL
    END AS 'distUpDownName',
    CASE
        BT_SHAPE
        WHEN 0 THEN '가슴 면적이 비교적 좁게 분포되어 있어 다소 뾰족한 느낌을 줍니다.'
        WHEN 1 THEN '가슴 면적이 비교적 고르게 분포되어 있습니다.'
        WHEN 2 THEN '가슴 면적이 비교적 넓게 분포되어 있어 다소 완만한 느낌을 줍니다.'
        ELSE NULL
    END AS 'distAreaInfo',
    CASE
        INOUT_VOLUME
        WHEN 0 THEN '안밖의 가슴 중 안 쪽의 부피가 더 큰 편입니다.'
        WHEN 1 THEN '안밖 가슴의 부피가 비슷한 편입니다.'
        WHEN 2 THEN '안밖의 가슴 중 바깥 쪽의 부피가 더 큰 편입니다.'
        ELSE NULL
    END AS 'distInOutInfo',
    CASE
        UPDOWN_VOLUME
        WHEN 0 THEN '위아래 가슴 중 위쪽의 부피가 더 큰 편입니다.'
        WHEN 1 THEN '위아래 가슴의 부피가 비슷한 편입니다.'
        WHEN 2 THEN '아래 가슴 중 아래쪽의 부피가 더 큰 편입니다. '
        ELSE NULL
    END AS 'distUpDownInfo',
    -- 위치정보 --
    BT_SAG AS 'sag',
    BP_DIR AS 'dir',
    BT_GAP AS 'gap',
    CASE
        BT_SAG
        WHEN 0 THEN '하'
        WHEN 1 THEN '중'
        WHEN 2 THEN '상'
        ELSE NULL
    END AS 'sagDegree',
    CASE
        BP_DIR
        WHEN 0 THEN '하'
        WHEN 1 THEN '중'
        WHEN 2 THEN '상'
        ELSE NULL
    END AS 'dirDegree',
    CASE
        BT_GAP
        WHEN 0 THEN '하'
        WHEN 1 THEN '중'
        WHEN 2 THEN '상'
        ELSE NULL
    END AS 'gapDegree',
    CASE
        BT_SAG
        WHEN 0 THEN '처짐이 거의 없는 편입니다.'
        WHEN 1 THEN '처짐이 있는 편입니다.'
        WHEN 2 THEN '처짐 정도가 큰 편입니다.'
        ELSE NULL
    END AS 'sagInfo',
    CASE
        BP_DIR
        WHEN 0 THEN '유두가 정면을 향하고 있는 편입니다.'
        WHEN 1 THEN '유두가 조금 바깥을 향하고 있는 편입니다.'
        WHEN 2 THEN '유두가 바깥을 향하고 있는 편입니다.'
        ELSE NULL
    END AS 'dirInfo',
    CASE
        BT_GAP
        WHEN 0 THEN '가슴 사이가 가까운 편입니다.'
        WHEN 1 THEN '가슴 사이가 멀지도, 가깝지도 않은 편입니다.'
        WHEN 2 THEN '가슴 사이가 비교적 먼 편입니다.'
        ELSE NULL
    END AS 'gapInfo',
    -- 짝가슴 여부 --
    CONCAT(BT_VOLUMEDIFF, 'cc') AS 'volumeDiff',
    CONCAT(BT_LSDIFF, 'cm') AS 'widthDiff',
    CASE
        BT_SIZEDIFF
        WHEN 0 THEN '브라 착용 시 짝가슴으로 인한 큰 문제가 없는 편!'
        WHEN 1 THEN '브라 착용 시 짝가슴으로 인한 불편이 있어, 조정이 필요한 편!'
        ELSE NULL
    END AS 'diffInfo',
    -- 가슴 외 결과 --
    CASE
        WHEN SHOULDER_SHAPE = 0
        AND SHOULDER_WIDTH = 0 THEN '경사지지 않은, 좁지 않은 편'
        WHEN SHOULDER_SHAPE = 0
        AND SHOULDER_WIDTH = 1 THEN '경사지지 않은, 좁은 편'
        WHEN SHOULDER_SHAPE = 1
        AND SHOULDER_WIDTH = 0 THEN '세모형, 좁지 않은 편'
        WHEN SHOULDER_SHAPE = 1
        AND SHOULDER_WIDTH = 1 THEN '세모형, 좁은 편'
        ELSE NULL
    END AS 'shoulder',
    CASE
        RIB
        WHEN 0 THEN '고른형'
        WHEN 1 THEN '오목형'
        WHEN 2 THEN '새가슴형'
        ELSE NULL
    END AS 'rib',
    CASE
        ACCBREAST
        WHEN 0 THEN '없는 편'
        WHEN 1 THEN '있는 편'
        WHEN 2 THEN '부유방과 함께 길이 나있음'
        ELSE NULL
    END AS 'accBreast',
    CASE
        FLESH
        WHEN 0 THEN '이동이 쉬운 편'
        WHEN 1 THEN '이동이 어려운 편'
        ELSE NULL
    END AS 'flesh',
    -- 올바르게 입고 있었을까 --
    CASE
        ACCBREAST
        WHEN 0 THEN '부유방이 거의 없는 것으로 보아,'
        WHEN 1 THEN '부유방이 있는 것으로 보아,'
        WHEN 2 THEN '부유방이 있는 것으로 보아,'
        ELSE NULL
    END AS 'wearing1',
    CASE
        ACCBREAST
        WHEN 0 THEN '브라를 올바른 방법으로 잘 착용하고 계셨군요!'
        WHEN 1 THEN '브라를 맞지 않는 방법으로 착용하셨을 가능성이 크군요!'
        WHEN 2 THEN '브라를 맞지 않는 방법으로 착용하셨을 가능성이 크군요!'
        ELSE NULL
    END AS 'wearing2',
    -- 이제까지 힘드셨죠? --
    CASE
        FLESH
        WHEN 0 THEN '가슴이 잘 고정되지 않고, 쉽게 빠지는 현상이 있는 살결 유형이에요!'
        WHEN 1 THEN '가슴이 잘 이동하지 않아, 쉽게 모아지지 않을 수 있는 살결 유형이에요!'
        ELSE NULL
    END AS 'hardToWear1',
    CASE
        RIB
        WHEN 0 THEN '브라 착용 시, 흉곽으로 인해 발생하는 문제는 크게 없었을 거에요.'
        WHEN 1 THEN '브라 착용시, 흉곽으로 인해 브라 중심이 뜨는 문제로 어려움을 겪을 수 있어요.'
        WHEN 2 THEN '브라 착용시, 흉곽으로 인해 브라 중심 부분이 답답하게 느껴지는 어려움을 겪을 수 있어요.'
        ELSE NULL
    END AS 'hardToWear2'

FROM
    BREAST_RESULT
    LEFT JOIN USER ON BREAST_RESULT.PK_ID = USER.PK_ID
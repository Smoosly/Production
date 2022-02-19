const multi_select = "MULTI_SELECT";
const single_select = "SINGLE_SELECT";
const short_answer = "SHORT_ANSWER";
const min_max = "MIN_MAX";
const BreastImages = require('./BreastTypeImage');

let survey = {
  // ----------------------------- 2. 나머지 가슴 수치 측정 ------------------------------- //
  page2: [
    {
      id: 1,
      flow_num: 2,
      flow_txt: "나머지 가슴 수치 측정",

      question_txt: "밑가슴 둘레를 측정해주세요. (cm)",
      column: "mUNDER_BUST",

      answer_type: short_answer,
      answer_options: []
    },
    {
      id: 2,
      flow_num: 2,
      flow_txt: "나머지 가슴 수치 측정",

      question_txt: "윗가슴 둘레를 측정해주세요. (cm)",
      column: "mUPPER_BUST",

      answer_type: short_answer,
      answer_options: []
    },
    {
      id: 3,
      flow_num: 2,
      flow_txt: "나머지 가슴 수치 측정",

      question_txt: "유장 길이를 측정해주세요.(선택입력)",
      column: "mSHtoBP",

      answer_type: short_answer,
      answer_options: []
    },
    {
      id: 4,
      flow_num: 2,
      flow_txt: "나머지 가슴 수치 측정",

      question_txt: "어깨 너비를 측정해주세요. (cm)",
      column: "mSHOULDER",

      answer_type: short_answer,
      answer_options: []
    }
  ],


  page3: [
    {
      id: 5,
      flow_num: 2,
      flow_txt: "나머지 가슴 수치 측정",

      question_txt: "가장 자주 입는 브라의 밑둘레 사이즈는?",
      column: "BRA_SIZE_UB",

      answer_type: single_select,
      answer_options: [
        { id: 0, content: "65" },
        { id: 1, content: "70" },
        { id: 2, content: "75" },
        { id: 3, content: "80" },
        { id: 4, content: "85" },
        { id: 5, content: "90" },
        { id: 6, content: "95" },
        { id: 7, content: "100" },
        { id: 8, content: "105" },
        { id: 9, content: "110" }
      ]
    },
    {
      id: 6,
      flow_num: 2,
      flow_txt: "나머지 가슴 수치 측정",

      question_txt: "가장 자주 입는 브라의 컵 사이즈는?",
      column: "BRA_SIZE_CUP",

      answer_type: single_select,
      answer_options: [
        { id: 0, content: "AA" },
        { id: 1, content: "A" },
        { id: 2, content: "B" },
        { id: 3, content: "C" },
        { id: 4, content: "D" },
        { id: 5, content: "E" },
        { id: 6, content: "F" },
        { id: 7, content: "G" },
        { id: 8, content: "H" },
        { id: 9, content: "I" },
        { id: 10, content: "J" }
      ]
    },
  ],
  
  // ----------------------------- 3. 가슴 사진 선택 ------------------------------- //
  // ----------------------------- 4. 사진과 다른 부분 선택 ------------------------------- //
  page4: [
    {
      id: 7,
      flow_num: 3,
      flow_txt: "가슴 사진 선택",

      question_txt: "step2. 더 다양한 가슴 선택",
      column: "NUM_BRATABASE",

      answer_type: single_select,
      answer_options: BreastImages
    },
    {
      id: 8,
      flow_num: 4,
      flow_txt: "사진과 다른 부분 선택",

      question_txt: "가슴 사이 거리",
      column: "DIFF_BT_GAP",

      answer_type: single_select,
      answer_options: [
        { id: 2, content: "더 멀다" },
        { id: 0, content: "더 좁다" },
        { id: 1, content: "사진과 비슷함" },
      ]
    },
    {
      id: 9,
      flow_num: 4,
      flow_txt: "사진과 다른 부분 선택",

      question_txt: "유두 벌어짐",
      column: "DIFF_BP_DIR",

      answer_type: single_select,
      answer_options: [
        { id: 2, content: "더 벌어져 있다" },
        { id: 0, content: "덜 벌어져 있다" },
        { id: 1, content: "사진과 비슷함" },
      ]
    },
    {
      id: 10,
      flow_num: 4,
      flow_txt: "사진과 다른 부분 선택",

      question_txt: "처짐",
      column: "DIFF_BT_SAG",

      answer_type: single_select,
      answer_options: [
        { id: 2, content: "더 처졌다" },
        { id: 0, content: "덜 처졌다" },
        { id: 1, content: "사진과 비슷함" },
      ]
    },
    {
      id: 11,
      flow_num: 4,
      flow_txt: "사진과 다른 부분 선택",

      question_txt: "기타 (선택입력)",
      column: "DIFF_STR",

      answer_type: short_answer,
      answer_options: []
    },
  ],


  // ---------------------------------- 5. 가슴 유형 -------------------------------------- //
  page5: [
    {
      id: 12,
      flow_num: 5,
      flow_txt: "신체 특성 파악",

      question_txt: "양쪽 가슴 사이즈의 차이는?",
      column: "TYPE_BT_SIZEDIFF",
      
      answer_type: single_select,
      answer_options: [
        { id: 0, content: "비슷해요", path: require("@/assets/breasttype/zzak_similiar.png") },
        { id: 1, content: "한쪽이 살짝 커요", path: require("@/assets/breasttype/zzak_halfcup.png") },
        { id: 2, content: "한쪽이 한컵 이상 커요", path: require("@/assets/breasttype/zzak_onecup.png") },
      ]
    },
  ],


  page6: [
    {
      id: 13,
      flow_num: 5,
      flow_txt: "가슴 유형",

      question_txt: "어깨는 어떤가요?",
      column: "TYPE_SHOULDER",

      answer_type: multi_select,
      answer_options: [
        { id: 0, content: "해당 없음", path: require("@/assets/test_guide/normal-shoulder.png") },
        { id: 1, content: "세모형 어깨", path: require("@/assets/test_guide/semo shoulder.png") },
      ]
    },
  ],

  page7: [
    {
      id: 14,
      flow_num: 5,
      flow_txt: "가슴 유형",

      question_txt: "흉곽은 어떤 모양인가요?",
      column: "TYPE_RIB",

      answer_type: single_select,
      answer_options: [
        { id: 1, content: "오목가슴", path: require("@/assets/test_guide/omock-gasum.png") },
        { id: 2, content: "새가슴", path: require("@/assets/test_guide/bird-gasum.png") },
        { id: 0, content: "해당없음", path: require("@/assets/test_guide/normal-gasum.png") },
      ]
    },
  ],

  page8: [
    {
      id: 15,
      flow_num: 5,
      flow_txt: "가슴 유형",

      question_txt: "부유방은?",
      column: "TYPE_ACCBREAST",

      answer_type: single_select,
      answer_options: [
        { id: 1, content: "부유방이 있음", path: require("@/assets/test_guide/richroom o.png") },
        { id: 2, content: "부유방과 길이 있음", path: require("@/assets/test_guide/richroom and road o.png") },
        { id: 0, content: "해당 없음", path: require("@/assets/test_guide/richroom x.png") },
      ]
    },
  ],

  //큰 질문은 '''가슴의 끝은 어디 위치하나요? (가이드 사진 제공 - 흐릿한 경우 가슴을 눌러서 확인해주세요)''' 로 되어있음!!! 따로 마크업해야함 - 칼럼이 달라서 나눴음.
  page9: [
    {
      id: 16,
      flow_num: 5,
      flow_txt: "가슴 유형",

      "question" : "가슴의 끝은 어디에 위치하나요?",
      question_txt: "왼쪽 가슴의 끝", //왼쪽은?
      column: "TYPE_BT_FINISH_L",

      answer_type: single_select,
      answer_options: [
        { id: 0, content: "안쪽" },
        { id: 2, content: "바깥쪽" },
        { id: 1, content: "선과 거의 일치" },
      ]
    },
    {
      id: 17,
      flow_num: 5,
      flow_txt: "가슴 유형",
      
      "question" : "가슴의 끝은 어디에 위치하나요?",
      question_txt: "오른쪽 가슴의 끝", //오른쪽은?
      column: "TYPE_BT_FINISH_R",

      answer_type: single_select,
      answer_options: [
        { id: 0, content: "안쪽" },
        { id: 2, content: "바깥쪽" },
        { id: 1, content: "선과 거의 일치" },
      ]
    },
    // {
    //   id: 18,
    //   flow_num: 5,
    //   flow_txt: "가슴 유형",

    //   question_txt: "가슴 끝의 경계는 선명한가요?",
    //   column: "TYPE_BT_FINISH_CLEAR",

    //   answer_type: single_select,
    //   answer_options: [
    //     { id: 1, content: "선명해요" },
    //     { id: 2, content: "선명하지 않아요" },
    //   ]
    // },
  ],


  page10: [
    {
      id: 18,
      flow_num: 5,
      flow_txt: "가슴 유형",

      question_txt: "가슴의 살결은 어떤가요?",
      column: "TYPE_BT_FLESH",

      answer_type: single_select,
      answer_options: [
        { id: 0, "label": "A. 0~25%", content: "대부분 지방", path: require("@/assets/test_guide/monguri_1.png")  },
        { id: 1, "label": "B. 26~50%", content: "대부분 지방, 군데군데 몽우리", path: require("@/assets/test_guide/monguri_2.png") },
        { id: 2, "label": "C. 51~75%", content: "몽우리 보통", path: require("@/assets/test_guide/monguri_3.png") },
        { id: 3, "label": "D. 76~100%", content: "대부분 몽우리", path: require("@/assets/test_guide/monguri_4.png") },
      ]
    },
  ],


  // ---------------------------------- 6. 취향 -------------------------------------- //
  page11: [
    {
      id: 19,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "압박감 선호도는?",
      column: "wPRESSURE",

      answer_type: single_select,
      answer_options: [
        { id: 0, content: "0" },
        { id: 1, content: "1" },
        { id: 2, content: "2" },
        { id: 3, content: "3" },
        { id: 4, content: "4" },
        { id: 5, content: "5" },
        { id: 6, content: "6" },
        { id: 7, content: "7" },
        { id: 8, content: "8" },
        { id: 9, content: "9" },
        { id: 10, content: "10" },
      ]
    },
  ],


  page12: [
    {
      id: 20,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "원하는 종류는? (복수선택)",
      column: "wTYPE",

      answer_type: multi_select,
      answer_options: [
        { id: 0, content: "와이어" },
        { id: 1, content: "노와이어"},
        { id: 2, content: "브라렛(준비중)", show: "hidden" },
        { id: 3, content: "스포츠브라(준비중)", show: "hidden" },
      ]
    },
  ],

  page13: [
    {
      id: 21,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "뽕브라 선호",
      column: "wPP",

      answer_type: single_select,
      answer_options: [
        { id: 2, content: "뽕 원함" },
        { id: 1, content: "뽕이 있어도 괜찮음" },
        { id: 0, content: "뽕 싫음" },
      ],
    },
    {
      id: 22,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "원하는 기능은? (복수선택)",
      column: "wBR_EFFECT",

      answer_type: multi_select,
      answer_contents: [
        { id: 1, content: "커보이기", subContents: ["조금", "많이"] },
        { id: 2, content: "모아주기", subContents: ["조금", "많이"]  },
        { id: 3, content: "올려주기", subContents: ["조금", "많이"]  },
      ],
      others: [
        { id: 4, content: "받쳐주기" },
        { id: 5, content: "작아보이기" },
        { id: 6, content: "부유방 보정" },
        { id: 7, content: "등살 보정" },
        { id: 0, content: "기능 원하지 않음" },
      ],
    },
    {
      id: 23,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "그 중 가장 중요한 기능은 무엇인가요?",
      column: "wBR_EFFECT_MOST",

      answer_type: single_select,
      answer_options: [
        { id: 1, content: "조금 커보이기" },
        { id: 10, content: "많이 커보이기" },

        { id: 2, content: "조금 모아주기" },
        { id: 20, content: "많이 모아주기" },

        { id: 3, content: "조금 올려주기" },
        { id: 30, content: "많이 올려주기" },

        { id: 4, content: "받쳐주기" },
        { id: 5, content: "작아보이기" },
        { id: 6, content: "부유방 보정" },
        { id: 7, content: "등살 보정" },
        { id: 0, content: "기능 원하지 않음" }
      ]
    },
  ],

  page14: [
    {
      id: 24,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "원하는 소재는? (복수선택)",
      column: "wMATERIAL", //0

      answer_type: multi_select,
      answer_options: [
        { id: 1, content: "통기성 좋은 소재" },
        { id: 2, content: "땀이 잘 흡수되는 소재" },
        { id: 3, content: "심리스" },
        { id: 4, content: "천연 소재 (면,모달)" },
        { id: 5, content: "부드러운 소재" },
        { id: 0, content: "상관 없음" },
      ]
    },
    {
      id: 25,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "소재 관련 특이사항은? (선택입력)",
      column: "wMATERIAL_STR", //1

      answer_type: short_answer,
      answer_options: []
    },
    {
      id: 26,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "원하는 디자인은? (복수선택)",
      column: "wDESIGN_CONCEPT", //2

      answer_type: multi_select,
      answer_options: [
        { id: 1, content: "레이스", path: require("@/assets/bra_details/lace_bra.png") },
        { id: 2, content: "심플", path: require("@/assets/bra_details/simple_bra.png") },
        { id: 3, content: "패션", path: require("@/assets/bra_details/fashion_bra.png") },
        { id: 4, content: "패턴", path: require("@/assets/bra_details/pattern_bra.png") },
        { id: 0, content: "상관없음", path: require("@/assets/x.png")  },
      ]
    },
    {
      id: 27,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "색상 취향을 자유롭게 적어주세요",
      column: "wCOLOR_TASTE", //3

      answer_type: short_answer,
      answer_options: []
    },
    {
      id: 28,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "선호하는 가격대는?",
      column: ["wPRICE_MIN", "wPRICE_MAX"], //4, 5

      answer_type: min_max,
      answer_options: []
    },
  ],

  page15: [
    {
      id: 29,
      flow_num: 6,
      flow_txt: "브라 취향",

      question_txt: "취향 요소중에 가장 중요한 한가지 요소는?",
      column: "wIMPORTANT",

      answer_type: single_select,
      answer_options: [
        { id: 1, content: "기능", subContents: "(모아주기, 올려주기, 받쳐주기, 작아보이게, 커보이게 등)" },
        { id: 2, content: "소재" },
        { id: 3, content: "디자인" },
        { id: 4, content: "색상" },
        { id: 5, content: "가격" },
        { id: 0, content: "중요한 한 가지는 딱히 없다. 골고루" },
      ]
    },
    {
      id: 30,
      flow_num: 7,
      flow_txt: "출생 연도",

      question_txt: "출생 연도를 입력해주세요",
      column: "BIRTH_YEAR",

      answer_type: single_select,
      answer_options: []
    }
  ],

}

module.exports = { survey };
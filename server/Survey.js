const survey = {
  // ----------------------------- 2. 나머지 가슴 수치 측정 ------------------------------- //
  page2: [
    {
      id: 1,
      column: "mUNDER_BUST",
    },
    {
      id: 2,
      column: "mUPPER_BUST",
    },
    {
      id: 3,
      column: "mSHtoBP",
    },
    {
      id: 4,
      column: "mSHOULDER",
    },
  ],

  page3: [
    {
      id: 5,
      column: "BRA_SIZE_UB",
    },
    {
      id: 6,
      column: "BRA_SIZE_CUP",
    },
  ],

  // ----------------------------- 3. 가슴 사진 선택 ------------------------------- //
  // ----------------------------- 4. 사진과 다른 부분 선택 ------------------------------- //
  page4: [
    {
      id: 7,
      column: "NUM_BRATABASE",
    },
    {
      id: 8,
      column: "DIFF_BT_GAP",
    },
    {
      id: 9,
      column: "DIFF_BP_DIR",
    },
    {
      id: 10,
      column: "DIFF_BT_SAG",
    },
    {
      id: 11,
      column: "DIFF_STR",
    },
  ],

  // ---------------------------------- 5. 가슴 유형 -------------------------------------- //
  page5: [
    {
      id: 12,
      column: "TYPE_BT_SIZEDIFF",
    },
  ],

  page6: [
    {
      id: 13,
      column: "TYPE_SHOULDER",
    },
  ],

  page7: [
    {
      id: 14,
      column: "TYPE_RIB",
    },
  ],

  page8: [
    {
      id: 15,
      column: "TYPE_ACCBREAST",
    },
  ],

  //큰 질문은 '''가슴의 끝은 어디 위치하나요? (가이드 사진 제공 - 흐릿한 경우 가슴을 눌러서 확인해주세요)''' 로 되어있음!!! 따로 마크업해야함 - 칼럼이 달라서 나눴음.
  page9: [
    {
      id: 16,
      column: "TYPE_BT_FINISH_R",
    },
    {
      id: 17,
      column: "TYPE_BT_FINISH_L",
    },
  ],

  page10: [
    {
      id: 18,
      column: "TYPE_BT_FLESH",
    },
  ],

  // ---------------------------------- 6. 취향 -------------------------------------- //
  page11: [
    {
      id: 19,
      column: "wPRESSURE",
    },
  ],

  page12: [
    {
      id: 20,
      column: "wTYPE",
    },
  ],

  page13: [
    {
      id: 21,
      column: "wPP",
    },
    {
      id: 22,
      column: "wBR_EFFECT",
    },
    {
      id: 23,
      column: "wBR_EFFECT_MOST",
    },
  ],

  page14: [
    {
      id: 24,
      column: "wMATERIAL", //0
    },
    {
      id: 25,
      column: "wMATERIAL_STR", //1
    },
    {
      id: 26,
      column: "wDESIGN_CONCEPT", //2
    },
    {
      id: 27,
      column: "wCOLOR_TASTE", //3
    },
    {
      id: 28,
      column: ["wPRICE_MIN", "wPRICE_MAX"], //4, 5
    },
  ],

  page15: [
    {
      id: 29,
      column: "wIMPORTANT",
    },
    {
      id: 30,
      column: "BIRTH_YEAR",
    },
  ],
};

module.exports = { survey };

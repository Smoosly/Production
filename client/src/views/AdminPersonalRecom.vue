<template>
  <div class="body">
    <div class="header">
      <h2>
        <span>{{ this.$route.params.id }}</span
        >&nbsp;님의 테스트 답변 및 홈 피팅 브라 정보
      </h2>
      <button @click="this.$router.push('/userlist')" type="button" class="btn-secondary btn-55"><i style="font-size: 17px" class="fas fa-bars"></i>&nbsp;&nbsp;목록 전체 보기</button>
    </div>
    <div class="form">
      <div style="padding: 16px 32px" class="user-info">
        <h2 style="margin-bottom: 32px">기본 정보</h2>
        <!-- 유저 PK_ID : {{this.$route.params.id}} &nbsp; 나이 : {{ adminBreastTest.AGE }} -->
        <div style="display: flex; margin: auto" class="box">
          <div class="image-box" style="margin-right: 32px">
            <img style="width: 216px" :src="brataImg" alt="" />
          </div>
          <table style="background-color: lightgray; border-radius: 8px">
            <tr>
              <th style="padding: 8px 16px; font-weight: bold">사용자 식별번호</th>
              <td style="width: 180px; text-align: center">{{ this.$route.params.id }}</td>
            </tr>
            <tr>
              <th style="padding: 8px 16px; font-weight: bold">나이</th>
              <td style="width: 180px; text-align: center">{{ adminBreastTest.AGE }}</td>
            </tr>
            <tr>
              <th style="padding: 8px 16px; font-weight: bold">출생 연도</th>
              <td style="width: 180px; text-align: center">{{ adminBreastTest.BIRTH_YEAR }}</td>
            </tr>
            <tr>
              <th style="padding: 8px 16px; font-weight: bold">가격 범위</th>
              <td style="width: 180px; text-align: center">{{ adminBreastTest.PRICE_RANGE }}</td>
            </tr>
          </table>
          <table style="margin-left: 16px; background-color: lightgray; border-radius: 8px">
            <tr>
              <th style="padding: 8px 16px; font-weight: bold">밑가슴 둘레</th>
              <td style="width: 180px; text-align: center">{{ adminBreastTest.mUNDER_BUST }}</td>
            </tr>
            <tr>
              <th style="padding: 8px 16px; font-weight: bold">윗가슴 둘레</th>
              <td style="width: 180px; text-align: center">{{ adminBreastTest.mUPPER_BUST }}</td>
            </tr>
            <tr>
              <th style="padding: 8px 16px; font-weight: bold">추천 사이즈</th>
              <td style="width: 180px; text-align: center">{{ adminBreastTest.SIZE }}</td>
            </tr>
            <tr>
              <th style="padding: 8px 16px; font-weight: bold">자주 입는 브라 사이즈</th>
              <td style="width: 180px; text-align: center">{{ adminBreastTest.BRA_SIZE }}</td>
            </tr>
          </table>
        </div>

        <!-- 정보: {{ this.adminBreastTest }} -->
      </div>
      <div style="padding: 16px 32px" class="test-info">
        <h2 style="margin: 32px auto">답변 정보</h2>

        <label style="padding: 8px" for="column1">왼쪽 표면 길이</label>
        <VueGoodTable id="column1" :columns="column1" :rows="adminBreastTest.len_left" :sort-options="false" style="margin-bottom: 44px"> </VueGoodTable>

        <label style="padding: 8px" for="column2">오른쪽 표면 길이</label>
        <VueGoodTable id="column2" :columns="column2" :rows="adminBreastTest.len_right" :sort-options="false" style="margin-bottom: 44px"> </VueGoodTable>

        <label style="padding: 8px" for="column3">사진과의 차이</label>
        <VueGoodTable id="column3" :columns="column3" :rows="adminBreastTest.diff" :sort-options="false" style="margin-bottom: 44px"> </VueGoodTable>

        <label style="padding: 8px" for="column4">기타 가슴 정보</label>
        <VueGoodTable id="column4" :columns="column4" :rows="adminBreastTest.type" :sort-options="false" style="margin-bottom: 44px"> </VueGoodTable>

        <label style="padding: 8px" for="column5">취향 정보</label>
        <VueGoodTable id="column5" :columns="column5" :rows="adminBreastTest.want1" :sort-options="false" style="margin-bottom: 44px">
          <template #table-row="props">
            <span v-if="props.column.field == 'wTYPE'">
              <p style="color: darkorange" v-for="(w, i) in props.row[props.column.field]" :key="i">{{ w }},&nbsp;&nbsp;</p>
            </span>
            <span v-if="props.column.field == 'wBR_EFFECT'">
              <p style="color: darkorange" v-for="(w, i) in props.row[props.column.field]" :key="i">{{ w }},&nbsp;&nbsp;</p>
            </span>
            <span v-if="props.column.field == 'wMATERIAL'">
              <p style="color: darkorange" v-for="(w, i) in props.row[props.column.field]" :key="i">{{ w }},&nbsp;&nbsp;</p>
            </span>
            <span v-if="props.column.field == 'wDESIGN_CONCEPT'">
              <p style="color: darkorange" v-for="(w, i) in props.row[props.column.field]" :key="i">{{ w }},&nbsp;&nbsp;</p>
            </span>
          </template>
        </VueGoodTable>
        <VueGoodTable :columns="column5_1" :rows="adminBreastTest.want2" :sort-options="false" style="margin-bottom: 44px">
          <template #table-row="props">
            <span v-if="props.column.field == 'wTYPE'">
              <p style="color: darkorange" v-for="(w, i) in props.row[props.column.field]" :key="i">{{ w }},&nbsp;&nbsp;</p>
            </span>
            <span v-if="props.column.field == 'wBR_EFFECT'">
              <p style="color: darkorange" v-for="(w, i) in props.row[props.column.field]" :key="i">{{ w }},&nbsp;&nbsp;</p>
            </span>
            <span v-if="props.column.field == 'wMATERIAL'">
              <p style="color: darkorange" v-for="(w, i) in props.row[props.column.field]" :key="i">{{ w }},&nbsp;&nbsp;</p>
            </span>
            <span v-if="props.column.field == 'wDESIGN_CONCEPT'">
              <p style="color: darkorange" v-for="(w, i) in props.row[props.column.field]" :key="i">{{ w }},&nbsp;&nbsp;</p>
            </span>
          </template>
        </VueGoodTable>
      </div>
    </div>
    <div class="form">
      <div class="user-info">
        <h2 style="margin: 32px auto">홈 피팅 브라</h2>
        <!-- 정보: {{ this.adminBraRecom }}   -->
        <!-- <label style="padding: 8px;" for="column5"></label> -->
        <VueGoodTable :columns="columnRecom" :rows="adminBraRecom.bras" :sort-options="false" style="margin-bottom: 44px" :line-numbers="true">
          <template #table-row="props">
            <span v-if="props.column.field == 'LINK' && props.row.COLOR">
              <!-- 색상 DB 에 저장되면 불러오서 이름으로 사용하기  -->
              <a style="color: blue" :href="link" target="_blank" v-for="(link, i) in props.row[props.column.field]" :key="i"
                >{{ props.row.LINK.length === props.row.COLOR.length ? adminBraRecom.bras[props.row.originalIndex].COLOR[i] : adminBraRecom.bras[props.row.originalIndex].COLOR.join() }} 링크<br /><br
              /></a>
            </span>
            <span v-else-if="props.column.field == 'TAGS'">
              <p style="color: darkorange" v-for="(w, i) in props.row[props.column.field]" :key="i">{{ w }},&nbsp;&nbsp;</p>
            </span>
            <span v-else-if="props.column.field == 'SIZE'">
              <!-- v-model to 해당 브라 사이즈 -->
              <textarea v-model="adminBraRecom.bras[props.row.originalIndex].SIZE" type="text" />
            </span>
            <span v-else-if="props.column.field == 'SELECTED_COLOR'">
              <!-- v-model to 해당 브라 색상 -->
              <!-- <input v-model="props.row[props.column.field]" type="text" /> -->
              <textarea v-model="adminBraRecom.bras[props.row.originalIndex].SELECTED_COLOR" type="text" />
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </VueGoodTable>

        <!-- adminBraRecom에 추가로 넣어야할 정보들 추가하기  -->
        <VueGoodTable :columns="columnComp" :rows="adminBraRecom.decision" :sort-options="false" style="margin-bottom: 44px">
          <template #table-row="props">
            <span v-if="props.column.field == 'COMPLETE'">
              <p v-if="props.row.COMPLETE == 1" style="color: green">완료&nbsp;<i class="far fa-check-circle"></i></p>
              <!-- <p v-else-if="props.row.COMPLETE == 1" style="color: red">완료(미확정)</p> -->
              <p v-else style="color: red">미완료</p>
            </span>
            <span v-else-if="props.column.field == 'NUM'">
              <!-- v-model to 해당 브라 색상 -->
              <textarea v-model="adminBraRecom.decision[0].NUM" type="text" />
            </span>
            <span v-else-if="props.column.field == 'DECISION'">
              <!-- v-model to 해당 브라 사이즈 -->
              <textarea v-model="adminBraRecom.decision[0].DECISION" type="text" />
            </span>
            <!-- <span v-else-if="props.column.field == 'GROUP_NUM'">
              <input v-model="adminBraRecom.decision[0].GROUP_NUM" type="text" />
            </span> -->
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </VueGoodTable>
        <!--  -->

        <div class="button-box" style="display: flex; justify-content: flex-end">
          <button @click="saveTemp" type="button" style="margin-right: 16px; padding: 24px" class="btn-outlined btn-55">임시 저장</button>
          <!-- 추천완료 버튼 누르면 COMPLETE 을 1로 -->
          <button @click="saveComplete" type="button" style="padding: 24px; margin-right: 16px" class="btn-primary btn-55">추천 완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css';
import { VueGoodTable } from 'vue-good-table-next';
import axios from 'axios';
import typeImages from '../../BreastTypeImage';
import { deleteCookie } from '@/utils/cookies';

// import { checkAuth } from '@/utils/loginAuth';

export default {
  data() {
    return {
      brataImg: '',
      // columns - Test Result
      column1: [
        { label: '안쪽', field: 'mINNER_LEN_L', type: 'number' },
        { label: '바깥쪽', field: 'mOUTER_LEN_L', type: 'number' },
        { label: '아래쪽', field: 'mLOWER_LEN_L', type: 'number' },
        { label: '폭', field: 'mWIDTH_LC_L', type: 'number' },
        { label: '부피', field: 'mVOLUME_L', type: 'number' },
        { label: '높이', field: 'mHEIGHT_LC_L', type: 'number' },
      ],
      column2: [
        { label: '안쪽', field: 'mINNER_LEN_R', type: 'number' },
        { label: '바깥쪽', field: 'mOUTER_LEN_R', type: 'number' },
        { label: '아래쪽', field: 'mLOWER_LEN_R', type: 'number' },
        { label: '폭', field: 'mWIDTH_LC_R', type: 'number' },
        { label: '부피', field: 'mVOLUME_R', type: 'number' },
        { label: '높이', field: 'mHEIGHT_LC_R', type: 'number' },
      ],
      column3: [
        { label: '가슴 사이 거리', field: 'DIFF_BT_GAP', width: '280px' },
        { label: '유두 벌어짐', field: 'DIFF_BP_DIR', width: '280px' },
        { label: '처짐 정도', field: 'DIFF_BT_SAG' },
        { label: '기타', field: 'DIFF_STR' },
      ],
      column4: [
        { label: '양쪽 가슴 사이즈 차이', field: 'TYPE_BT_SIZEDIFF', width: '280px' },
        // { label: '어깨', field: 'TYPE_SHOULDER' },
        { label: '흉곽', field: 'TYPE_RIB' },
        { label: '부유방', field: 'TYPE_ACCBREAST' },
        // { label: '왼쪽 가슴의 끝', field: 'TYPE_FINISH_BT_L' },
        // { label: '오른쪽 가슴의 끝', field: 'TYPE_FINISH_BT_R' },
        // { label: '가슴의 살결', field: 'TYPE_BT_FLESH' },
      ],
      column5: [
        { label: '압박감', field: 'wPRESSURE', type: 'number' },
        { label: '종류', field: 'wTYPE' },
        { label: '뽕브라', field: 'wPP' },
        { label: '원하는 기능', field: 'wBR_EFFECT' },
        { label: '가장 원하는 기능', field: 'wBR_EFFECT_MOST' },
      ],
      column5_1: [
        { label: '원하는 소재', field: 'wMATERIAL' },
        { label: '원하는 소재 기타', field: 'wMATERIAL_STR' },
        { label: '선호 디자인', field: 'wDESIGN_CONCEPT' },
        { label: '색상', field: 'wCOLOR_TASTE' },
        { label: '가장 중요 항목', field: 'wIMPORTANT' },
      ],

      adminBreastTest: {
        AGE: '', //나이(현재 연도에서 출생 연도를 뺀 값)
        BIRTH_YEAR: 0, //출생 연도
        PRICE_RANGE: '', //가격 범위

        mUNDER_BUST: 0, //밑가슴둘레
        mUPPER_BUST: 0, //윗가슴둘레
        SIZE: '',
        BRA_SIZE: '', //자주 입는 브라 사이즈

        len_left: [
          {
            mINNER_LEN_L: 0, // 왼쪽 안쪽 표면길이
            mOUTER_LEN_L: 0, // 왼쪽 바깥쪽 표면길이
            mLOWER_LEN_L: 0, // 왼쪽 아래쪽 표면길이
            mWIDTH_LC_L: 0, // 오른쪽 안쪽 표면길이
            mVOLUME_L: 0, // 오른쪽 바깥쪽 표면길이
            mHEIGHT_LC_L: 0, // 오른쪽 아래쪽 표면길이
          },
        ],

        len_right: [
          {
            mINNER_LEN_R: 0,
            mOUTER_LEN_R: 0,
            mLOWER_LEN_R: 0,
            mWIDTH_LC_R: 0,
            mVOLUME_R: 0,
            mHEIGHT_LC_R: 0,
          }
        ],

        NUM_BRATABASE: 1,

        diff: [
          {
            DIFF_BT_GAP: '', //가슴 사이 거리
            DIFF_BP_DIR: '', //유두 벌어짐
            DIFF_BT_SAG: '', //처짐 정도
            DIFF_STR: '', //기타
          },
        ],

        type: [
          {
            TYPE_BT_SIZEDIFF: '', //양쪽 가슴 사이즈 차이
            // TYPE_SHOULDER: '', //어깨
            TYPE_RIB: '', //흉곽
            TYPE_ACCBREAST: '', //부유방
            // TYPE_FINISH_BT_L: '', //왼쪽 가슴의 끝
            // TYPE_FINISH_BT_R: '', //오른쪽 가슴의 끝
            // TYPE_BT_FLESH: '', //가슴의 살결
          },
        ],

        want1: [
          {
            wPRESSURE: 0, //압박감 취향
            wTYPE: [], //종류
            wPP: '', //뽕브라 선호
            wBR_EFFECT: [], //브라 원하는 기능
            wBR_EFFECT_MOST: '', //브라 가장 원하는 기능
          },
        ],

        want2: [
          {
            wMATERIAL: [], //원하는 소재
            wMATERIAL_STR: '', //원하는 소재 기타
            wDESIGN_CONCEPT: [], //선호하는 디자인
            wCOLOR_TASTE: '', //색상 취향
            wIMPORTANT: '', //브라에서 가장 중요한 항목
          },
        ],
      },

      // column for homefitting table
      columnRecom: [
        { label: '브라 명', field: 'BRA_NAME', width: '140px' },
        { label: 'PK_ITEM', field: 'PK_ITEM' },
        { label: 'OLD_KEY', field: 'OLD_KEY' },
        { label: '태그', field: 'TAGS', width: '120px' },
        { label: '링크 목록', field: 'LINK', width: '200px' }, // 링크들 각각 클릭 가능하게 (버튼 명은 색깔로)
        { label: '사이즈 후보', field: 'SIZE', width: '120px' },
        { label: '선택 색상', field: 'SELECTED_COLOR' },
        { label: '가슴 적합도 점수', field: 'BREAST_SCORE', type: 'number' },
        { label: '기능 적합도 점수', field: 'EFFECT_SCORE', type: 'number' },
      ],

      columnComp: [
        { label: '기본 사이즈', field: 'SIZE' },
        // { label: "홈 피팅 신청", field: "H_FITTING_APPLY", type: "boolean" },
        // { label: "홈 피팅 그룹", field: "GROUP_NUM", type: "number", width: "30px" },
        { label: '추천된 브라 개수', field: 'NUM', type: 'number' },
        { label: '보내줄 브라 번호', field: 'DECISION' },
        { label: '추천 완료 여부', field: 'COMPLETE', type: 'number' },
      ],

      adminBraRecom: {
        decision: [
          {
            // H_FITTING_APPLY: 0,
            // GROUP_NUM: null, //edit
            NUM: 0, //edit
            DECISION: null, //edit
            COMPLETE: 0, //edit
          },
        ],

        bras: [
          {
            BRA_NAME: '',
            PK_ITEM: '',
            OLD_KEY: '',
            TAGS: [],
            LINK: [],
            SIZE: '', //edit
            COLOR: [], //editX
            SELECTED_COLOR: '', //edit
            BREAST_SCORE: 0,
            EFFECT_SCORE: 0,
          },
          {
            BRA_NAME: '',
            PK_ITEM: '',
            OLD_KEY: '',
            TAGS: [],
            LINK: [],
            SIZE: '', //edit
            COLOR: [], //editX
            SELECTED_COLOR: '', //edit
            BREAST_SCORE: 0,
            EFFECT_SCORE: 0,
          },
          {
            BRA_NAME: '',
            PK_ITEM: '',
            OLD_KEY: '',
            TAGS: [],
            LINK: [],
            SIZE: '',
            COLOR: [], //editX
            SELECTED_COLOR: '', //edit
            BREAST_SCORE: 0,
            EFFECT_SCORE: 0,
          },
          {
            BRA_NAME: '',
            PK_ITEM: '',
            OLD_KEY: '',
            TAGS: [],
            LINK: [],
            SIZE: '', //edit
            COLOR: [], //editX
            SELECTED_COLOR: '', //edit
            BREAST_SCORE: 0,
            EFFECT_SCORE: 0,
          },
          {
            BRA_NAME: '',
            PK_ITEM: '',
            OLD_KEY: '',
            TAGS: [],
            LINK: [],
            SIZE: '', //edit
            COLOR: [], //editX
            SELECTED_COLOR: '', //edit
            BREAST_SCORE: 0,
            EFFECT_SCORE: 0,
          },
          {
            BRA_NAME: '',
            PK_ITEM: '',
            OLD_KEY: '',
            TAGS: [],
            LINK: [],
            SIZE: '', //edit
            COLOR: [], //editX
            SELECTED_COLOR: '', //edit
            BREAST_SCORE: 0,
            EFFECT_SCORE: 0,
          },
          {
            BRA_NAME: '',
            PK_ITEM: '',
            OLD_KEY: '',
            TAGS: [],
            LINK: [],
            SIZE: '', //edit
            COLOR: [], //editX
            SELECTED_COLOR: '', //edit
            BREAST_SCORE: 0,
            EFFECT_SCORE: 0,
          },
        ],
      },
    };
  },
  components: {
    VueGoodTable,
  },
  methods: {
    fetchRecomData() {
      // PK_ID 로 유저 정보 불러오기  this.$route.params.id
      axios
        .get(`/admin/getData/${this.$route.params.id}`)
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            let imageArr = typeImages.map((type) => {
              return type.subImages;
            });
            let images = [
              ...imageArr[0],
              ...imageArr[1],
              ...imageArr[2],
              ...imageArr[3],
              ...imageArr[4],
              ...imageArr[5],
              ...imageArr[6],
              ...imageArr[7],
              ...imageArr[8],
              ...imageArr[9],
              ...imageArr[10],
              ...imageArr[11],
              ...imageArr[12],
              ...imageArr[13],
              ...imageArr[14],
              ...imageArr[15],
              ...imageArr[16],
              ...imageArr[17],
              ...imageArr[18],
              ...imageArr[19],
              ...imageArr[20],
              ...imageArr[21],
              ...imageArr[22],
              ...imageArr[23],
            ];
            this.adminBreastTest = result.data.adminBreastTest;
            this.adminBraRecom = result.data.adminBraRecom;
            this.brataImg = images[this.adminBreastTest.NUM_BRATABASE - 1].path;
            return;
          } else {
            if (Object.keys(result.data).includes('isAuth') && result.data.isAuth === false) {
              // this.$store.commit('clearCode');
              this.$store.commit('clearToken');
              deleteCookie('auth');
              // deleteCookie('user');
              console.log('여기 로직 리팩토링');
              this.$router.push('/');
              this.emitter.emit('loginModal', true);
              this.emitter.emit('showRedToast', '로그인 후 이용해주세요.');
              return;
            }
            console.log(result.data.message);
            return this.emitter.emit('showRedToast', result.data.message);
            // checkAuth(result.data);
          }
        })
        .catch(console.log);
    },
    saveTemp() {
      console.log('saveTemp');
      const data = {
        COMPLETE: 0,
        // GROUP_NUM: this.adminBraRecom.decision[0].GROUP_NUM,
        NUM: this.adminBraRecom.decision[0].NUM,
        DECISION: this.adminBraRecom.decision[0].DECISION,
        SIZE_1: this.adminBraRecom.bras[0].SIZE,
        SIZE_2: this.adminBraRecom.bras[1].SIZE,
        SIZE_3: this.adminBraRecom.bras[2].SIZE,
        SIZE_4: this.adminBraRecom.bras[3].SIZE,
        SIZE_5: this.adminBraRecom.bras[4].SIZE,
        SIZE_6: this.adminBraRecom.bras[5].SIZE,
        SIZE_7: this.adminBraRecom.bras[6].SIZE,
        SIZE_8: this.adminBraRecom.bras[7].SIZE,
        SIZE_9: this.adminBraRecom.bras[8].SIZE,
        SIZE_10: this.adminBraRecom.bras[9].SIZE,
        SELECTED_COLOR_1: this.adminBraRecom.bras[0].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[0].SELECTED_COLOR,
        SELECTED_COLOR_2: this.adminBraRecom.bras[1].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[1].SELECTED_COLOR,
        SELECTED_COLOR_3: this.adminBraRecom.bras[2].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[2].SELECTED_COLOR,
        SELECTED_COLOR_4: this.adminBraRecom.bras[3].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[3].SELECTED_COLOR,
        SELECTED_COLOR_5: this.adminBraRecom.bras[4].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[4].SELECTED_COLOR,
        SELECTED_COLOR_6: this.adminBraRecom.bras[5].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[5].SELECTED_COLOR,
        SELECTED_COLOR_7: this.adminBraRecom.bras[6].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[6].SELECTED_COLOR,
        SELECTED_COLOR_8: this.adminBraRecom.bras[7].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[7].SELECTED_COLOR,
        SELECTED_COLOR_9: this.adminBraRecom.bras[8].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[8].SELECTED_COLOR,
        SELECTED_COLOR_10: this.adminBraRecom.bras[9].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[9].SELECTED_COLOR,
      };
      console.log(data);
      axios
        .post(`/admin/saveTemp/${this.$route.params.id}`, data)
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.fetchRecomData();
            return this.emitter.emit('showToast', result.data.message);
          } else {
            console.log(result.data.message);
            return this.emitter.emit('showRedToast', result.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          return this.emitter.emit('showRedToast', '임시 저장 실패');
        });
    },
    saveComplete() {
      const data = {
        COMPLETE: 1,
        // GROUP_NUM: this.adminBraRecom.decision[0].GROUP_NUM,
        NUM: this.adminBraRecom.decision[0].NUM,
        DECISION: this.adminBraRecom.decision[0].DECISION,
        SIZE_1: this.adminBraRecom.bras[0].SIZE,
        SIZE_2: this.adminBraRecom.bras[1].SIZE,
        SIZE_3: this.adminBraRecom.bras[2].SIZE,
        SIZE_4: this.adminBraRecom.bras[3].SIZE,
        SIZE_5: this.adminBraRecom.bras[4].SIZE,
        SIZE_6: this.adminBraRecom.bras[5].SIZE,
        SIZE_7: this.adminBraRecom.bras[6].SIZE,
        SIZE_8: this.adminBraRecom.bras[7].SIZE,
        SIZE_9: this.adminBraRecom.bras[8].SIZE,
        SIZE_10: this.adminBraRecom.bras[9].SIZE,
        SELECTED_COLOR_1: this.adminBraRecom.bras[0].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[0].SELECTED_COLOR,
        SELECTED_COLOR_2: this.adminBraRecom.bras[1].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[1].SELECTED_COLOR,
        SELECTED_COLOR_3: this.adminBraRecom.bras[2].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[2].SELECTED_COLOR,
        SELECTED_COLOR_4: this.adminBraRecom.bras[3].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[3].SELECTED_COLOR,
        SELECTED_COLOR_5: this.adminBraRecom.bras[4].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[4].SELECTED_COLOR,
        SELECTED_COLOR_6: this.adminBraRecom.bras[5].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[5].SELECTED_COLOR,
        SELECTED_COLOR_7: this.adminBraRecom.bras[6].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[6].SELECTED_COLOR,
        SELECTED_COLOR_8: this.adminBraRecom.bras[7].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[7].SELECTED_COLOR,
        SELECTED_COLOR_9: this.adminBraRecom.bras[8].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[8].SELECTED_COLOR,
        SELECTED_COLOR_10: this.adminBraRecom.bras[9].SELECTED_COLOR === '' ? null : this.adminBraRecom.bras[9].SELECTED_COLOR,
      };
      console.log(data);
      axios
        .post(`/admin/saveComplete/${this.$route.params.id}`, data)
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.fetchRecomData();
            return this.emitter.emit('showToast', result.data.message);
          }
          console.log(result.data.message);
          return this.emitter.emit('showRedToast', result.data.message);
        })
        .catch((err) => {
          console.log(err);
          return this.emitter.emit('showRedToast', '추천 브라 확정 실패');
        });
    },
  },
  mounted() {},
  created() {
    this.fetchRecomData();
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button) {
  font-family: $font-main, sans-serif !important;
}
.body {
  /* height: 570vh; */
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 80px;

  @media screen and (max-width: $md-breakpoint) {
    padding: 40px 8px;
    /* height: 4500px; */
    height: auto;
  }

  .header {
    @include text-style(18, $primary);
    display: flex;
    padding-top: 64px;
    justify-content: center;

    span {
      font-weight: bold;
    }

    button {
      /* padding: 24px; */
      position: absolute;
      right: 10%;
    }
  }

  .form {
    padding: 24px;
    display: flex;
    justify-content: center;
    box-shadow: 1px 4px 4px 1px $border;
    flex-direction: column;
    background-color: $white;
    width: 100%;
    /* height: 900px; */
    margin-top: 64px;
    @media screen and (max-width: $md-breakpoint - 1px) {
      padding: 16px;
    }

    @media screen and (max-width: 280px) {
      padding: 0px;
    }

    h2 {
      @include text-style(24, $primary);
      font-weight: bold;
      padding-left: 16px;
    }

    .done {
      color: red;
    }
  }
}
</style>

<template>
  <div class="body">
    <div class="button-box">
      <button type="button" @click="step = 1" class="btn-secondary btn-48">홈 피팅 관리</button>
      <button type="button" @click="step = 2" class="btn-secondary btn-48">키트 배송 관리</button>
      <button type="button" @click="step = 3" class="btn-secondary btn-48">브라 재고 관리</button>
    </div>
    <div class="title">
      <h2 v-if="step == 1">홈 피팅 관리 테이블</h2>
      <h2 v-if="step == 2">키트 배송 관리 테이블</h2>
      <h2 v-if="step == 3">브라 재고 관리 테이블</h2>
    </div>
    <div class="form">
      <!-- 홈 피팅 관리 테이블 -->
      <VueGoodTable
        v-if="step == 1"
        :columns="columns"
        :rows="adminInfo.list"
        v-on:selected-rows-change="selectionChanged"
        :select-options="{
          enabled: true,
          selectionText: '개 선택됨',
          clearSelectionText: '선택 해제',
        }"
        :search-options="{
          enabled: true,
        }"
        :sort-options="{
          enabled: true,
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [3, 7, 9],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: '다음',
          prevLabel: '이전',
          pageLabel: '페이지',
          allLabel: '전체',
        }"
        :line-numbers="true"
        :row-style-class="rowStyleClassFn"
      >
        <template #selected-row-actions>
          <button type="button" @click="totalComplete" class="btn-outlined btn-32" style="height: 24px; margin-bottom: 4px">재고관리</button>
        </template>
        <template #table-row="props">
          <span v-if="props.column.field == 'COMPLETE'">
            <p v-if="props.row.COMPLETE === 1" style="color: green">완료&nbsp;<i class="far fa-check-circle"></i></p>
            <!-- <p v-else-if="props.row.COMPLETE === 1" style="color: blue">완료</p> -->
            <p v-else style="color: red">미완료</p>
          </span>
          <!-- <span v-else-if="props.column.field == 'H_FITTING_APPLY'">
            <p style="color: green" v-if="props.row.H_FITTING_APPLY">신청</p>
            <p v-else>미신청</p>
          </span> -->
          <span v-else-if="props.column.field == 'btn'">
            <button type="button" @click="this.$router.push(`/personalrecom/${props.row.PK_ID}`)" class="btn-primary btn-32">보기</button>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </VueGoodTable>
      <!-- 배송 관리 테이블 -->
      <VueGoodTable
        v-if="step == 2"
        :columns="columns2"
        :rows="kitDeliverInfo"
        v-on:selected-rows-change="selection2Changed"
        :select-options="{
          enabled: true,
          selectionText: '개 선택됨',
          clearSelectionText: '선택 해제',
        }"
        :search-options="{
          enabled: true,
        }"
        :sort-options="{
          enabled: true,
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [3, 7, 9],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: '다음',
          prevLabel: '이전',
          pageLabel: '페이지',
          allLabel: '전체',
        }"
        :line-numbers="true"
        :row-style-class="rowStyleClassFn"
      >
        <template #selected-row-actions>
          <button type="button" @click="changeState(0)" class="btn-secondary btn-32" style="height: 24px; margin-bottom: 4px; margin-right: 4px">
            신청취소
          </button>
          <button type="button" @click="changeState(1)" class="btn-outlined btn-32" style="height: 24px; margin-bottom: 4px; margin-right: 4px">
            배송준비중
          </button>
          <button type="button" @click="changeState(2)" class="btn-outlined btn-32" style="height: 24px; margin-bottom: 4px; margin-right: 4px">배송중</button>
          <button type="button" @click="changeState(3)" class="btn-primary btn-32" style="height: 24px; margin-bottom: 4px; margin-right: 4px">배송완료</button>
        </template>
        <template #table-row="props">
          <span v-if="props.column.field == 'state'">
            <p style="color: gray" v-if="props.row.state == 0">신청 취소</p>
            <p style="color: orange" v-if="props.row.state == 1">신청완료/배송준비중</p>
            <p style="color: red" v-if="props.row.state == 2">배송중</p>
            <p style="color: green" v-if="props.row.state == 3">배송 완료</p>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </VueGoodTable>
      <!-- 재고 관리 테이블 -->
      <VueGoodTable
        v-if="step == 3"
        :columns="columns3"
        :rows="braStockInfo"
        :search-options="{
          enabled: true,
        }"
        :sort-options="{
          enabled: true,
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 30,
          position: 'top',
          perPageDropdown: [10, 20, 50],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: '다음',
          prevLabel: '이전',
          pageLabel: '페이지',
          allLabel: '전체',
        }"
        :row-style-class="rowStyleClassFn"
      >
        <template #table-row="props">
          <span v-if="props.column.field == 'PK_ID'">
            <textarea style="width: 100px" v-model="braStockInfo[props.row.originalIndex].PK_ID" type="text" />
          </span>
          <span v-else-if="props.column.field == 'SEND_REAL'">
            <textarea style="width: 60px" v-model="braStockInfo[props.row.originalIndex].SEND_REAL" type="text" />
          </span>
          <span v-else-if="props.column.field == 'PROBLEM'">
            <!-- <input id="s1d" type="checkbox" class="switch" :v-model="transVal(braStockInfo[props.row.originalIndex].PROBLEM)" /> -->
            <div class="select-group is-active">
              <select v-model="braStockInfo[props.row.originalIndex].PROBLEM" class="form-select">
                <option class="not-okay" :value="1">O</option>
                <option class="okay" :value="0">X</option>
              </select>
              <i class="fas fa-caret-down" aria-hidden></i>
            </div>
          </span>
          <span v-else-if="props.column.field == 'NEED_WASH'">
            <!-- <input id="s1d" type="checkbox" class="switch" :v-model="transVal(braStockInfo[props.row.originalIndex].NEED_WASH)"/> -->
            <div class="select-group is-active">
              <select v-model="braStockInfo[props.row.originalIndex].NEED_WASH" class="form-select">
                <option class="not-okay" :value="1">O</option>
                <option class="okay" :value="0">X</option>
              </select>
              <i class="fas fa-caret-down" aria-hidden></i>
            </div>
          </span>
          <span v-else-if="props.column.field == 'NUM_WASH'">
            <textarea style="width: 60px" v-model="braStockInfo[props.row.originalIndex].NUM_WASH" type="text" />
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </VueGoodTable>
      <div v-if="step == 3" class="button-box" style="display: flex; justify-content: flex-end">
        <button type="button" style="margin-right: 16px; padding: 24px" class="btn-primary btn-55">저장하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-good-table-next/dist/vue-good-table-next.css";
import { VueGoodTable } from "vue-good-table-next";
import axios from "axios";
import { deleteCookie } from "@/utils/cookies";
// import { checkAuth } from '@/utils/loginAuth';

export default {
  data() {
    return {
      step: 1,
      rowSelection: [], // 체크박스로 선택한 PK_ID를 나열한 배열
      columns: [
        { label: "사용자 식별번호(PK_ID)", field: "PK_ID" },
        { label: "기본 사이즈", field: "SIZE" },
        { label: "추천된 브라 개수", field: "NUM", type: "number" },
        { label: "보내줄 브라 번호", field: "DECISION" },
        // { label: "홈 피팅 신청", field: "H_FITTING_APPLY", type: "boolean", sortable: true },
        // { label: "홈 피팅 그룹", field: "GROUP_NUM", type: "number", sortable: true },
        { label: "추천 완료 여부", field: "COMPLETE", type: "boolean", sortable: true },
        { label: "보기", field: "btn", html: true, width: "80px" },
      ],
      adminInfo: {
        list: [
          // {
          //   PK_ID: "j535s8whq5",
          //   TYPE: "3RD_MVP_1", // 3RD_MVP에서 몇차 이용자인지 여부
          //   COMPLETE: false, // 추천완료면 true, 미완료면 false
          //   H_FITTING_APPLY: false, // 홈 피팅 서비스 신청 여부
          //   NUM: 3, //추천된 브라 개수
          //   DECISION: "1,4,5,6", // 홈 피팅 서비스로 보내줄 브라 번호
          //   SIZE: "75C", //기본사이즈
          //   btn: '<button type="button" class="btn-primary btn-32">보기</button>',
          // },
        ],
      },

      // 배송정보
      rowSelection2: [],
      columns2: [
        { label: "사용자 아이디", field: "PK_ID" },
        { label: "받는사람이름", field: "recipient" },
        { label: "전화번호", field: "phone" },
        { label: "우편번호", field: "postcode" },
        { label: "배송지", field: "address" },
        { label: "상세주소", field: "extraAddress" },
        { label: "배송상태", field: "state", type: "number", sortable: true, width: "180px" },
      ],
      kitDeliverInfo: [],

      // 브라재고
      columns3: [
        { label: "No", field: "ID", type: "number" },
        { label: "품번1(PK_ITEM)", field: "PK_ITEM", width: "90px" },
        { label: "품번2(OLD_KEY)", field: "OLD_KEY" },
        { label: "품번3(PK_SIZE)", field: "PK_SIZE", width: "80px" },
        { label: "사용자ID", field: "PK_ID" },
        { label: "구매색상", field: "COLOR", width: "100px" },
        { label: "소비자에게 보낸 횟수", field: "SEND_REAL", type: "number" },
        { label: "하자여부", field: "PROBLEM", type: "boolean", width: "100px", sortable: true },
        { label: "빨래필요", field: "NEED_WASH", type: "boolean", width: "100px", sortable: true },
        { label: "빨래횟수", field: "NUM_WASH", type: "number" },
        { label: "생성일시", field: "createdAt" },
        { label: "수정일시", field: "updatedAt" },
      ],
      braStockInfo: [],
    };
  },
    watch: {
    step(newVal) {
      console.log(newVal);
      if (newVal === 1) {
        this.fetchResultData();
      }
      if (newVal === 2) {
        this.fetchKitData();
      }
      if (newVal === 3) {
        this.fetchStockData();
      }
    },
  },
  components: {
    VueGoodTable,
  },
  methods: {
    transVal(val) {
      if (val === 1) return true;
      else if (val === 0) return false;
    },
    selectionChanged(params) {
      this.rowSelection = [];
      for (let row of params.selectedRows) {
        this.rowSelection.push(row.PK_ID);
      }
      console.log(this.rowSelection);
    },
    selection2Changed(params) {
      this.rowSelection2 = [];
      for (let row of params.selectedRows) {
        this.rowSelection2.push(row.PK_ID);
      }
      console.log(this.rowSelection2);
    },
    // 선택한 줄만 최종 완료 처리하는 요청 함수
    totalComplete() {
      console.log("checkAtOnce");
      axios
        .post("/admin/braStockManage", { PK_IDs: this.rowSelection })
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.fetchResultData();
            return this.emitter.emit("showToast", result.data.message);
          } else {
            return this.emitter.emit("showRedToast", result.data.message);
          }
        })
        .catch(console.log);
    },

    changeState(state) {
      // state 마다 다르게 처리하면 됨 => 해당 state 상태로 모두 일괄 변경
      console.log(state);
      axios
        .put(`/admin/changeKitState/${state}`, { PK_IDs: this.rowSelection2 })
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.fetchKitData();
          }
        })
        .catch(console.log);
    },
    rowStyleClassFn(row) {
      return row.COMPLETE ? "done" : "not-done";
    },
    // 정보 띄울 때 관리자인지 정보 확인 후 렌더링으로 넘어가고 아니면 NotFoundPage로 이동시키기
    fetchResultData() {
      axios
        .get("/admin/getUserList")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            // 로직 분기점 - 관리자 인증 후 yes -> 렌더링
            this.adminInfo.list = result.data.list;
            return;
          } else {
            if (Object.keys(result.data).includes("isAuth") && result.data.isAuth === false) {
              this.$store.commit("clearCode");
              this.$store.commit("clearToken");
              deleteCookie("auth");
              deleteCookie("user");
              console.log("여기 로직 리팩토링");
              this.$router.push("/");
              this.emitter.emit("loginModal", true);
              this.emitter.emit("showRedToast", "로그인 후 이용해주세요.");
              return;
            }
            console.log(result.data.message);
          }
          // checkAuth(result.data)
        })
        .catch(console.log);
    },
    fetchKitData() {
      axios
        .get("/admin/getKitInfo")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.kitDeliverInfo = result.data.kitInfo;
            return;
          }
          console.log(result.data.message);
        })
        .catch(console.log);
    },
    fetchStockData() {
      // PK_ID 로 유저 정보 불러오기  this.$route.params.id
      axios
        .get("/admin/getBraStockData")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            console.log(result.data.stock);
            this.braStockInfo = result.data.stock;
          } else {
            if (Object.keys(result.data).includes("isAuth") && result.data.isAuth === false) {
              this.$store.commit("clearCode");
              this.$store.commit("clearToken");
              deleteCookie("auth");
              deleteCookie("user");
              console.log("여기 로직 리팩토링");
              this.$router.push("/");
              this.emitter.emit("loginModal", true);
              this.emitter.emit("showRedToast", "로그인 후 이용해주세요.");
              return;
            }
            // checkAuth(result.data)
            if (Object.keys(result.data).includes("isAdmin") && result.data.isAdmin === false) {
              console.log("here");
              return this.$router.push("/unauthorized");
            }
            console.log(result.data.message);
          }
        })
        .catch(console.log);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  created() {
    this.fetchResultData();
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
  padding: 60px 120px;

  @media screen and (max-width: $md-breakpoint) {
    padding: 40px 8px;
    /* height: 4500px; */
    height: auto;
  }

  .button-box {
    padding-top: 44px;
    display: flex;
    justify-content: center;
    button {
      margin: 8px;
      padding: 8px 32px;
    }
  }

  .title {
    h2 {
      @include text-style(24, $primary);
      font-weight: bold;
      margin-top: 24px;
      text-align: center;
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
    margin-top: 32px;
    @media screen and (max-width: $md-breakpoint - 1px) {
      padding: 16px;
    }

    @media screen and (max-width: 280px) {
      padding: 0px;
    }

    .done {
      color: red;
    }

    .form-select {
      .okay {
        color: green;
      }

      .not-okay {
        color: red;
      }
    }
  }
}
</style>

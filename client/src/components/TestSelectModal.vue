<template>
  <transition name="modal" appear>
    <section class="modal">
      <div data-aos="zoom-out-up" data-aos-anchor-placement="top-bottom" data-aos-duration="250" class="modal__window">
        <div class="test-type">
          <h2>가슴 테스트</h2>
          <p>
            진단 키트와 테스트로 가슴 유형 진단
            <br />
            소요시간 | 약 10분 &nbsp;<span>총 문항</span> | 21개
          </p>
          <button @click="testType" type="button" class="btn-outlined btn-55">시작하기</button>
        </div>
        <div class="partition"></div>
        <div class="test-lifebra">
          <h2>인생 브라 등록하기</h2>
          <p>
            당신의 인생브라를 알려주세요!
            <br />
            소요시간 | 약 3분 &nbsp;<span> 총 문항</span> | 5개
          </p>
          <button disabled type="button" class="btn-outlined btn-55">서비스 준비 중</button>
        </div>
      </div>
      <div class="modal__overlay" @click.self="this.emitter.emit('testModal', false)"></div>
    </section>
  </transition>
</template>

<script>
import { deleteCookie, getAuthFromCookie } from "@/utils/cookies";
// import { checkAuth } from '@/utils/loginAuth';
import axios from "axios";

export default {
  name: "TestSelectModal",
  data() {
    return {
      // PK_ID: getUserFromCookie() || "",
    };
  },
  methods: {
    async testType() {
      if (getAuthFromCookie() === "") {
        this.emitter.emit("testModal", false);
        this.emitter.emit("loginModal", true);
        this.emitter.emit("showRedToast", "로그인 후 이용해주세요.");
        return;
      }
      axios.get("/users/getState")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.emitter.emit("testModal", false);
            if (result.data.state === 0) {
              // 키트배송신청
              this.emitter.emit("showRedToast", "키트 신청 내역이 없습니다.");
              this.$router.push("/kitorder");
            } else if (result.data.state === 1) {
              // 키트업로드페이지
              this.$router.push("/Test");
            } else if (result.data.state === 2) {
              // 설문페이지 - 마지막 응답 페이지: result.data.page
              this.$router.push(`/survey/${result.data.page}`);
            } else if (result.data.state === 3) {
              // 가슴결과페이지
              this.emitter.emit("showToast", "이미 완료된 설문이 있어 결과페이지로 이동합니다.");
              this.$router.push("/survey/result");
            } else if (result.data.state === 4 || result.data.state >= 7) {
              // 추천브라 미리보기 페이지
              this.emitter.emit("showToast", "이미 완료된 설문이 있어 추천브라 페이지로 이동합니다.");
              this.$router.push("/survey/result/preview");
            } else if (result.data.state === 5) {
              // 홈 피팅 서비스 신청하기
              this.emitter.emit("showToast", "추천 브라가 선정되어 홈피팅 서비스를 페이지로 이동합니다.");
              this.$router.push("/homefitting/order");
            } else if (result.data.state === 6) {
              // 리뷰페이지
              this.emitter.emit("showToast", "이미 완료된 설문에 대해 홈 피팅 서비스를 신청 내역이 있어 리뷰페이지로 이동합니다.");
              this.$router.push("/homeservice");
            }
            return;
          } else {
            if (Object.keys(result.data).includes("isAuth") && result.data.isAuth === false) {
              // this.$store.commit("clearCode");
              this.$store.commit("clearToken");
              deleteCookie("auth");
              // deleteCookie("user");
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
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button) {
  font-family: $font-main, sans-serif !important;
  scroll-behavior: smooth;
}

.modal {
  display: flex;
  flex-direction: column;
  z-index: 100;
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: black;
    opacity: 0.5;
  }

  &__window {
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    display: flex;
    overflow: hidden;
    width: 39rem;
    height: 22rem;
    border-radius: 0.4rem;
    overflow: hidden;
    padding: 24px;
    z-index: 1;
    box-shadow: 0px 4px 20px 0px $primary;
    background-color: white;

    @media screen and (max-width: $md-breakpoint - 1px) {
      width: 90%;
      /* height: 38rem; */
      height: 500px;
      flex-direction: column;
    }

    @media screen and (max-width: 280px) {
      padding: 16px;
    }
  }

  .partition {
    border: 0.3px solid $gray;
    width: 0.6px;
    height: 270px;

    @media screen and (max-width: $md-breakpoint - 1px) {
      border: 0.3px solid $gray;
      width: 70%;
      height: 0.6px;
    }
  }

  .test-type,
  .test-lifebra {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 8px;
    h2 {
      @include text-style(28, $primary);
      font-weight: bolder;
      @media screen and (max-width: $md-breakpoint) {
        @include text-style(18, $primary);
      }
    }
    p {
      @include text-style(16, $primary);
      text-align: center;
      margin-top: 16px;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(14, $primary);
      }

      @media screen and (max-width: 280px) {
        @include text-style(13, $primary);
      }
    }
    button {
      margin-top: 32px;
      width: 90%;
    }
  }

  // 상황에 따라 transition 변경가능 enter,leave class는 상단 문서 참고
  &-enter,
  &-leave-to {
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &-enter-to,
  &-leave {
    transition: opacity 0.4s ease;
  }
}
</style>

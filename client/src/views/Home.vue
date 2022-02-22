<template>
  <div class="home">
    <div class="hero">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="hero-text container">
        <div class="title-box">
          <h4>실패 없는 스무스한 브라 선택,</h4>
          <h2>스무슬리와 함께!</h2>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="button-container">
            <button class="test-button" @click="checkState">
              <span>{{ buttonStep }}. <br />{{ buttonContent }}&nbsp;<i class="fas fa-chevron-circle-right"></i></span>
            </button>
          </div>
        </div>
        <img src="@/assets/mainpage/handpoint.png" alt="" />
      </div>
    </div>
    <!-- 스텝퍼 -->
    <div class="stepper">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="left-contents">
        <h3><span>스무슬리,</span><br />이렇게<br />시작하세요.</h3>
        <img v-if="step == 1" src="@/assets/mainpage/phone_kit_order.png" alt="" />
        <img v-if="step == 2" src="@/assets/mainpage/phone_test_result.png" alt="" />
        <img class="only" v-if="step == 3" src="@/assets/mainpage/phone_recommend.png" alt="" />
        <img class="truck" v-if="step == 4" src="@/assets/mainpage/truck.png" alt="" />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="step-container">
        <div class="buttons">
          <button @click="step = 1" :class="{ selected: step == 1 }">STEP.01</button>
          <button @click="step = 2" :class="{ selected: step == 2 }">STEP.02</button>
          <button @click="step = 3" :class="{ selected: step == 3 }">STEP.03</button>
          <button @click="step = 4" :class="{ selected: step == 4 }">STEP.04</button>
        </div>
        <div class="loading-bar">
          <div class="percentage"></div>
          <div :style="{ left: 25 * (step - 1) + '%' }" class="stepper-one"></div>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="right-contents">
        <h4 v-if="step == 1">가슴 측정 키트 무료 신청</h4>
        <h4 v-if="step == 2">가슴 테스트 & 결과 확인</h4>
        <h4 v-if="step == 3">브라 추천 결과 확인</h4>
        <h4 v-if="step == 4">홈 피팅 서비스</h4>
        <p v-if="step == 1">
          스무슬리가 자체 개발한 가슴 측정 키트를<br />
          무료로 배송 받고, 내 가슴을 정확하게 측정하세요.
        </p>
        <p v-if="step == 2">
          추가적인 설문을 통해, <br />
          내 가슴과 체형이 어떤 타입인지 바로 확인하세요.
        </p>
        <p v-if="step == 3">
          다양한 브랜드의 브라 제품 중, <br />
          나의 가슴과 취향에 가장 적절한 브라를 추천 받으세요.
        </p>
        <p v-if="step == 4">
          무료 배송/반송을 통해 추천된 브라가<br />
          나에게 맞는지 집에서 직접 입어본 후 구매할 수 있어요.
        </p>
        <div @click="this.$router.push('/kitorder')" v-if="step == 1" class="button-container">가슴 측정 키트 신청&nbsp;<i class="fas fa-chevron-circle-right"></i></div>
      </div>
    </div>
    <!-- 브라 추천 상세 페이지 설명 -->
    <div class="select_bra">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="content">
        <span>300개의 브랜드 500만개의 브라 중</span>
        <h2>내게 맞는 것만 골라주니까</h2>
        <p>
          세상의 모든 브라의 데이터를 수집하고 분석하여<br />
          나의 가슴과 취향에 가장 적합한 브라를 찾아줍니다.
        </p>
      </div>
      <img data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="phone" src="@/assets/mainpage/phone_detail.png" alt="" />
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="arrow-box">
      <img src="@/assets/mainpage/arrow_bottom.png" alt="" />
    </div>
    <!-- 가슴 사진 선택하기 -->
    <div class="select_breast">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="content">
        <h2>
          내 가슴을 누구보다 <br />
          정확히 파악하니까
        </h2>
        <p>
          100가지의 가슴 실사를 이용한<br />
          현실적/직관적 유형 선택
        </p>
      </div>
      <img data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="phone" src="@/assets/mainpage/phone_breastselect.png" alt="" />
      <img data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="kit" src="@/assets/mainpage/kit_description.png" alt="" />
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="arrow-box">
      <img src="@/assets/mainpage/arrow_bottom.png" alt="" />
    </div>
    <!-- 홈 피팅 서비스 -->
    <div class="homefitting">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="content">
        <h2>
          추천된 브라가 진짜 괜찮은지<br />
          입어볼 수 있으니까
        </h2>
        <p>
          추천된 3개의 브라, 각 3개의 사이즈를<br />
          무료로 집까지 배송시켜 입어보고<br />
          가장 잘 맞는 제품과 사이즈를 구매하세요.
        </p>
        <span> * 재고 상황에 따라 4개의 제품, <br />2개의 사이즈가 배송될 수 있습니다. </span>
        <div class="button-container" @click="checkState">스무슬리 시작하기&nbsp;<i class="fas fa-chevron-circle-right"></i></div>
      </div>
      <img data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" src="@/assets/mainpage/phone_homefitting.png" alt="" />
    </div>
    <!-- reviews -->
    <div class="reviews">
      <h3>
        이왕 찾을거,<br />
        Find smoosly
      </h3>
      <div class="review-slider">
        <div class="item">
          <h5>고객 후기</h5>
          <div class="box"><p>원래 입었던 브라 중에서 가장 탄탄하게 잘 잡아주는 듯한 느낌이 있고 디자인이랑 색상이 너무 마음에 들어요 !</p></div>
        </div>
        <div class="item">
          <h5>고객 후기</h5>
          <div class="box"><p>제 가슴에 착붙인 브라는 처음이에요!</p></div>
        </div>
        <div class="item">
          <h5>고객 후기</h5>
          <div class="box"><p>옷 입어도 컵의 윗선이 보여서 고민이 되긴 했지만 착용감이 너무 좋아서 입고 싶다!</p></div>
        </div>
        <div class="item">
          <h5>고객 후기</h5>
          <div class="box">
            <p>컵이 안들뜨고 밀착이 잘돼요! 그리고 와이어 브라이고 65인데도 압박감이 별로 없어요! 움직임 후에도 들뜸이 없습니다. 컵도 너무크지도 작지도 않아요!</p>
          </div>
        </div>
        <div class="item">
          <h5>고객 후기</h5>
          <div class="box">
            <p>
              처음 착용시 가슴 모양?에 맞는 브라는 이브라가 지금까지 사용해본 브라중에 최고인것 같아요!! 컵이 맞춤제작한것 마냥 딱 맞아요. 아쉬운점이 있다면... 움직임이 있은 후에는 컵 들뜸이 좀 있어요 또 어깨끈에 레이스가 없었으면 더 좋았을 것 같습니다. 저 가슴과 딱 맞는 브라는 처음이라 그래도
              구매해보고 싶습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserFromCookie } from "@/utils/cookies";
import { deleteCookie } from "@/utils/cookies";
// import { checkAuth } from "@/utils/loginAuth";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      PK_ID: getUserFromCookie() || "",
      state: null,
      step: 1,
      page: null,
      buttonStep: "STEP 1",
      buttonContent: "가슴측정 키트 신청",
    };
  },
  methods: {
    checkState() {
      this.emitter.emit("closeToggle");
      if (this.PK_ID === "") {
        this.emitter.emit("loginModal", true);
        this.emitter.emit("showRedToast", "로그인 후 이용해주세요.");
        return;
      }
      if (this.state === 0) {
        // 키트배송신청
        this.$router.push("/kitorder");
      } else if (this.state === 1) {
        // 키트업로드페이지
        this.$router.push("/Test");
      } else if (this.state === 2) {
        // 설문페이지 - 마지막 응답 페이지: result.data.page
        this.$router.push(`/survey/${this.page}`);
      } else if (this.state === 3) {
        // 가슴결과페이지
        this.$router.push("/survey/result");
      } else if (this.state === 4 || this.state >= 7) {
        // 추천브라 미리보기 페이지
        this.$router.push("/survey/result/preview");
      } else if (this.state === 5) {
        // 홈 피팅 서비스 신청하기
        this.$router.push("/homefitting/order");
      } else if (this.state === 6) {
        // 리뷰페이지
        this.$router.push("/homeservice");
      }
    },
    stepAutoplay() {
      if (this.step === 4) this.step = 1;
      else this.step += 1;
    },
    async fetchStep() {
      this.PK_ID &&
        axios
          .get("/users/getState")
          .then((result) => {
            console.log(result.data);
            if (result.data.success) {
              this.buttonStep = `STEP ${result.data.step}`;
              this.buttonContent = result.data.content;
              this.state = result.data.state;
              this.page = result.data.page;
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
              // checkAuth(result.data)
            }
          })
          .catch(console.log);
    },
  },
  mounted() {
    setInterval(this.stepAutoplay, 5000);
    window.scrollTo(0, 0);
    this.fetchStep();
    this.emitter.on("loginFetch", () => {
      console.log("emitter");
      this.PK_ID = getUserFromCookie() || "";
      this.fetchStep();
    });
    this.emitter.on("logoutFetch", () => {
      this.PK_ID = "";
      this.state = null;
      this.step = 1;
      this.page = null;
      this.buttonStep = "STEP 1";
      this.buttonContent = "가슴측정 키트 신청";
    });
  },
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped>
*:not(i):not(button) {
  font-family: $font-main, sans-serif !important;
}

.hero {
  /* background-image: url("../assets/hero-bg.png"); */
  // background-color: #ffd07f;
  background-color: #fad67a;
  background-attachment: fixed;
  position: relative;
  height: 100vh;

  @media screen and (max-width: 820px) {
    height: 85vh;
  }

  @media screen and (width: 540px) {
    height: 110vh;
  }

  @media screen and (max-width: 375px) {
    height: 108vh;
  }
  @media screen and (max-height: 800px) {
    height: 108vh;
  }
  // height: auto;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .hero-text {
    padding: 32px 32px 0 32px;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    color: $white;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width: 820px) {
      padding: 8px;
    }

    .title-box {
      position: absolute;
      top: 33%;
      right: 5%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      @media screen and (max-width: 820px) {
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        top: 17%;
        left: 51%;
        transform: translate(-50%, 0%);
      }

      h4 {
        font-size: 24px;
        padding-left: 16px;
        font-weight: 600;
        margin-bottom: 16px;

        @media screen and (max-width: 820px) {
          font-size: 16px;
          padding-left: 0px;
          margin-bottom: 8px;
        }
      }

      h2 {
        padding: 8px 16px;
        font-size: 48px;
        width: 100%;
        font-weight: 400;
        @media (min-width: 550px) {
          font-size: 80px;
        }

        @media screen and (max-width: 820px) {
          font-size: 40px;
          text-align: center;
        }
      }

      .test-button {
        display: flex;
        width: auto;
        border: 3px solid $primary;
        border-radius: 16px;
        margin-top: 28px;
        margin-left: 16px;
        padding: 8px;
        justify-content: center;
        align-items: center;
        white-space: pre-wrap;
        @include text-style(18, $blue-dark);
        font-weight: 700;

        @media screen and (max-width: 820px) {
          width: auto;
          margin-top: 20px;
          margin-left: 0;
        }

        span {
          display: flex;
          width: auto;
          justify-content: center;
          align-items: center;
          word-break: keep-all;
          text-align: center;
          color: $primary;
          font-weight: bold;
          font-weight: 700;

          i {
            font-size: 30px;
            margin-left: 16px;

            @media screen and (max-width: 820px) {
              margin-left: 8px;
              font-size: 22px;
            }
          }
        }

        @media screen and (max-width: 820px) {
          width: 168px;
          @include text-style(14, $primary);
        }

        &:hover {
          background-color: $tertiary;
          color: white;
          opacity: 0.7;
          border: 2px solid $white;
        }
      }
    }

    img {
      margin: 32px 0 0;
      position: absolute;
      bottom: 0;
      left: 2%;
      opacity: 0.8;
      max-width: 42%;
      height: auto;

      @media screen and (max-width: 820px) {
        max-width: 60%;
        margin: 32px 0 0;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0%);
      }

      @media screen and (max-width: 540px) {
        max-width: 85%;
        margin: 32px 0 0;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0%);
      }
    }
  }
}

.arrow-box {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $white;

  img {
    width: 70px;
  }
}

.stepper {
  height: 700px;
  padding: 32px;
  position: relative;

  @media screen and (max-width: 820px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 64px 32px;
  }

  .left-contents {
    height: 90%;
    position: absolute;
    display: flex;
    align-items: center;
    left: 7%;

    @media screen and (max-width: 820px) {
      flex-direction: column;
      position: relative;
      left: 0;
    }

    h3 {
      @include text-style(28, $primary);
      font-weight: 500;
      margin-right: 64px;

      @media screen and (max-width: 820px) {
        @include text-style(22, $primary);
        margin-right: 0;
        margin-bottom: 16px;
      }
      span {
        color: $blue;
        font-weight: 700;
      }
    }

    img {
      width: 330px;

      @media screen and (max-width: 1024px) {
        width: 240px;
      }

      @media screen and (max-width: 820px) {
        width: 224px;
      }
    }

    .truck {
      margin-top: 80px;

      @media screen and (max-width: 820px) {
        margin: 64px auto;
      }
    }

    .only {
      width: 280px;

      @media screen and (max-width: 1024px) {
        width: 200px;
      }

      @media screen and (max-width: 820px) {
        width: 168px;
      }
    }
  }

  .right-contents {
    position: absolute;
    top: 40%;
    left: 53%;

    @media screen and (max-width: 820px) {
      position: relative;
      top: 0;
      left: 0;
      padding: 16px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    h4 {
      @include text-style(24, $primary);
      font-weight: 700;

      @media screen and (max-width: 820px) {
        @include text-style(18, $primary);
        text-align: center;
      }
    }
    p {
      @include text-style(18, $primary);
      margin-top: 16px;
      font-weight: 500;

      @media screen and (max-width: 820px) {
        font-size: 14px;
        text-align: center;
      }
    }

    .button-container {
      margin-top: 28px;
      @include text-style(18, $primary);
      padding: 4px;
      display: flex;
      font-weight: 700;
      align-items: center;
      width: 200px;
      border-radius: 16px;
      justify-content: center;
      border: 2px solid $primary;

      @media screen and (max-width: 820px) {
        width: 168px;
        @include text-style(16, $primary);
      }

      &:hover {
        background-color: $tertiary;
        color: white;
        opacity: 0.7;
        border: 2px solid $white;
      }
    }
  }

  .step-container {
    position: absolute;
    left: 50%;
    top: 20%;

    @media screen and (max-width: 820px) {
      position: relative;
      left: 0;
      top: 0;
    }

    .buttons {
      width: 100%;
      margin-top: 16px;
      display: flex;
      justify-content: space-around;

      button {
        font-weight: 500;
        font-size: 16px;
        color: $primary;
        border: 0;
        // width: 120px;
        height: 30px;
        text-align: center;
        border-radius: 2px 2px 0 0;

        @media screen and (max-width: 820px) {
          font-size: 14px;
        }
      }

      .selected {
        color: $blue;
      }
    }

    .loading-bar {
      position: relative;
      width: 480px;
      height: 16px;
      border-radius: 15px;
      overflow: hidden;
      background-color: #fcecdd;
      /* background-color: #F7D3BA; */
      /* border-bottom: 1px solid ; */

      @media screen and (max-width: $md-breakpoint) {
        width: 300px;
        height: 10px;
      }
      @media screen and (max-width: 280px) {
        width: 252px;
        height: 10px;
      }
      .percentage {
        position: absolute;
        top: 1px;
        left: 1px;
        right: 1px;
        display: block;
        height: 100%;
        /* width: 50%; */
        border-radius: 15px;
        background-color: $blue-light;
        background-size: 30px 30px;
        // background-image: linear-gradient(135deg, rgba($color: $white, $alpha: .15) 25%, transparent 25%,
        //                         transparent 50%, rgba($color: $white, $alpha: .15) 50%,
        //                         rgba($color: $white, $alpha: .15) 75%, transparent 75%,
        //                         transparent);
        animation: animate-stripes 3s linear infinite;
      }

      .stepper-one {
        position: absolute;
        height: 100%;
        left: 0%;
        // top: 0.5px;
        display: block;
        width: 120px;
        border-radius: 8px;
        // z-index: 2;
        // background-color: $blue;
        background-color: rgb(255, 119, 0);
        opacity: 50%;
        @media screen and (max-width: $md-breakpoint) {
          width: 75px;
          // height: 10px;
        }
        @media screen and (max-width: 280px) {
          width: 63px;
        }
      }
    }
  }
}

.select_breast {
  height: 800px;
  padding: 64px 32px;
  position: relative;
  background-color: #fff;

  @media screen and (max-width: 820px) {
    display: flex;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .phone {
    position: absolute;
    left: 13%;
    top: 10%;
    width: 265px;

    @media screen and (max-width: 1024px) {
      left: 10%;
    }

    @media screen and (max-width: 820px) {
      position: relative;
      left: 0%;
      top: 0%;
      width: 180px;
    }
  }

  .content {
    position: absolute;
    left: 40%;
    top: 13%;

    @media screen and (max-width: 820px) {
      position: relative;
      left: 0%;
      top: 0%;
      margin-bottom: 28px;
    }

    h2 {
      font-size: 36px;
      line-height: 130%;
      font-weight: 700;
      color: $primary;

      @media screen and (max-width: 820px) {
        font-size: 24px;
        text-align: center;
      }
    }

    p {
      margin-top: 16px;
      font-size: 18px;
      font-weight: 600;
      color: $primary;
      line-height: 150%;

      @media screen and (max-width: 820px) {
        text-align: center;
        font-size: 14px;
      }
    }
  }

  .kit {
    position: absolute;
    left: 42%;
    top: 45%;
    width: 648px;

    @media screen and (max-width: 1024px) {
      width: 540px;
    }

    @media screen and (max-width: 820px) {
      position: relative;
      left: 0%;
      top: 0%;
      width: 100%;
      margin-top: 44px;
    }
  }
}

.select_bra {
  height: 680px;
  padding: 64px 32px;
  position: relative;
  background-color: #fff;

  @media screen and (max-width: 820px) {
    display: flex;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .phone {
    position: absolute;
    left: 59%;
    top: 10%;
    width: 265px;

    @media screen and (max-width: 820px) {
      position: relative;
      left: 0%;
      top: 0%;
      width: 180px;
    }
  }

  .content {
    position: absolute;
    left: 19%;
    top: 33%;
    text-align: right;

    @media screen and (max-width: 1024px) {
      left: 12%;
    }

    @media screen and (max-width: 820px) {
      position: relative;
      left: 0%;
      top: 0%;
      margin-bottom: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }

    span {
      font-size: 16px;
      margin-bottom: 16px;
    }

    h2 {
      font-size: 36px;
      line-height: 150%;
      font-weight: 700;
      color: $primary;

      @media screen and (max-width: 820px) {
        font-size: 24px;
      }
    }

    p {
      margin-top: 32px;
      @include text-style(18, $primary);
      font-weight: 600;
      color: $primary;
      line-height: 150%;
      text-align: right;

      @media screen and (max-width: 820px) {
        @include text-style(14, $primary);
        margin: 24px auto;
        text-align: center;
      }
    }
  }
}

.homefitting {
  height: 800px;
  padding: 64px 32px;
  position: relative;
  background-color: #fff;
  position: relative;

  @media screen and (max-width: 820px) {
    display: flex;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    position: absolute;
    left: 59%;
    top: 10%;
    width: 265px;

    @media screen and (max-width: 820px) {
      position: relative;
      left: 0%;
      top: 0%;
      width: 180px;
      margin-bottom: 28px;
      margin-top: 24px;
    }
  }

  .content {
    position: absolute;
    left: 19%;
    top: 13%;
    text-align: right;

    @media screen and (max-width: 1024px) {
      left: 12%;
    }

    @media screen and (max-width: 820px) {
      position: relative;
      left: 0%;
      top: 0%;
      text-align: center;
    }

    h2 {
      font-size: 36px;
      line-height: 130%;
      font-weight: 700;
      color: $primary;

      @media screen and (max-width: 820px) {
        font-size: 24px;
      }
    }

    p {
      margin: 28px auto;
      font-size: 18px;
      font-weight: 600;
      color: $primary;
      line-height: 150%;

      @media screen and (max-width: 820px) {
        font-size: 16px;
      }
    }

    span {
      color: $red;
      font-weight: bold;

      @media screen and (max-width: 820px) {
        font-size: 13px;
      }
    }

    .button-container {
      position: absolute;
      right: 0;
      margin-top: 80px;
      @include text-style(18, $primary);
      padding: 4px;
      display: flex;
      font-weight: 700;
      align-items: center;
      width: 200px;
      border-radius: 16px;
      justify-content: center;
      border: 2px solid $primary;

      &:hover {
        background-color: $tertiary;
        color: white;
        opacity: 0.7;
        border: 2px solid $white;
      }

      @media screen and (max-width: 820px) {
        width: 168px;
        // margin-top: 16px;
        position: relative;
        margin: 16px auto;
        @include text-style(16, $primary);
      }
    }
  }
}

.reviews {
  height: 700px;
  padding: 32px;
  position: relative;
  background-color: #f2bb59;
  position: relative;
  display: flex;
  align-items: center;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }

  h3 {
    font-size: 40px;
    color: $primary;
    font-weight: bolder;
    position: absolute;
    left: 7%;
    line-height: 160%;

    @media screen and (max-width: 820px) {
      position: relative;
      left: 0;
      font-size: 24px;
      margin: 28px auto;
    }
  }

  .review-slider {
    width: 68%;
    position: absolute;
    right: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    // white-space: nowrap;
    display: flex;

    @media screen and (max-width: 820px) {
      width: 100%;
      position: relative;
    }

    .item {
      background-color: $white;
      margin-right: 16px;
      border-radius: 8px;
      padding: 16px;
      height: 440px;
      width: 300px;
      display: flex;
      flex-direction: column;

      h5 {
        padding: 8px;
        border: 4px solid $blue-light;
        width: 88px;
        height: 40px;
        border-radius: 16px;
        text-align: center;
        color: $blue;
        font-weight: 700;
        font-size: 14px;
        margin: 24px 16px;
      }

      .box {
        width: 320px;

        p {
          @include text-style(16, $primary);
          margin: 16px 16px 16px 8px;
          line-height: 200%;
          width: 80%;
        }
      }
    }
  }

  .review-slider::-webkit-scrollbar {
    display: none;
  }
}
</style>

<template>
  <div class="body">
    <div class="profile">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="info">
        <h2>{{ username }} <span>님</span></h2>
        <h3>{{ email }}</h3>
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="modals">
        <a @click="deliveryManage" class="modal-btn">배송/반송 관리</a>
        <a @click="step = 2" class="modal-btn">회원 정보 수정</a>
      </div>
    </div>
    <div class="container">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="step == 1" class="showpart main">
        <div class="part">
          <p>스무슬리 자체개발 키트와 설문을 통해 <br />알아보는 내 가슴 정보</p>
          <button @click="goToResult" type="button" class="btn-primary btn-48">가슴 진단 결과</button>
        </div>
        <div class="partition"></div>
        <div class="part">
          <p>내 가슴 정보와 브라 취향을 모두 <br />반영하여 추천된 브라</p>
          <button @click="goToRecomBra" type="button" class="btn-primary btn-48">추천 브라</button>
        </div>
        <div class="partition"></div>
        <div class="part">
          <p>추천된 브라를 하나씩 입어보며 진행하는 <br />만족도 평가</p>
          <button @click="goToReview" type="button" class="btn-primary btn-48">리뷰 작성 하기</button>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="step == 2" class="showpart">
        <div class="information">
          <div class="info-head">
            <i @click="step = 1" class="fas fa-arrow-left"></i>
            <h2>프로필</h2>
          </div>

          <div class="user-info">
            <table>
              <label for="">기본 회원 정보</label>
              <tr>
                <td class="head">이름</td>
                <td><input type="text" v-model="username" /></td>
              </tr>
              <tr>
                <td class="head">이메일</td>
                <td>{{ email }}</td>
              </tr>
              <tr>
                <td class="head">휴대폰번호</td>
                <td><input type="text" @keyup="getPhoneMask(phone)" v-model="phone" /></td>
              </tr>
              <tr>
                <td class="head">생년월일</td>
                <td><input type="date" v-model="birthday" /></td>
              </tr>
              <tr>
                <td class="head">혜택 알림 설정</td>
                <td class="boxx">
                  <input id="s1d" type="checkbox" class="switch" v-model="agreePromotion" />
                  <!-- <label for="s1d">Switch</label> -->
                </td>
              </tr>
            </table>
          </div>
          <!-- <div class="partition"></div> -->
          <div class="delivery-info">
            <table>
              <label for="">배송지 정보</label>
              <tr>
                <td class="head">우편번호</td>
                <td><input @click="execDaumPostcode" type="text" v-model="postcode" /></td>
              </tr>
              <tr>
                <td class="head">주소</td>
                <td><input type="text" v-model="address" /></td>
              </tr>
              <tr>
                <td class="head">상세주소</td>
                <td><input type="text" v-model="extraAddress" /></td>
              </tr>
            </table>
            <div class="postcode-search" ref="searchWindow" :style="searchWindow" style="z-index: 100; border: 1px solid; width: 300px; height: 400px; margin-top: 64px; margin-bottom: 16px">
              <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1" @click="searchWindow.display = 'none'" alt="close" />
            </div>
            <div class="button-box">
              <button @click="editUserInfo" type="button" class="btn-secondary btn-40">회원정보 수정</button>
            </div>
          </div>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="step == 3" class="showpart">
        <div class="information">
          <div class="info-head">
            <i @click="step = 1" class="fas fa-arrow-left"></i>
            <h2>배송/반송 관리</h2>
          </div>
          <div class="info-container">
            <div class="selections">
              <div @click="option = 1" class="option" :class="{ selected: option == 1 }">
                <h4>배송 관리</h4>
              </div>
              <div @click="option = 2" class="option" :class="{ selected: option == 2 }">
                <h4>반송 관리</h4>
              </div>
            </div>
          </div>
          <div class="info-showpart">
            <div v-if="option == 1" class="we-deliver">
              <div class="kit-delivery-info">
                <div v-if="isOrderedKit" class="box">
                  <div class="order-date">
                    <p>신청일자: {{ kitOrderDate }}</p>
                    <h3>가슴 측정 키트</h3>
                  </div>
                  <ul class="progressbar">
                    <li :class="{ active: kitOrderStep >= 1 }">배송준비중</li>
                    <li :class="{ active: kitOrderStep >= 2 }">배송중</li>
                    <li :class="{ active: kitOrderStep >= 3 }">배송완료</li>
                  </ul>
                </div>
                <div v-if="!isOrderedKit" class="box no-deliver">
                  <p>키트 배송 정보가 없습니다.</p>
                  <button @click="this.$router.push('/kitorder')" type="button" class="btn-secondary btn-40 btn-second">키트 신청하기</button>
                </div>
              </div>

              <div class="hometry-delivery-info">
                <div v-if="isOrderedHometry" class="box box2">
                  <div class="order-date">
                    <p>신청일자: {{ hometryOrderDate }}</p>
                    <h3>홈 피팅용 브라</h3>
                  </div>
                  <ul class="progressbar">
                    <li :class="{ active: hometryOrderStep >= 1 }">배송준비중</li>
                    <li :class="{ active: hometryOrderStep >= 2 }">배송중</li>
                    <li :class="{ active: hometryOrderStep >= 3 }">배송완료</li>
                  </ul>
                </div>
                <div v-if="!isOrderedHometry" class="box box2 no-deliver2">
                  <p>홈 피팅용 브라 배송 정보가 없습니다.</p>
                  <button @click="goToHomeFittingOrder" type="button" class="btn-secondary btn-40 btn-second">홈 피팅 서비스 신청하기</button>
                </div>
              </div>
              <form action="http://info.sweettracker.co.kr/tracking/4" method="post" target="_blank">
                <input hidden type="text" class="form-control" id="t_key" name="t_key" placeholder="" :value="deliveryInfo.api_key" />
                <input hidden type="text" class="form-control" name="t_code" id="t_code" placeholder="" :value="deliveryInfo.code" />
                <input hidden type="text" class="form-control" name="t_invoice" id="t_invoice" placeholder="" :value="hometryInvoice" />
                <div class="button-box">
                  <button v-if="isOrderedHometry" type="submit" class="btn-secondary btn-48">조회하기</button>
                </div>
              </form>
            </div>
            <div v-if="option == 2" class="deliver-to-us">
              <!-- 홈 피팅 신청 안해서 반송 신청 하면 안되는 경우 -->
              <div v-if="!canReturn && !isOrderedHometry" class="howto-deliver">
                <p>
                  <span>반송 신청을 할 수 없습니다.&nbsp;<i class="far fa-surprise"></i></span> <br />
                  반송 신청은 홈 피팅 브라 착용 및 리뷰 작성 후에 가능합니다.
                </p>
              </div>
              <!-- 반송 신청 안한 경우 -->
              <div v-if="canReturn && !isOrderedHometry && !deliverTousreq" class="howto-deliver">
                <p>
                  <span>혹시 반송 신청을 잊으셨나요?&nbsp;<i class="far fa-surprise"></i></span> <br />
                  홈 피팅 후 입어보신 브라는<br />스무슬리에 반송해 주세요!
                </p>
                <div class="button-box">
                  <button @click="openDeliverModal" type="button" class="btn-primary btn-48 btn-third">반송 신청하기</button>
                </div>
              </div>
              <!-- 반송 신청한 경우 -->
              <div v-if="isOrderedHometry && deliverTousreq" class="delivery-to-us-info">
                <div class="box">
                  <div class="order-date">
                    <p>신청 일자: {{ deliverTousDate }}</p>
                    <h3>홈 피팅용 브라</h3>
                  </div>
                  <ul class="progressbar">
                    <li :class="{ active: deliverTousStep >= 1 }">반송요청</li>
                    <li :class="{ active: deliverTousStep >= 2 }">반송중</li>
                    <li :class="{ active: deliverTousStep >= 3 }">반송완료</li>
                  </ul>
                </div>
                <form action="http://info.sweettracker.co.kr/tracking/4" method="post" target="_blank">
                  <input hidden type="text" class="form-control" id="t_key" name="t_key" placeholder="" :value="deliveryInfo.api_key" />
                  <input hidden type="text" class="form-control" name="t_code" id="t_code" placeholder="" :value="deliveryInfo.code" />
                  <input hidden type="text" class="form-control" name="t_invoice" id="t_invoice" placeholder="" :value="returnInvoice" />
                  <div class="button-box">
                    <button type="submit" class="btn-secondary btn-48 btn-second">반송 현황 조회</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="others">
      <a @click="deleteAccount" class="delete-account">탈퇴하기</a>
    </div>
  </div>
</template>

<script>
import { deleteCookie } from "@/utils/cookies";
// import { checkAuth } from '@/utils/loginAuth';
import axios from "axios";

export default {
  name: "Mypage",
  data() {
    return {
      username: "",
      email: "",

      step: 1, //1:기본버튼들, 2:회원정보수정, 3:배송반송관리
      option: 1, //1:배송관리, 2:반송관리

      phone: "",
      birthday: "",
      agreePromotion: true,

      postcode: "",
      address: "",
      extraAddress: "",

      deliverTousreq: false, // 반송 신청 여부에 따라 신청하는 뷰 or 반송 현황 체크 뷰
      deliverTousDate: "",
      deliverTousStep: 0,

      isOrderedKit: false,
      kitOrderDate: "",
      kitOrderStep: 0,

      isRecom: false,
      canReturn: false,
      isOrderedHometry: false,
      hometryOrderDate: "",
      hometryOrderStep: 0,
      hometryInvoice: "",
      returnInvoice: "",
      deliveryInfo: {
        api_key: "",
        code: "04",
        tamplete: null,
      },

      searchWindow: {
        display: "none",
        height: "300px",
      },

      // Test status
      isCompleteTest: false,
      testStep: 0,

      // testList: this.$store.state.user.test || ["",],
      testItems: [],
    };
  },
  components: {
    // TestResult,
    // ToggleSwitch,
  },
  mounted() {
    window.scrollTo(0, 0);
    this.emitter.on("setCheckboxVal", (state) => {
      this.agreePromotion = state;
    });

    this.emitter.on("deliverStatus", (obj) => {
      this.deliverTousreq = obj.state;
      this.deliverTousDate = obj.date;
      this.deliverTousStep = 1;
    });
  },
  methods: {
    execDaumPostcode() {
      const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      // eslint-disable-next-line
      new daum.Postcode({
        onComplete: (data) => {
          if (data.userSelectedType === "R") {
            this.address = data.roadAddress;
          } else {
            this.address = data.jibunAddress;
          }
          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress = data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress += this.extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            if (this.extraAddress !== "") {
              this.extraAddress = ` (${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          this.postcode = data.zonecode;
          this.$refs.extraAddress.focus();
          this.searchWindow.display = "none";
          document.body.scrollTop = currentScroll;
        },
        onResize: (size) => {
          this.searchWindow.height = `${size.height}px`;
        },
        width: "100%",
        height: "100%",
      }).embed(this.$refs.searchWindow);
      this.searchWindow.display = "block";
    },
    deleteAccount() {
      this.emitter.emit("deleteAccountModal", true);
    },
    openDeliverModal() {
      this.emitter.emit("DeliveryModal", true);
    },
    getPhoneMask(val) {
      let res = this.getMask(val);
      this.phone = res;
      //서버 전송 값에는 '-' 를 제외하고 숫자만 저장
      // this.model.contact = this.contact.replace(/[^0-9]/g, '')
    },
    getMask(phoneNumber) {
      if (!phoneNumber) return phoneNumber;
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

      let res = "";
      if (phoneNumber.length < 3) {
        res = phoneNumber;
      } else {
        if (phoneNumber.substr(0, 2) == "02") {
          if (phoneNumber.length <= 5) {
            //02-123-5678
            res = phoneNumber.substr(0, 2) + "-" + phoneNumber.substr(2, 3);
          } else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {
            //02-123-5678
            res = phoneNumber.substr(0, 2) + "-" + phoneNumber.substr(2, 3) + "-" + phoneNumber.substr(5);
          } else if (phoneNumber.length > 9) {
            //02-1234-5678
            res = phoneNumber.substr(0, 2) + "-" + phoneNumber.substr(2, 4) + "-" + phoneNumber.substr(6);
          }
        } else {
          if (phoneNumber.length < 8) {
            res = phoneNumber;
          } else if (phoneNumber.length == 8) {
            res = phoneNumber.substr(0, 4) + "-" + phoneNumber.substr(4);
          } else if (phoneNumber.length == 9) {
            res = phoneNumber.substr(0, 3) + "-" + phoneNumber.substr(3, 3) + "-" + phoneNumber.substr(6);
          } else if (phoneNumber.length == 10) {
            res = phoneNumber.substr(0, 3) + "-" + phoneNumber.substr(3, 3) + "-" + phoneNumber.substr(6);
          } else if (phoneNumber.length > 10) {
            //010-1234-5678
            res = phoneNumber.substr(0, 3) + "-" + phoneNumber.substr(3, 4) + "-" + phoneNumber.substr(7);
          }
        }
      }
      return res;
    },
    deliveryManage() {
      this.step = 3;
      this.fetchKitInfo();
      this.fetchHomeFittingInfo();
    },
    editUserInfo() {
      axios
        .post("/users/editUserInfo", {
          PK_ID: this.$store.state.PK_ID,
          username: this.username,
          phone: this.phone,
          birthday: this.birthday,
          agreePromotion: this.agreePromotion,
          postcode: this.postcode,
          address: this.address,
          extraAddress: this.extraAddress,
          message: this.message,
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            console.log(result.data.message);
            this.emitter.emit("showToast", "회원정보가 수정되었습니다.");
            this.fetchUserInfo();
          }
        })
        .catch(console.log);
    },
    // 유저 정보 불러오는 API 호출
    fetchUserInfo() {
      axios
        .get("/users/getUserInfo")
        .then((user) => {
          console.log(user.data);
          if (user.data.success) {
            console.log(user.data.userInfo);
            let userData = user.data.userInfo;
            this.username = userData.username;
            this.email = userData.email;
            this.phone = userData.phone;
            this.birthday = userData.birthday;
            this.agreePromotion = userData.agreePromotion;
            this.postcode = userData.postcode;
            this.address = userData.address;
            this.extraAddress = userData.extraAddress;
            this.message = userData.message;
          } else {
            if (Object.keys(user.data).includes("isAuth") && user.data.isAuth === false) {
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
            console.log(user.data.message);
            // checkAuth(user.data)
          }
        })
        .catch(console.log);
    },
    fetchKitInfo() {
      axios
        .get("/kits/getMyInfo")
        .then((kit) => {
          console.log(kit.data);
          let kitData = kit.data.kitInfo;
          if (kit.data.success) {
            this.isOrderedKit = true;
            this.kitOrderStep = kitData.state;
            this.kitOrderDate = kitData.createdAt;
          } else {
            if (Object.keys(kit.data).includes("isAuth") && kit.data.isAuth === false) {
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
            console.log(kit.data.message);
            // checkAuth(kit.data)
          }
        })
        .catch(console.log);
    },
    fetchHomeFittingInfo() {
      axios
        .get("/homeFitting/getMyInfo")
        .then((homeFitting) => {
          console.log(homeFitting.data);
          let data = homeFitting.data.homeFitting;
          if (homeFitting.data.success) {
            this.isOrderedHometry = true;
            this.hometryOrderDate = data.createdAt;
            this.hometryOrderStep = data.state;
            this.hometryInvoice = data.invoice;
            this.returnInvoice = data.returnInvoice;
            this.deliveryInfo = homeFitting.data.deliveryInfo;
            if (data.return !== 0) {
              this.deliverTousreq = true;
              this.deliverTousDate = data.returnDate;
              this.deliverTousStep = data.return;
            }
          } else {
            if (Object.keys(homeFitting.data).includes("isAuth") && homeFitting.data.isAuth === false) {
              this.$store.commit("clearCode");
              this.$store.commit("clearToken");
              deleteCookie("auth");
              deleteCookie("user");
              console.log("여기 로직 리팩토링");
              this.$router.push("/");
              this.emitter.emit("loginModal", true);
              this.emitter.emit("showRedToast", "로그인 후 이용해주세요.");
            }
            // checkAuth(homeFitting.data)
          }
          this.fetchCanReturn();
        })
        .catch(console.log);
    },
    fetchIsComplete() {
      axios
        .get("/breastTest/isComplete")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            if (!result.data.isComplete) {
              this.testStep = result.data.step;
              this.isCompleteTest = false;
              return;
            }
            this.isCompleteTest = true;
          }
        })
        .catch(console.log);
    },
    fetchIsRecom() {
      axios
        .get("/braRecommend/isRecom")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            if (result.data.isRecom) {
              this.isRecom = true;
            }
          }
          console.log(result.data.message);
        })
        .catch(console.log);
    },
    fetchCanReturn() {
      axios
        .get("/homeFitting/getCanReturn")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            if (result.data.canReturn) {
              this.canReturn = true;
            }
          }
          console.log(result.data.message);
        })
        .catch(console.log);
    },
    // 결과 버튼 로직
    goToResult() {
      if (!this.isOrderedKit) {
        this.emitter.emit("showNoticeToast", "키트 신청이 필요합니다.");
        this.$router.push("/kitorder");
        return;
      } else if (this.isOrderedKit && !this.isCompleteTest) {
        this.emitter.emit("showNoticeToast", "가슴 테스트를 진행해 주세요.");
        if (this.testStep === 0 || this.testStep === 1) {
          this.$router.push("/test");
          return;
        } else {
          this.$router.push(`/survey/${this.testStep}`);
          return;
        }
      } else if (this.isCompleteTest) {
        this.$router.push("/survey/result");
        return;
      }
    },
    // 추천브라 버튼 로직
    goToRecomBra() {
      if (!this.isOrderedKit) {
        this.emitter.emit("showNoticeToast", "키트 신청이 필요합니다.");
        this.$router.push("/kitorder");
      } else if (this.isOrderedKit && !this.isCompleteTest) {
        this.emitter.emit("showNoticeToast", "가슴 테스트를 진행해 주세요.");
        if (this.testStep === 0) {
          this.$router.push("/test");
        } else {
          this.$router.push(`/survey/${this.testStep}`);
        }
      } else if (this.isCompleteTest) {
        this.$router.push("/survey/result/preview");
      }
    },
    // 리뷰 버튼 로직
    goToReview() {
      // 홈 피팅 서비스에 대한 설명 페이지 지나서 거치도록 연결
      if (this.isOrderedHometry && this.isCompleteTest) {
        return this.$router.push("/homeservice");
      }
      this.emitter.emit("showNoticeToast", "홈 피팅 서비스 신청 후 리뷰쓰기가 가능합니다.");
    },
    goToHomeFittingOrder() {
      if (this.isRecom) {
        return this.$router.push("/homefitting/order");
      }
      this.emitter.emit("showNoticeToast", "아직 추천브라가 선정되지 않았습니다.");
    },
  },
  created() {
    this.fetchUserInfo();
    this.fetchKitInfo();
    this.fetchHomeFittingInfo();
    this.fetchIsComplete();
    this.fetchIsRecom();
  },
};
</script>

<style lang="scss" scoped>
.body {
  /* height: 140vh; */
  height: auto;
  background-color: $white;
  display: flex;
  flex-direction: column;
  padding: 128px;
  justify-content: flex-start;
  align-items: center;
  /* z-index: 1; */

  @media screen and (max-width: $md-breakpoint - 1px) {
    padding: 100px 0;
    /* height: 1000px; */
    height: auto;
  }

  .profile {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 32px;
    margin: 8px;
    /* height: 150px; */
    width: 700px;
    background-color: $background;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px $tertiary;

    @media screen and (max-width: $md-breakpoint - 1px) {
      width: 90%;
      padding: 28px 16px;
    }

    h2 {
      @include text-style(24, $primary);
      margin-bottom: 8px;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(16, $primary);
      }
    }
    span {
      @include text-style(18, $primary);

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(14, $primary);
      }
    }
    h3 {
      @include text-style(18, $secondary);

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(14, $secondary);
      }
    }

    .modals {
      position: absolute;
      padding: 8px;
      right: 10%;
      display: flex;
      flex-direction: column;

      @media screen and (max-width: $md-breakpoint) {
        padding: 4px;
        right: 5%;
      }

      .modal-btn {
        @include text-style(14, $primary);
        /* border-bottom: 0.5px solid $secondary; */
        margin-bottom: 8px;

        @media screen and (max-width: $md-breakpoint) {
          @include text-style(13, $primary);
          margin-bottom: 2px;
        }

        &:hover {
          color: $tertiary;
        }
      }
    }
  }

  .container {
    height: 714px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 16px;
    margin: 8px;
    width: 700px;
    background-color: $background;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px $tertiary;

    @media screen and (max-width: $md-breakpoint - 1px) {
      width: 90%;
      height: 600px;
    }

    .showpart {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin: 8px;

      .information {
        width: 95%;
        display: flex;
        height: 700px;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;

        @media screen and (max-width: $md-breakpoint - 1) {
          height: 600px;
        }

        .info-head {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 100%;

          i {
            @include text-style(24, $primary);
            position: absolute;
            left: 0%;

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(20, $primary);
            }

            &:hover {
              color: $blue;
            }
          }

          h2 {
            @include text-style(18, $primary);

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(16, $primary);
            }
          }
        }

        .user-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .button-box {
            width: 100%;
            display: flex;
            justify-content: center;

            button {
              width: 150px;
            }
          }
        }

        .partition {
          margin-top: 32px;
          border: 0.2px solid $tertiary;
          width: 80%;
          height: 0.4px;
        }

        .delivery-info {
          /* padding-top: 32px; */
          display: flex;
          flex-direction: column;
          justify-content: center;
          .button-box {
            width: 100%;
            display: flex;
            justify-content: center;

            button {
              width: 150px;
            }
          }
        }

        .info-container {
          width: 100%;
          .selections {
            display: flex;
            width: 100%;
            /* padding: 8px; */

            .option {
              @include text-style(16, $primary);
              @media screen and (max-width: $md-breakpoint) {
                @include text-style(14, $primary);
              }
              padding: 12px 8px;
              display: flex;
              justify-content: center;
              flex-grow: 1;
              border-bottom: 1px solid $tertiary;
            }

            .selected {
              color: $primary;
              border-bottom: 2px solid $primary;

              h4 {
                font-weight: bold;
              }
            }
          }
        }

        .info-showpart {
          .we-deliver,
          .deliver-to-us {
            padding: 36px 30px;

            @media screen and (max-width: 540px) {
              padding: 30px 8px;
            }
            /* position: relative; */

            .form {
              width: 100%;
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              button {
                position: absolute;
                bottom: 23%;

                @media screen and (max-width: $md-breakpoint) {
                  bottom: 7%;
                }
              }
            }

            .button-box {
              width: 100%;
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;

              button {
                position: absolute;
                bottom: 23%;

                @media screen and (max-width: $md-breakpoint) {
                  bottom: 7%;
                }
              }

              .btn-second {
                position: absolute;
                bottom: 51%;

                @media screen and (max-width: 540px) {
                  bottom: 42%;
                }
              }

              .btn-third {
                position: absolute;
                bottom: 60%;

                @media screen and (max-width: 540px) {
                  bottom: 50%;
                }
              }
            }

            .howto-deliver {
              p {
                span {
                  padding-top: 8px;
                  @include text-style(16, $blue-dark);
                  font-weight: bolder;
                  @media screen and (max-width: 540px) {
                    @include text-style(14, $blue-dark);
                    font-weight: bold;
                  }
                }
                @include text-style(14, $primary);
                line-height: 200%;
                text-align: center;
              }
            }

            .hometry-delivery-api {
              margin-top: 450px;
            }

            .kit-delivery-info,
            .hometry-delivery-info,
            .delivery-to-us-info {
              margin-bottom: 244px;
              margin-top: 84px;
              
              .box {
                width: 60%;
                position: absolute;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                background-color: $white;
                border-radius: 8px;
                padding: 8px;
                box-shadow: 1px 2px 2px 1px $border;
                @media screen and (max-width: $md-breakpoint) {
                  width: 80%;
                }

                .order-date {
                  width: 100%;
                  p {
                    @include text-style(14, $secondary);
                    text-align: center;
                  }

                  h3 {
                    @include text-style(16, $primary);
                    text-align: center;
                    font-weight: bolder;
                    margin-bottom: 28px;
                  }
                }
              }

              .box2 {
                margin-top: 40px;
              }

              .no-deliver,
              .no-deliver2 {
                display: flex;
                justify-content: center;
                /* background-color: $background;
                /* box-shadow: none; */
                /* border: 2px solid $tertiary; */
                flex-direction: column;
                padding: 16px auto;
                p {
                  @include text-style(14, $primary);
                  text-align: center;
                  margin: 16px auto;
                }

                button {
                  background-color: $blue-light;
                  color: $white;
                  width: 184px;
                  margin: auto;

                  &:hover {
                    background-color: #ebb456;
                    color: white;
                    opacity: 0.8;
                  }
                }
              }

              .no-deliver2 {
                margin-top: 16px;
              }

              .progressbar {
                counter-reset: step;
              }

              .progressbar li {
                @include text-style(14, $secondary);
                float: left;
                width: 33.33%;
                position: relative;
                text-align: center;
              }

              .progressbar li:before {
                content: counter(step);
                counter-increment: step;
                width: 30px;
                height: 30px;
                border: 2px solid #bebebe;
                display: block;
                margin: 0 auto 10px auto;
                border-radius: 50%;
                line-height: 27px;
                background: white;
                color: #bebebe;
                text-align: center;
                font-weight: bold;
              }

              .progressbar li:after {
                content: "";
                position: absolute;
                width: 100%;
                height: 3px;
                background: #979797;
                top: 15px;
                left: -50%;
                z-index: -1;
              }

              .progressbar li.active:before {
                border-color: $blue-light;
                background: $blue-light;
                color: white;
              }

              .progressbar li.active:after {
                background: $blue-light;
              }

              /* .progressbar li.active + li:after{
                background: $blue;
              }
              .progressbar li.active + li:before{
                border-color: $blue;
                background: $blue;
                color: white
              } 
              */
              .progressbar li:first-child:after {
                content: none;
              }
            }
          }
        }

        table {
          @include text-style(18, $primary);
          margin: 16px;
          padding-left: 64px;
          width: 600px;
          border-spacing: 0 16px;
          @media screen and (max-width: $md-breakpoint - 1px) {
            @include text-style(14, $primary);
            padding-left: 0;
            width: 270px;
            margin-left: 30px;
            border-spacing: 0 8px;
          }

          label {
            @include text-style(18, $primary);
            font-weight: bold;
            @media screen and (max-width: $md-breakpoint) {
              @include text-style(16, $primary);
            }
          }

          tr {
            .head {
              color: $secondary;
            }
          }

          .boxx {
            padding-top: 10px;
            @media screen and (max-width: $md-breakpoint) {
              padding-top: 5px;
            }
          }

          tr {
            margin-bottom: 8px;
          }
        }
      }

      .result-list {
        display: flex;
        width: 100%;
      }
    }

    .main {
      /* padding-top: 16px; */
      /* width: 100%; */
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .partition {
        /* margin-top: 32px; */
        border: 0.15px solid $border;
        width: 100%;
        height: 0.3px;
      }

      .part {
        width: 100%;
        flex-grow: 1;
        position: relative;
        /* background-color: $white;
        margin-bottom: 8px; */

        p {
          text-align: center;
          padding: 44px;
          @include text-style(16, $primary);
          @media screen and (max-width: 540px) {
            padding: 28px 0;
            @include text-style(14, $primary);
          }
        }
        button {
          width: 200px;
          /* margin-bottom: 16px; */
          position: absolute;
          bottom: 0%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .others {
    display: flex;
    .delete-account {
      @include text-style(13, $tertiary);
      text-decoration: underline;
    }
  }

  .postcode-search {
    position: absolute;
    left: 30%;
    top: 65%;
    @media screen and (max-width: $md-breakpoint - 1) {
      /* margin-left: ; */
      position: absolute;
      left: 0%;
    }
  }

  input {
    width: 300px;

    @media screen and (max-width: $md-breakpoint - 1) {
      width: 150px;
    }
  }

  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type="checkbox"],
    input[type="radio"] {
      --active: #feba27;
      --active-inner: #fff;
      --focus: 2px rgba(221, 139, 16, 0.3);
      --border: #e1d4bb;
      --border-hover: #e49825;
      --background: #fff;
      --disabled: #f6f8ff;
      --disabled-inner: #e1e6f9;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 21px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      &:after {
        content: "";
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
      }
      &:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: 0.3s;
        --d-t: 0.6s;
        --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
      }
      &:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: 0.9;
        &:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }
        & + label {
          cursor: not-allowed;
        }
      }
      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            --bc: var(--border-hover);
          }
        }
      }
      &:focus {
        box-shadow: 0 0 0 var(--focus);
      }
      &:not(.switch) {
        width: 21px;
        &:after {
          opacity: var(--o, 0);
        }
        &:checked {
          --o: 1;
        }
      }
      & + label {
        font-size: 14px;
        line-height: 21px;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        margin-left: 4px;
      }
    }
    input[type="checkbox"] {
      &:not(.switch) {
        border-radius: 7px;
        &:after {
          width: 5px;
          height: 9px;
          border: 2px solid var(--active-inner);
          border-top: 0;
          border-left: 0;
          left: 7px;
          top: 4px;
          transform: rotate(var(--r, 20deg));
        }
        &:checked {
          --r: 43deg;
        }
      }
      &.switch {
        width: 38px;
        border-radius: 11px;
        &:after {
          left: 2px;
          top: 2px;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          background: var(--ab, var(--border));
          transform: translateX(var(--x, 0));
        }
        &:checked {
          --ab: var(--active-inner);
          --x: 17px;
        }
        &:disabled {
          &:not(:checked) {
            &:after {
              opacity: 0.6;
            }
          }
        }
      }
    }
    input[type="radio"] {
      border-radius: 50%;
      &:after {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: var(--active-inner);
        opacity: 0;
        transform: scale(var(--s, 0.7));
      }
      &:checked {
        --s: 0.5;
      }
    }
  }

  /* 
		ul {
		margin: 12px;
		padding: 0;
		list-style: none;
		width: 100%;
		max-width: 320px;
		li {
				margin: 16px 0;
				position: relative;
		}
		} */

  * {
    box-sizing: inherit;
    &:before,
    &:after {
      box-sizing: inherit;
    }
  }
  /* checkbox, radiobutton custom end */

  input[type="checkbox"],
  input[type="radio"] {
    & + label {
      @include text-style(16, $primary);

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(14, $primary);
      }
    }
  }
}
</style>

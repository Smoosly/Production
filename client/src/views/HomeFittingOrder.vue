<template>
  <div class="body">
    <form @submit.prevent="submitForm">
      <h2 data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000">홈 피팅 서비스 신청하기&nbsp;<i class="fas fa-truck"></i></h2>
      <p data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000">
        {{ username }}님 홈 피팅 서비스 제품들을 배송 받을 주소를 입력해 주세요.
        <br />
        상세주소까지 입력해주셔야 분실되지 않아요.
      </p>
      <br />
      <p v-if="!isRecom" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000">
        추천브라가 정해지지 않아 홈 피팅 서비스를 신청하실 수 없어요.
        <br />
        추천이 완료되면 알림을 보내드려요.
      </p>
      <div class="box">
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="postcode-container">
          <div class="input-group item">
            <input :disabled="address === ''? disabled : ''" class="form-input postcode" type="text" placeholder="우편번호" v-model="postcode" />
          </div>
          <button type="button" class="btn-primary btn-40 item" @click="execDaumPostcode">주소검색</button>
        </div>
        <p data-aos="fade-up" class="code-valid" v-if="postcode  && !isCodeValid">우편번호가 올바른지 확인해 주세요.</p>
      </div>
      <br />
      <div
        ref="searchWindow"
        :style="searchWindow"
        class="searchWindow-form"
        style="border: 1px solid; width: 100%; height: 350px; margin: 5px 0; position: relative; margin-bottom: 16px"
      >
        <img
          src="//t1.daumcdn.net/postcode/resource/images/close.png"
          id="btnFoldWrap"
          style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1"
          @click="searchWindow.display = 'none'"
          alt="close"
        />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <input :disabled="postcode === ''? disabled : ''" class="form-input" type="text" v-model="address" placeholder="주소" />
      </div>
      <br />
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <input :disabled="postcode === ''? disabled : ''" class="form-input" type="text" v-model="extraAddress" ref="extraAddress" placeholder="상세주소" />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <input :disabled="postcode === ''? disabled : ''" style="margin-top: 28px" class="form-input" type="text" v-model="message" placeholder="배송 요청사항" />
      </div>

      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <label for="phone">발송이 완료되면 메세지를 보내드려요!</label>
        <input style="margin-bottom: 16px" type="text" class="form-input" v-model="username" placeholder="받으실 분의 이름을 입력해주세요." />
        <input class="form-input" type="text" v-model="phone" @keyup="getPhoneMask(phone)" placeholder="받으실 분의 휴대폰 번호를 입력해주세요." />
      </div>

      <button
        v-bind:disabled="!isPhoneValid || postcode === '' || address === '' || extraAddress === '' || phone === '' || username === '' || !isRecom"
        type="submit"
        class="btn-outlined btn-40 order-btn"
      >
        홈 피팅 서비스 신청하기
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { validatePostcode } from '@/utils/validation';
// import { fetchUserData } from '@/api/index'

export default {
  data() {
    return {
      searchWindow: {
        display: "none",
        height: "300px",
      },
      postcode: "",
      address: "",
      extraAddress: "",
      phone: "",
      isPhoneValid: false,
      message: "",
      username: "",
      isRecom: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    execDaumPostcode() {
      const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      console.log("what");
      // eslint-disable-next-line
      new window.daum.Postcode({
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

      this.validatePhone(this.phone)

      return res;
    },

    async submitForm() {
      // 서버에서 동일하게 데이터 keys 목록 받는지 체크
      const homeFitting = {
        PK_ID: this.$store.state.PK_ID,
        recipient: this.username,
        phone: this.phone,
        postcode: this.postcode,
        address: this.address,
        extraAddress: this.extraAddress,
        message: this.message,
      };

      const result = await axios.post("/homeFitting/apply", homeFitting);
      console.log(result.data);
      if (result.data.success) {
        console.log(result.data.message);
        this.emitter.emit("showToast", result.data.message);
        this.emitter.emit("HomeOrderModal", true);
      } else {
        // console.log(result.data.message);
        this.emitter.emit("showRedToast", result.data.message);
      }
    },

    async fetchInfo() {
      const result = await axios.get("/users/getUserInfo");
      console.log(result.data);
      if (result.data.success) {
        this.username = result.data.userInfo.username;
        this.email = result.data.userInfo.email;
        this.phone = result.data.userInfo.phone;
        this.validatePhone(this.phone);
        this.postcode = result.data.userInfo.postcode;
        this.address = result.data.userInfo.address;
        this.extraAddress = result.data.userInfo.extraAddress;
        this.message = result.data.userInfo.message;
      } else {
        console.log(result.data.message);
      }
      
      if (this.phone !== '') {
        this.isPhoneValid = true
      } 
    },

    async checkRecom() {
      const result = await axios.get("/homeFitting/checkRecom");
      console.log(result.data);
      if (result.data.success) {
        if (result.data.isRecom) {
          this.isRecom = true;
        } else {
          console.log(result.data.message);
          this.isRecom = false;
        }
      } else {
        console.log(result.data.message);
      }
    },
    validatePhone(phone) {
      console.log(phone)
      let num = phone.split("-").join("");
      
      //1. 모두 숫자인지 체크
      const checkNum = Number.isInteger(Number(num));
      
      //2. 앞 세자리가 010으로 시작하는지 체크
      const checkStartNum = num.slice(0, 3) === '010' || num.slice(0, 3) === '011' ? true : false
      
      //3. 010을 제외한 나머지 숫자가 7 혹은 8자리인지 체크
      const checkLength = num.slice(3).length === 7 || num.slice(3).length === 8 ? true : false
      
      //4. 123 모두 true면 true를, 아니면 false를 반환
      this.isPhoneValid = checkNum && checkStartNum && checkLength ? true : false
    }
  },
  computed: {
    isCodeValid() {
      return validatePostcode(this.postcode)
    }
  },
  created() {
    this.fetchInfo();
    this.checkRecom();
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button):not(input[type="password"]) {
  font-family: $font-main, sans-serif !important;
}

.body {
  display: flex;
  /* flex-wrap: wrap; */
  background-color: $gray;
  justify-content: center;
  align-items: flex-start;
  /* height: 1200px; */
  padding: 24px 8px;
  height: auto;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 32px;

  @media screen and (max-width: $md-breakpoint - 1px) {
    /* height: 1200px; */
    height: auto;
  }

  form {
    padding: 24px;
    width: 50%;
    display: flex;
    border-radius: 8px;
    box-shadow: 1px 4px 4px 1px $border;
    flex-direction: column;
    background-color: $white;
    width: 500px;
    margin-top: 96px;
    @media screen and (max-width: $md-breakpoint - 1px) {
      width: 95%;
    }

    @media screen and (max-width: 320px) {
      padding: 24px 8px;
    }
    /* width: 90%; */
    /* @include responsive(); */
    /* @include responsive(); */
    /* @include responsive(); */

    h2 {
      @include text-style(24, $primary);
      margin-top: 16px;
      margin-bottom: 32px;
      font-weight: bold;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(18, $primary);
        margin-left: 8px;
        margin-top: 8px;
        margin-bottom: 16px;
      }

      i {
        color: $blue-light;
      }
    }

    p {
      @include text-style(16, $secondary);

      @media screen and (max-width: $md-breakpoint - 1px) {
        @include text-style(14, $secondary);
        margin-left: 8px;
      }
    }

    .code-valid {
      color: $red;
      font-size: 12px;
      margin: 6px 4px 0px 4px;
    }
  }

  .input-group {
    /* margin: 24px 0; */

    label {
      @include text-style(13, $primary);
      display: inline-block;
      /* font-weight: bold; */
      margin-top: 32px;
      margin-bottom: 4px;
      color: $green;
    }
  }

  .box {
    display: flex;
    flex-direction: column;

    .postcode-container {
      margin-top: 24px;
      display: flex;
      /* flex-direction: row; */
      /* justify-content: space-around; */

      .item {
        flex-grow: 1;
      }

      button {
        /* flex-grow: 1; */
        margin-left: 16px;
        width: 100px;
        @media screen and (max-width: 280px) {
          margin-left: 4px;
        }
      }
    }
  }
  /* 
  .searchWindow-form {
    @media screen and (max-width: 320px) {
      width: 250px;
    }
  } */

  .order-btn {
    margin-top: 32px;
    /* margin-bottom: 600px; */
  }
}
</style>

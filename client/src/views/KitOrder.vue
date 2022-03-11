<template>
  <div class="body">
    <form @submit.prevent="submitForm">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="notice">
        <h3>&nbsp;잠깐&nbsp;<i class="far fa-hand-paper"></i></h3>
        <p>가슴 테스트를 시작하기 전, 가슴 형태/부피를 정확히 측정 가능한 가슴 측정 키트를 무료 신청하세요.</p>
      </div>
      <h2 data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000">키트 신청하기&nbsp;<i class="fas fa-truck"></i></h2>
      <p data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000">
        {{ username }}님 키트를 배송 받을 주소를 입력해 주세요.
        <br />
        상세주소까지 입력해주셔야 분실되지 않아요.
      </p>
      <div class="box">
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="postcode-container">
          <div class="input-group item">
            <input :disabled="isSearching" class="form-input postcode" type="text" placeholder="우편번호" v-model="postcode" />
          </div>
          <button type="button" class="btn-primary btn-40 item" @click="execDaumPostcode">주소검색</button>
        </div>
        <p data-aos="fade-up" class="code-valid" v-if="postcode && !isCodeValid">우편번호가 올바른지 확인해 주세요.</p>
      </div>
      <br />
      <div ref="searchWindow" :style="searchWindow" class="searchWindow-form" style="border: 1px solid; width: 100%; height: 350px; margin: 5px 0; position: relative; margin-bottom: 16px">
        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1" @click="searchWindow.display = 'none'" alt="close" />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <input class="form-input" type="text" v-model="address" placeholder="주소" />
      </div>
      <br />
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <input class="form-input" type="text" style="cursor: pointer" v-model="extraAddress" ref="extraAddress" placeholder="상세주소(입력 필수)" />
      </div>
      <!-- <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <input class="form-input" type="text" style="margin-top: 28px" v-model="message" placeholder="배송 요청사항" />
      </div> -->

      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <label for="phone">키트가 발송되면 메세지를 보내드려요!</label>
        <input class="form-input" type="text" style="margin-bottom: 16px" v-model="recipient" placeholder="받으실 분의 이름을 입력해주세요." />
        <input class="form-input" type="text" v-model="phone" @keyup="getPhoneMask(phone)" placeholder="받으실 분의 휴대폰 번호를 입력해주세요." />
      </div>

      <!-- <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <label for="coupon">쿠폰 코드</label>
        <input class="form-input" type="text" placeholder="쿠폰 코드" v-model="couponCode" />
      </div> -->

      <button v-bind:disabled="!isCodeValid || extraAddress === '' || phone === '' || !isPhoneValid" type="submit" class="btn-outlined btn-40 order-btn">키트 신청하기</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { validatePostcode } from '@/utils/validation';
import { deleteCookie } from '@/utils/cookies';
// import { checkAuth } from '@/utils/loginAuth';
// import { fetchUserData } from '@/api/index'

export default {
  data() {
    return {
      searchWindow: {
        display: 'none',
        height: '300px',
      },
      isSearching: false,
      postcode: '',
      address: '',
      extraAddress: '',
      phone: '',
      isPhoneValid: false,

      username: '',
      recipient: '',
      // couponCode: "",
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    execDaumPostcode() {
      this.isSearching = true;
      const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      new window.daum.Postcode({
        onComplete: (data) => {
          if (data.userSelectedType === 'R') {
            this.address = data.roadAddress;
          } else {
            this.address = data.jibunAddress;
          }
          if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              // this.extraAddress = data.bname;
              this.address += `${data.bname}`;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
              // this.extraAddress += this.extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
              this.address += `${data.buildingName}`;
              // console.log(this.extraAddress)
            }
            // if (this.extraAddress !== "") {
            //   this.extraAddress = ` (${this.extraAddress})`;
            // }
          } else {
            this.extraAddress = '';
            console.log(this.extraAddress);
          }
          this.postcode = data.zonecode;
          this.$refs.extraAddress.focus();
          this.searchWindow.display = 'none';
          document.body.scrollTop = currentScroll;
          this.isSearching = false;
        },
        onResize: (size) => {
          this.searchWindow.height = `${size.height}px`;
        },
        width: '100%',
        height: '100%',
      }).embed(this.$refs.searchWindow);
      this.searchWindow.display = 'block';
    },
    getPhoneMask(val) {
      let res = this.getMask(val);
      this.phone = res;
      //서버 전송 값에는 '-' 를 제외하고 숫자만 저장
      // this.model.contact = this.contact.replace(/[^0-9]/g, '')
    },
    getMask(phoneNumber) {
      if (!phoneNumber) return phoneNumber;
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

      let res = '';
      if (phoneNumber.length < 3) {
        res = phoneNumber;
      } else {
        if (phoneNumber.substr(0, 2) == '02') {
          if (phoneNumber.length <= 5) {
            //02-123-5678
            res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3);
          } else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {
            //02-123-5678
            res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3) + '-' + phoneNumber.substr(5);
          } else if (phoneNumber.length > 9) {
            //02-1234-5678
            res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 4) + '-' + phoneNumber.substr(6);
          }
        } else {
          if (phoneNumber.length < 8) {
            res = phoneNumber;
          } else if (phoneNumber.length == 8) {
            res = phoneNumber.substr(0, 4) + '-' + phoneNumber.substr(4);
          } else if (phoneNumber.length == 9) {
            res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6);
          } else if (phoneNumber.length == 10) {
            res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6);
          } else if (phoneNumber.length > 10) {
            //010-1234-5678
            res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7);
          }
        }
      }

      this.validatePhone(this.phone);

      return res;
    },

    async submitForm() {
      if (!this.recipient || !this.postcode || !this.address || !this.extraAddress || !this.phone) {
        this.emitter.emit('showRedToast', '입력하지 않은 항목이 있습니다.');
        return;
      }
      const kitData = {
        // PK_ID: this.$store.state.PK_ID,
        recipient: this.recipient,
        postcode: this.postcode,
        address: this.address,
        extraAddress: this.extraAddress,
        phone: this.phone,
        // couponCode: this.couponCode,
      };
      const result = await axios.post('/kits/request', kitData);
      console.log(result.data);
      if (result.data.success) {
        console.log(result.data.message);
        this.emitter.emit('KitCompleteModal', true);
      } else {
        console.log(result.data.message);
        this.emitter.emit('showNoticeToast', result.data.message);
        this.emitter.emit('ServiceNotOpenModal', true);
      }
    },
    async fetchInfo() {
      const result = await axios.get('/users/getUserInfo');
      console.log(result.data);
      if (result.data.success) {
        this.username = result.data.userInfo.username;
        this.recipient = result.data.userInfo.username;
        this.email = result.data.userInfo.email;
        this.phone = result.data.userInfo.phone;
        this.postcode = result.data.userInfo.postcode;
        this.address = result.data.userInfo.address;
        this.extraAddress = result.data.userInfo.extraAddress;
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
      }

      if (this.phone !== '') {
        this.isPhoneValid = true;
      }
      // checkAuth(result.data)
    },
    validatePhone(phone) {
      console.log(phone);
      let num = phone.split('-').join('');

      //1. 모두 숫자인지 체크
      const checkNum = Number.isInteger(Number(num));

      //2. 앞 세자리가 010으로 시작하는지 체크
      const checkStartNum = num.slice(0, 3) === '010' || num.slice(0, 3) === '011' ? true : false;

      //3. 010을 제외한 나머지 숫자가 7 혹은 8자리인지 체크
      const checkLength = num.slice(3).length === 7 || num.slice(3).length === 8 ? true : false;

      //4. 123 모두 true면 true를, 아니면 false를 반환
      this.isPhoneValid = checkNum && checkStartNum && checkLength ? true : false;
    },
  },
  computed: {
    isCodeValid() {
      return validatePostcode(this.postcode);
    },
  },
  created() {
    this.fetchInfo();
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button):not(input[type='password']) {
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

    .notice {
      background-color: rgb(255, 243, 243);
      border-radius: 8px;
      margin-bottom: 8px;
      padding: 16px 8px;
      h3 {
        @include text-style(18, $red);
        display: flex;
        align-items: center;
        font-weight: 600;
        margin-left: 4px;

        @media screen and (max-width: $md-breakpoint) {
          @include text-style(16, $red);
        }
      }

      p {
        @include text-style(16, $red);
        margin-left: 0;
        padding: 8px;
        @media screen and (max-width: $md-breakpoint) {
          @include text-style(14, $red);
        }
      }
    }

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

  .order-btn {
    margin-top: 32px;
    /* margin-bottom: 600px; */
  }
}
</style>

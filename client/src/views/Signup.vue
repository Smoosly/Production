<template>
  <div class="body">
    <div class="form">
      <form @submit.prevent="submitForm" >
        <h2 data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="title"><span>스무슬리</span>에 오신걸 환영합니다!</h2>
        <p data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000">처음 방문하셨다면 아래 폼을 입력해 스무슬리에 가입해 주세요.</p>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="sns-login">
          <div class="sns-wrapper">
            <div class="login-title">
              <span class="sns-login-label">SNS로 간편 회원가입</span>
            </div>

            <ul class="sns-list">
              <li class="sns-item">
                <a href="https://smoosly.com/auth/kakao">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256">
                    <path
                      fill="#FFE812"
                      d="M256 236c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0h216c11.046 0 20 8.954 20 20v216z"
                    />
                    <path
                      d="M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-10.237 35.344-10.581 37.689 0 0-.207 1.762.934 2.434s2.483.15 2.483.15c3.272-.457 37.943-24.811 43.944-29.04 5.995.849 12.168 1.29 18.472 1.29 57.438 0 104-36.712 104-82 0-45.287-46.562-82-104-82z"
                    />
                    <path
                      fill="#FFE812"
                      d="M70.5 146.625c-3.309 0-6-2.57-6-5.73V105.25h-9.362c-3.247 0-5.888-2.636-5.888-5.875s2.642-5.875 5.888-5.875h30.724c3.247 0 5.888 2.636 5.888 5.875s-2.642 5.875-5.888 5.875H76.5v35.645c0 3.16-2.691 5.73-6 5.73zM123.112 146.547c-2.502 0-4.416-1.016-4.993-2.65l-2.971-7.778-18.296-.001-2.973 7.783c-.575 1.631-2.488 2.646-4.99 2.646a9.155 9.155 0 0 1-3.814-.828c-1.654-.763-3.244-2.861-1.422-8.52l14.352-37.776c1.011-2.873 4.082-5.833 7.99-5.922 3.919.088 6.99 3.049 8.003 5.928l14.346 37.759c1.826 5.672.236 7.771-1.418 8.532a9.176 9.176 0 0 1-3.814.827c-.001 0 0 0 0 0zm-11.119-21.056L106 108.466l-5.993 17.025h11.986zM138 145.75c-3.171 0-5.75-2.468-5.75-5.5V99.5c0-3.309 2.748-6 6.125-6s6.125 2.691 6.125 6v35.25h12.75c3.171 0 5.75 2.468 5.75 5.5s-2.579 5.5-5.75 5.5H138zM171.334 146.547c-3.309 0-6-2.691-6-6V99.5c0-3.309 2.691-6 6-6s6 2.691 6 6v12.896l16.74-16.74c.861-.861 2.044-1.335 3.328-1.335 1.498 0 3.002.646 4.129 1.772 1.051 1.05 1.678 2.401 1.764 3.804.087 1.415-.384 2.712-1.324 3.653l-13.673 13.671 14.769 19.566a5.951 5.951 0 0 1 1.152 4.445 5.956 5.956 0 0 1-2.328 3.957 5.94 5.94 0 0 1-3.609 1.211 5.953 5.953 0 0 1-4.793-2.385l-14.071-18.644-2.082 2.082v13.091a6.01 6.01 0 0 1-6.002 6.003z"
                    />
                  </svg>
                </a>
              </li>
              <!-- <li class="sns-item">
                <a href="https://smoosly.com/auth/naver">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="48px"
                    height="48px"
                    viewBox="0 0 48 48"
                    enable-background="new 0 0 48 48"
                    xml:space="preserve"
                  >
                    <image
                      id="image0"
                      width="48"
                      height="48"
                      x="0"
                      y="0"
                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                    AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABC1BMVEUAwwAAwwAAwwAAwwAA
                                    wwAAwwAAwwAAwwAAwwAAwwAAwwAAwwAAwwAAwwAAwwAAwwAAwwAAwwAAwwADxAMFxAUBwwEExAR7
                                    4Hu07bSx7bGn6qcvzi8AwgArzSuq66q17rX///+y7bIOxg4/0j/5/vn9/v1233Y+0j71/fXo+ui/
                                    8L8WyBaG44YCwwLw+/BM1UzM88weyh6W5pY90T32/fZX11c70TvY9tj+//7U9dRn22fy/PJp3GnN
                                    883a9tr4/fhD00NN1U1G00aM5IxG1EYZyRnE8cTr+ut84HwRxxG37rc20Dbj+ONs3Wz7/vv8/vxH
                                    1EcLxguo66ir66up66mk6qQuzi4ozCie6J75lbftAAAAEnRSTlNg5edk1Nrq8enw0tha3/n44F8Z
                                    Sm81AAAAAWJLR0Qgs2s9gAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+ULCAIoNTBTh4gA
                                    AAENSURBVEjH7dZZU8IwFAXgoOCKFW9sQY0SEIsLdQVFUQEVXMEFt///SyQpDzBjpzlvfeC8ZM5M
                                    vklebiaMxQjIxCSLI/uJEmwKA9NsBgOzYxBFwJdV+KDZzkj9B/B0ZqWf1TWhmljfUC2T5oHAyUqd
                                    XF6DzYJuWScY5Hyw5WpQ3PZ5OJA7RYEBubsHAlnyQLB/IDAgD49AII+9EwyUK6emoHBWVcv5Rc0Q
                                    lC+v9HpdNwT1RrM2dDcDcEO3GLgTrTZ2ghCNewwQPVRB8PgEAvH8ggGiTjcc+CP6+qbB+4cMG1Hu
                                    9j77+fr2H4GfX9V6bvAjQLanM1ptCgbhGYOoAPjrMIeBeZZcsBaNY6WW/gDVdsHqNzHG1wAAACV0
                                    RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMS0wOFQwMjo0MDo1MyswMDowMHOv9FMAAAAldEVYdGRhdGU6
                                    bW9kaWZ5ADIwMjEtMTEtMDhUMDI6NDA6NTMrMDA6MDAC8kzvAAAAAElFTkSuQmCC"
                    />
                  </svg>
                </a>
              </li> -->
              <li class="sns-item">
                <a href="https://smoosly.com/auth/google">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                    <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                    <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
                    <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- <hr> -->
        <span data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="direct-signup-label"> 스무슬리로 직접 회원가입 </span>
        <!-- <label for="email">이메일</label> -->
        <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group email-certi">
          <div class="input-container" style="display: flex; align-items: center">
            <div class="email-box item" style="margin-right: 8px">
              <label for="email">이메일&nbsp;<span>*</span></label>
              <input type="email" class="form-input" placeholder="이메일" v-model="email" />
            </div>

            <button
              v-if="!isMailCertified"
              v-bind:disabled="!isEmailValid || !canSend"
              @click="sendEmail"
              type="button"
              class="btn-primary btn-40 item"
              style="margin-top: 28px"
            >
              전송하기
            </button>
            <br />
          </div>

          <!-- 인증번호 유효검사 추가 disabled 처리 -->
          <p class="email-valid" v-if="email && !isEmailValid">이메일 형식이 올바른지 확인해주세요.</p>
          <p class="email-sent" v-if="isMailSent">인증메일이 발송되었습니다.</p>
          <p class="joined-mail" v-if="showMessage">{{ message }}</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="1000"
          v-if="!isMailCertified"
          style="display: flex; align-items: center"
          class="input-group email-certi"
        >
          <!-- <label for="certificateNum">이메일</label> -->
          <input type="text" class="form-input" placeholder="인증번호 입력" v-model="certificateNum" v-if="timerShown" />
          <!-- 인증번호 틀렸을 때 틀렸다고 알려주기!!! -->
          <!-- 인증번호 전송 버튼 누르면 카운트다운 시작하게 연결 -->
          <p v-if="timerShown" class="certi-valid">
            &nbsp;&nbsp;<strong>{{ minutes }}</strong
            ><strong>:</strong><strong>{{ seconds }}</strong>
          </p>
        </div>
        <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="container-button email-container-button">
          <button v-if="!isMailCertified" v-bind:disabled="!isEmailValid" @click="emailAuth" type="button" class="btn-outlined btn-48">이메일 인증하기</button>
          <button disabled v-if="isMailCertified" type="button" class="btn-outlined btn-48">인증 완료</button>
        </div>

        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
          <label for="password">비밀번호&nbsp;<span>*</span></label>
          <div class="pw-input">
            <input :type="passwordType" class="form-input" autocomplete="on" placeholder="비밀번호(6자 이상)" v-model="password" />
            <i v-if="passwordType === 'text'" @click="isHidden" class="fas fa-eye"></i>
            <i v-if="passwordType === 'password'" @click="isHidden" class="fas fa-eye-slash"></i>
          </div>
          <p class="pw-valid" v-if="!isPasswordValid">비밀번호는 숫자, 영문을 사용해 6자이상 입력해주세요.</p>
        </div>

        <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
          <label for="password">비밀번호 확인</label>
          <div class="pw-input">
            <input :type="passwordType2" class="form-input" autocomplete="on" placeholder="" v-model="passwordCheck" />
            <i v-if="passwordType2 === 'text'" @click="isHidden2" class="fas fa-eye"></i>
            <i v-if="passwordType2 === 'password'" @click="isHidden2" class="fas fa-eye-slash"></i>
          </div>
          <p class="pw-valid" v-if="passwordCheck && passwordCheck !== password">비밀번호가 일치하지 않습니다.</p>
        </div>

        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
          <label for="name">이름&nbsp;<span>*</span></label>
          <input type="text" class="form-input" placeholder="이름" v-model="username" />
          <p class="name-valid" v-if="!isNameValid">이름은 한글, 영문만 가능합니다.</p>
        </div>

        <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="agreement">
          <div class="box" style="display: flex; align-items: center; margin-bottom: 8px">
            <label for="check"> 개인정보 수집 이용동의 <span>(필수)&nbsp;&nbsp;</span></label>
            <input type="checkbox" v-model="agreeInfo" id="check" />
          </div>
          <a href="https://discreet-puck-4be.notion.site/0d96757d00884e02987f1a021f532c87" target="_blank">이용약관</a> |
          <a href="https://discreet-puck-4be.notion.site/4e2a2e6c1ae740c0b6da1e88d141c8c8" target="_blank">개인정보 처리방침</a>
          <br />
          <div class="sms-agreement">
            <div class="box" style="display: flex; align-items: center">
              <label for="">스무슬리 혜택 알림받기&nbsp;&nbsp;</label>
              <input type="checkbox" v-model="agreePromotion" />
            </div>
            <p>스무슬리 혜택 알림에 동의하시면 이벤트 등 다양한 혜택 정보를 받아보실 수 있습니다.</p>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="container-button">
          <button v-bind:disabled="!isPasswordValid || !isNameValid || !agreeInfo" type="submit" class="btn-primary btn-48">회원가입하기</button>
        </div>
        <p data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="goto-login">
          이미 아이디가 있으신가요?&nbsp;
          <a @click="login">로그인</a>
        </p>
        <p>{{ logMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { validateEmail, validatePW, validateName } from "@/utils/validation";
// import { registerUser } from "@/api/auth";
import axios from "axios";

export default {
  created() {
    if (this.$route.query.code) {
      this.setKakaoToken();
    }

    window.onSignIn = this.onSignIn;
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      showMessage: false,
      message: "",
      canSend: false,

      isMailSent: false,
      isMailCertified: false,
      certificateNum: "",

      passwordType: "password",
      passwordType2: "password",
      passwordCheck: "",
      email: "",
      password: "",
      username: "",
      agreeInfo: false,
      agreePromotion: false,
      logMessage: "",
      
      isFocused: false,
      total: "",
      minutes: "--",
      seconds: "--",
      interval: 0,
      timerShown: false,
    };
  },
  components: {},
  watch: {
    email(newVal) {
      if (this.isEmailValid) {
        axios.post("/users/checkUser", { email: newVal })
          .then((result) => {
            console.log(result.data);
            if (result.data.success) {
              this.showMessage = true;
              if (result.data.provider === null) {
                this.message = "가입 가능한 메일입니다.";
                this.canSend = true;
                return;
              }
              if (result.data.provider === "smoosly") {
                this.message = result.data.message;
                this.canSend = false;
                return;
              }
              this.canSend = true;
              this.message = result.data.message;
            }
          })
          .catch(console.log);
      } else {
        this.showMessage = false;
      }
    },
  },
  computed: {
    isEmailValid() {
      return validateEmail(this.email);
    },
    isPasswordValid() {
      return validatePW(this.password);
    },
    isNameValid() {
      return validateName(this.username);
    },
  },
  methods: {
    login() {
      this.emitter.emit("loginModal", true);
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

    isHidden() {
      this.passwordType = this.passwordType === "password" ? "text" : "password";
    },
    isHidden2() {
      this.passwordType2 = this.passwordType2 === "password" ? "text" : "password";
    },

    async submitForm() {
      const userData = {
        email: this.email,
        password: this.password,
        username: this.username,
        agreePromotion: this.agreePromotion,
      };
      // const { data } = await registerUser(userData);
      const { data } = await axios.post("/users/signup", userData)
      console.log(data);
      if (!data.success) {
        this.logMessage = data.message;
        // this.initForm();
        return this.emitter.emit("showRedToast", this.logMessage);
      }
      this.initForm();
      this.$router.push("/");
      this.logMessage = data.message;
      this.emitter.emit("showToast", this.logMessage);
      this.emitter.emit("loginModal", true);
    },
    initForm() {
      this.username = "";
      this.password = "";
      this.email = "";
    },
    sendEmail() {
      this.showMessage = false;
      this.timerShown = true;
      this.isMailSent = true;
      this.isMailCertified = false;
      this.certificateNum = "";
      this.TimerSet();
      axios.post("/emailAuth/sendEmail", { email: this.email })
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            console.log(result.data.message);
          } else {
            this.showMessage = true;
            this.message = result.data.message
            this.timerShown = false;
            this.isMailSent = false;
            this.isMailCertified = false;
            this.certificateNum = "";
          }
        })
        .catch(console.log);
    },
    emailAuth() {
      axios.post("/emailAuth/checkAuthNum", { authNum: this.certificateNum, email: this.email })
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            console.log(result.data.message);
            this.showMessage = false;
            this.isMailSent = false;
            this.isMailCertified = true;
          } else {
            return this.emitter.emit("showRedToast", result.data.message);
          }
        })
        .catch(console.log);
    },
    str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    },
    tick() {
      let minutes = Math.floor(this.total / 60);
      let seconds = this.total - minutes * 60;
      this.minutes = this.str_pad_left(minutes, "0", 2);
      this.seconds = this.str_pad_left(seconds, "0", 2);

      if (this.total <= 0) {
        clearInterval(this.interval);
        this.timerShown = false;
        //다시 이메일 인증 유도
        this.isMailSent = false;
        this.isMailCertified = false;
      }
      this.total -= 1;
    },
    TimerSet() {
      this.timerShown = true;
      this.total = 180;
      this.interval = setInterval(() => {
        this.tick();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button):not(input[type="password"]) {
  font-family: $font-main, sans-serif !important;
}

.body {
  background-color: $gray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1400px;
}

.form {
  display: flex;
  /* flex-direction: column; */
  background-color: $white;
  border-radius: 8px;
  box-shadow: 1px 4px 4px 1px $border;
  justify-content: center;
  align-items: flex-start;
  height: 1200px;
  width: 500px;
  margin: 0 auto;

  @media screen and (max-width: $md-breakpoint) {
    width: 95%;
  }

  form {
    /* margin: 40px auto; */
    @media screen and (max-width: $md-breakpoint - 1px) {
      width: 90%;
    }
    /* width: 90%; */
    /* @include responsive(); */
  }

  h2 {
    @include text-style(24, $primary);
    margin-top: 32px;
    font-weight: 600;
    @media screen and (max-width: $md-breakpoint) {
      @include text-style(18, $primary);
      padding: 0px 10px;
    }

    span {
      color: $blue;
      font-weight: bold;
    }
  }

  p {
    @include text-style(14, $primary);
    margin-top: 8px;
    margin-bottom: 32px;

    @media screen and (max-width: $md-breakpoint) {
      @include text-style(14, $primary);
      padding: 0px 10px;
      /* margin-top: 0px; */
    }
  }

  .direct-signup-label {
    display: flex;
    align-items: center;
    justify-content: center;
    @include text-style(14, $secondary);
  }

  .sns-login {
    display: flex;
    margin: 16px 0;
    align-items: center;
    justify-content: center;

    .sns-login-label {
      display: flex;
      align-items: center;
      justify-content: center;
      @include text-style(14, $secondary);
    }

    .sns-list {
      margin-bottom: 16px;
      padding: 8px;
      display: flex;
      align-items: space-around;

      .sns-item {
        position: relative;
        margin-left: 16px;

        img {
          width: 48px;
          height: 48px;
        }

        &:hover {
          opacity: 0.5;
        }
      }
    }
  }

  .group {
    display: flex;
  }

  .pw-input {
    position: relative;
    /* align-items: center;
      justify-content: center; */
    i {
      cursor: pointer;
      position: absolute;
      @include pos-center-y;
      margin-left: auto;
      left: 90%;
      font-size: 18px;
      color: $secondary;
    }
  }

  .input-group {
    margin: 16px 0;

    label {
      @include text-style(16, $primary);
      display: inline-block;
      font-weight: bold;
      margin-bottom: 4px;

      span {
        color: $red;
      }
    }
  }

  .email-certi {
    margin: 0px;
  }

  .input-container {
    display: flex;

    button {
      width: 100px;
    }
    .item {
      flex-grow: 1;
    }
  }

  .agreement span {
    color: $blue;
  }

  .areement label {
    margin-bottom: 16px;
  }

  .agreement {
    margin-top: 32px;
    a {
      @include text-style(13, $secondary);
      /* font-size: 14px; */

      &:hover {
        color: $tertiary;
      }
    }
  }

  .sms-agreement {
    margin-top: 16px;
  }

  .sms-agreement p {
    margin-top: 8px;
    color: $tertiary;
    font-size: 12px;
  }

  .name-valid,
  .phone-valid,
  .pw-valid,
  .email-valid,
  .certi-valid {
    color: $red;
    font-size: 12px;
    margin: 6px 4px 0px 4px;
  }

  .certi-valid {
    /* margin-top: 32px; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .email-sent {
    font-size: 12px;
    margin: 6px 4px 0px 4px;
    @include text-style(12, $secondary);
  }

  .joined-mail {
    font-size: 12px;
    margin: 6px 4px 0px 4px;
    @include text-style(12, $red);
  }

  .goto-login {
    @include text-style(16, $secondary);

    display: flex;
    align-items: center;
    justify-content: center;

    a {
      @include text-style(16, $primary);
      text-decoration: underline;

      &:hover {
        color: $tertiary;
      }
    }
  }

  .container-button {
    display: flex;

    button {
      width: 100%;
      margin: 16px auto;
    }
  }

  ::placeholder {
    font-family: "NanumSquare", sans-serif;
    opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: "NanumSquare", sans-serif;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    font-family: "NanumSquare", sans-serif;
  }

  /* checkbox, radiobutton custom */
  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type="checkbox"],
    input[type="radio"] {
      --active: #feba27;
      --active-inner: #fff;
      --focus: 2px rgba(221, 139, 16, 0.3);
      --border: #bbc1e1;
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

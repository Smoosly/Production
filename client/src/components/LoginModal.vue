<template>
  <transition name="modal" appear>
    <form @submit.prevent="submitForm" class="modal">
      <div data-aos="zoom-out-up" data-aos-anchor-placement="top-bottom" data-aos-duration="250" class="modal__window">
        <span class="close_button" @click="close">
          <i class="fas fa-times"></i>
        </span>
        <span class="header_logo">
          <img src="@/assets/smoosly_mix_main_4x.png" alt="" />
          <!-- <svg width="86" height="22" viewBox="0 0 86 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.496 6.872C9.168 6.872 9.792 7 10.368 7.256C10.96 7.512 11.464 7.872 11.88 8.336C12.312 8.784 12.64 9.328 12.864 9.968C13.104 10.592 13.224 11.28 13.224 12.032C13.224 12.736 13.112 13.392 12.888 14C12.68 14.608 12.376 15.136 11.976 15.584C11.576 16.016 11.104 16.36 10.56 16.616C10.016 16.872 9.408 17 8.736 17H1.296V13.976H7.872C8.192 13.976 8.496 13.936 8.784 13.856C9.088 13.776 9.344 13.656 9.552 13.496C9.76 13.336 9.928 13.136 10.056 12.896C10.184 12.656 10.248 12.368 10.248 12.032C10.248 11.408 10.04 10.92 9.624 10.568C9.224 10.216 8.72 10.04 8.112 10.04H6.168C5.352 10.04 4.608 9.952 3.936 9.776C3.264 9.6 2.696 9.32 2.232 8.936C1.768 8.552 1.408 8.056 1.152 7.448C0.896 6.84 0.768 6.112 0.768 5.264C0.768 4.672 0.872 4.096 1.08 3.536C1.288 2.976 1.576 2.488 1.944 2.072C2.312 1.64 2.76 1.296 3.288 1.04C3.816 0.783999 4.4 0.655999 5.04 0.655999H11.784V3.848H6.288C5.968 3.848 5.672 3.872 5.4 3.92C5.128 3.952 4.888 4.024 4.68 4.136C4.472 4.232 4.312 4.384 4.2 4.592C4.088 4.8 4.032 5.08 4.032 5.432C4.032 5.832 4.168 6.176 4.44 6.464C4.712 6.736 5.08 6.872 5.544 6.872H8.496ZM27.6722 7.52C27.2562 7.52 26.9202 7.576 26.6642 7.688C26.4082 7.784 26.2082 7.92 26.0642 8.096C25.9362 8.272 25.8482 8.48 25.8002 8.72C25.7522 8.96 25.7282 9.224 25.7282 9.512V17H22.9202V9.536C22.9202 9.248 22.8962 8.984 22.8482 8.744C22.8002 8.488 22.7042 8.272 22.5602 8.096C22.4322 7.92 22.2402 7.784 21.9842 7.688C21.7282 7.576 21.3842 7.52 20.9522 7.52H20.3762C19.9602 7.52 19.6162 7.576 19.3442 7.688C19.0882 7.784 18.8882 7.92 18.7442 8.096C18.6002 8.272 18.4962 8.488 18.4322 8.744C18.3842 8.984 18.3602 9.248 18.3602 9.536V17H15.5522V4.784H18.3602V5.144C18.9842 4.904 19.6482 4.784 20.3522 4.784H21.4082C22.0482 4.784 22.6162 4.88 23.1122 5.072C23.6082 5.264 24.0322 5.528 24.3842 5.864C24.7682 5.528 25.2162 5.264 25.7282 5.072C26.2402 4.88 26.8162 4.784 27.4562 4.784H28.7042C29.4082 4.784 30.0322 4.904 30.5762 5.144C31.1202 5.384 31.5682 5.704 31.9202 6.104C32.2882 6.488 32.5602 6.936 32.7362 7.448C32.9282 7.944 33.0242 8.448 33.0242 8.96V17H30.2402V9.536C30.2402 9.248 30.2162 8.984 30.1682 8.744C30.1202 8.488 30.0242 8.272 29.8802 8.096C29.7362 7.92 29.5362 7.784 29.2802 7.688C29.0242 7.576 28.6882 7.52 28.2722 7.52H27.6722ZM40.4974 4.784C41.2014 4.784 41.8254 4.896 42.3694 5.12C42.9294 5.328 43.4014 5.624 43.7854 6.008C44.1854 6.392 44.4894 6.856 44.6974 7.4C44.9054 7.944 45.0094 8.56 45.0094 9.248V12.536C45.0094 13.208 44.9054 13.824 44.6974 14.384C44.4894 14.928 44.1854 15.4 43.7854 15.8C43.4014 16.184 42.9294 16.48 42.3694 16.688C41.8254 16.896 41.2014 17 40.4974 17H39.5134C38.8254 17 38.2014 16.896 37.6414 16.688C37.0814 16.48 36.6014 16.184 36.2014 15.8C35.8174 15.4 35.5214 14.928 35.3134 14.384C35.1214 13.824 35.0254 13.208 35.0254 12.536V9.248C35.0254 8.56 35.1214 7.944 35.3134 7.4C35.5214 6.856 35.8174 6.392 36.2014 6.008C36.6014 5.624 37.0814 5.328 37.6414 5.12C38.2014 4.896 38.8254 4.784 39.5134 4.784H40.4974ZM39.5134 7.544C39.0174 7.544 38.5934 7.712 38.2414 8.048C37.9054 8.368 37.7374 8.792 37.7374 9.32V12.44C37.7374 12.968 37.9054 13.4 38.2414 13.736C38.5934 14.072 39.0174 14.24 39.5134 14.24H40.4974C41.0094 14.24 41.4254 14.072 41.7454 13.736C42.0814 13.4 42.2494 12.968 42.2494 12.44V9.32C42.2494 8.792 42.0814 8.368 41.7454 8.048C41.4254 7.712 41.0094 7.544 40.4974 7.544H39.5134ZM52.2714 4.784C52.9754 4.784 53.5994 4.896 54.1434 5.12C54.7034 5.328 55.1754 5.624 55.5594 6.008C55.9594 6.392 56.2634 6.856 56.4714 7.4C56.6794 7.944 56.7834 8.56 56.7834 9.248V12.536C56.7834 13.208 56.6794 13.824 56.4714 14.384C56.2634 14.928 55.9594 15.4 55.5594 15.8C55.1754 16.184 54.7034 16.48 54.1434 16.688C53.5994 16.896 52.9754 17 52.2714 17H51.2874C50.5994 17 49.9754 16.896 49.4154 16.688C48.8554 16.48 48.3754 16.184 47.9754 15.8C47.5914 15.4 47.2954 14.928 47.0874 14.384C46.8954 13.824 46.7994 13.208 46.7994 12.536V9.248C46.7994 8.56 46.8954 7.944 47.0874 7.4C47.2954 6.856 47.5914 6.392 47.9754 6.008C48.3754 5.624 48.8554 5.328 49.4154 5.12C49.9754 4.896 50.5994 4.784 51.2874 4.784H52.2714ZM51.2874 7.544C50.7914 7.544 50.3674 7.712 50.0154 8.048C49.6794 8.368 49.5114 8.792 49.5114 9.32V12.44C49.5114 12.968 49.6794 13.4 50.0154 13.736C50.3674 14.072 50.7914 14.24 51.2874 14.24H52.2714C52.7834 14.24 53.1994 14.072 53.5194 13.736C53.8554 13.4 54.0234 12.968 54.0234 12.44V9.32C54.0234 8.792 53.8554 8.368 53.5194 8.048C53.1994 7.712 52.7834 7.544 52.2714 7.544H51.2874ZM67.3335 7.16H62.5575C62.3495 7.16 62.1735 7.2 62.0295 7.28C61.9015 7.344 61.7895 7.44 61.6935 7.568C61.5975 7.696 61.5255 7.84 61.4775 8C61.4295 8.144 61.4055 8.288 61.4055 8.432C61.4055 8.736 61.5015 9.016 61.6935 9.272C61.9015 9.512 62.1495 9.632 62.4375 9.632H65.1255C65.6855 9.632 66.1735 9.728 66.5895 9.92C67.0215 10.112 67.3735 10.376 67.6455 10.712C67.9335 11.048 68.1415 11.448 68.2695 11.912C68.4135 12.376 68.4855 12.872 68.4855 13.4V13.472C68.4855 14 68.3975 14.48 68.2215 14.912C68.0615 15.344 67.8295 15.712 67.5255 16.016C67.2215 16.32 66.8615 16.56 66.4455 16.736C66.0295 16.912 65.5895 17 65.1255 17H59.3175V14.624H64.3095C64.6775 14.624 65.0135 14.52 65.3175 14.312C65.6375 14.104 65.8055 13.792 65.8215 13.376V13.4C65.8215 13.16 65.7735 12.96 65.6775 12.8C65.5975 12.64 65.4855 12.512 65.3415 12.416C65.1975 12.304 65.0375 12.224 64.8615 12.176C64.6855 12.128 64.5015 12.104 64.3095 12.104H62.1495C61.4455 12.104 60.8615 11.992 60.3975 11.768C59.9495 11.544 59.5895 11.256 59.3175 10.904C59.0615 10.552 58.8855 10.152 58.7895 9.704C58.6935 9.256 58.6455 8.8 58.6455 8.336C58.6455 7.856 58.7175 7.392 58.8615 6.944C59.0055 6.496 59.2135 6.104 59.4855 5.768C59.7735 5.416 60.1255 5.144 60.5415 4.952C60.9575 4.76 61.4295 4.664 61.9575 4.664H67.3335V7.16ZM70.7327 0.655999H73.5647V17H70.7327V0.655999ZM80.6884 21.176H78.0484L79.2724 16.952L75.5764 4.784H78.2404L80.5684 12.584L82.8724 4.784H85.5604L80.6884 21.176Z" fill="black"/>
          </svg> -->
        </span>
        <div class="input-group">
          <input type="email" class="form-input" placeholder="이메일 입력" v-model="email" />
        </div>
        <div class="input-group">
          <div class="pw-input">
            <input :type="passwordType" class="form-input" placeholder="비밀번호" autocomplete="on" v-model="password" />
            <i v-if="passwordType === 'text'" @click="isHidden" class="fas fa-eye"></i>
            <i v-if="passwordType === 'password'" @click="isHidden" class="fas fa-eye-slash"></i>
          </div>
        </div>
        <button v-bind:disabled="!isEmailValid || !password" type="submit" class="btn-primary btn-48">로그인하기</button>
        <p>{{ logMessage }}</p>
        <div class="login-others">
          <div class="signup-info">
            <span> <a @click="findPWModal"> 비밀번호 찾기 </a> </span>&nbsp;|&nbsp;
            <span>
              <a href="signup"> 회원가입 </a>
            </span>
          </div>
          <span class="sns-login-label hr-sect">SNS 간편 로그인</span>
          <div class="sns-login">
            <!-- <span>간편 로그인</span> -->
            <div class="sns-wrapper">
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
                <li class="sns-item">
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
                </li>
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
        </div>
      </div>
      <div class="modal__overlay" @click="close"></div>
    </form>
  </transition>
</template>

<script>
import axios from "axios";
import { validateEmail } from "@/utils/validation";
import { saveAuthToCookie } from "@/utils/cookies";
// import { saveAuthToCookie, saveUserToCookie } from "@/utils/cookies";

export default {
  name: "Login",
  data() {
    return {
      passwordType: "password",
      email: "",
      password: "",
      logMessage: "",
    };
  },
  computed: {
    isEmailValid() {
      return validateEmail(this.email);
    },
  },
  methods: {
    findPWModal() {
      this.emitter.emit("findPWModal", true);
    },
    close() {
      this.emitter.emit("closeModal");
    },
    isHidden() {
      this.passwordType = this.passwordType === "password" ? "text" : "password";
    },
    async submitForm() {
      try {
        const userData = {
          email: this.email,
          password: this.password,
        };
        const { data } = await axios.post("/users/login", userData);
        // await this.$store.dispatch("LOGIN", userData);
        console.log(data);
        if (data.success) {
          this.$store.state.mailCheck = true;
          this.$store.commit("setToken", data.userData.token);
          // this.$store.commit("setCode", data.userData.PK_ID);
          saveAuthToCookie(data.userData.token);
          // saveUserToCookie(data.userData.PK_ID);
          this.$router.push("/");
          if (this.$store.state.token != "") {
            this.emitter.emit("showToast", "로그인 되었습니다.");
            this.emitter.emit("loginFetch");
            this.emitter.emit("loginModal", false);
            return;
          }
        }
        this.initForm();
        this.emitter.emit("showRedToast", "로그인에 실패하였습니다.");
      } catch (error) {
        //error handling
        console.log(error);
        this.emitter.emit("showRedToast", "로그인에 실패하였습니다.");
      } finally {
        this.initForm();
      }
    },

    initForm() {
      // this.email = ''
      this.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button):not(input[type="password"]) {
  font-family: $font-main, sans-serif !important;
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

  .close_button {
    display: flex;
    position: relative;

    i {
      position: absolute;
      right: 0;
      padding: 0;
      font-size: 24px;
      color: $primary;

      &:hover {
        color: $blue;
      }
    }
  }

  .header_logo {
    display: flex;
    align-items: center;
    padding: 4px;
    /* margin: 12px 0 24px; */

    img {
      margin: auto;
      width: 70px;
    }
  }
  .input-group {
    margin: 16px 0;
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
      left: 87%;
      font-size: 18px;
      color: $secondary;
    }
  }

  button {
    display: flex;
    width: 300px;
    margin: auto;
    @media screen and (max-width: 320px) {
      width: 240px;
    }
  }
  .login-others {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .signup-info,
  .sns-login {
    @include text-style(14, $primary);

    padding: 8px;
    margin-bottom: 8px;
    display: flex;
    margin: auto;
  }

  .signup-info {
    a {
      &:hover {
        color: $tertiary;
      }
    }
  }

  .sns-login-label {
    @include text-style(12, $secondary);
  }

  .hr-sect {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 12px;
    margin: 8px 0px;
  }

  .hr-sect::before,
  .hr-sect::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }

  .sns-login {
    .sns-list {
      margin-bottom: 8px;
      padding: 0;
      display: flex;
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

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: black;
    opacity: 0.5;
  }

  &__window {
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: block;
    overflow: hidden;
    width: 22rem;
    height: 26rem;

    @media screen and (max-width: 320px) {
      width: 18rem;
    }

    border-radius: 0.4rem;
    overflow: hidden;
    padding: 24px;
    z-index: 1;
    box-shadow: 0px 4px 20px 0px $secondary;
    background-color: white;
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

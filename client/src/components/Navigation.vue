<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <div class="branding">
        <router-link @click="homeButton" :to="logoLink">
          <img src="@/assets/smoosly_eng_main_4x.png" alt="" />
        </router-link>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li v-if="!isAdmin"><a @click="navi" class="link" href="https://discreet-puck-4be.notion.site/about-UI-49b269028eea4b43b0c7e00e95c94700">About</a></li>
        <li v-else-if="isAdmin"><router-link class="link" :to="{ name: 'UserList' }">테이블관리</router-link></li>
        <li><a @click="test" class="link">가슴 테스트</a></li>
        <li v-if="!isUserLogin"><a @click="login" class="link">로그인</a></li>
        <li v-if="!isUserLogin"><router-link @click="navi" class="link" :to="{ name: 'Signup' }">회원가입</router-link></li>
        <li v-if="isUserLogin"><router-link @click="navi" class="link" :to="{ name: 'Mypage' }">마이페이지</router-link></li>
        <li v-if="isUserLogin"><a @click="logoutUser" class="link">로그아웃</a></li>
      </ul>
      <div class="icon">
        <i @click="toggleMobileNav" v-show="mobile" class="fas fa-bars" :class="{ 'icon-active': mobileNav }"></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><img class="logo_mobile_nav" src="@/assets/smoosly_eng_black_1x.png" alt="" /></li>
          <li v-if="!isAdmin"><a class="link" href="https://discreet-puck-4be.notion.site/about-UI-49b269028eea4b43b0c7e00e95c94700" @click="navi" >About</a></li>
          <li v-else-if="isAdmin"><router-link class="link" :to="{ name: 'UserList' }">테이블관리</router-link></li>
          <li><a @click="test" class="link">가슴 테스트</a></li>
          <li v-if="!isUserLogin"><a class="link" @click="login">로그인</a></li>
          <li v-if="!isUserLogin"><router-link class="link" :to="{ name: 'Signup' }" @click="navi">회원가입</router-link></li>
          <li v-if="isUserLogin"><router-link class="link" :to="{ name: 'Mypage' }" @click="navi">마이페이지</router-link></li>
          <li v-if="isUserLogin"><a @click="logoutUser" class="link">로그아웃</a></li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
import { deleteCookie } from "@/utils/cookies";
// import { checkAuth } from '@/utils/loginAuth';
import axios from "axios";

export default {
  name: "navigation",
  data() {
    return {
      isSigned: false,
      isAdmin: false,
      isModalOpen: false,
      scrolledNav: null,
      mobile: true,
      mobileNav: null,
      windowWidth: null,
    };
  },
  components: {},
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
    this.fetchUserInfo();
  },
  computed: {
    logoLink() {
      //login 했을 때 보이는 바탕화면을 따로 main으로 둘지
      return this.$store.getters.isLogin ? "/" : "/";
    },
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);

    this.emitter.on("closeToggle", () => {
      this.mobileNav = false;
    });
  },
  methods: {
    homeButton() {
      this.emitter.emit('Navi', true);
      window.scrollTo(0,0);
    },
    navi() {
      this.emitter.emit("Navi", true);
      this.emitter.emit("closeToggle");
    },
    login() {
      this.emitter.emit("closeToggle");
      this.emitter.emit("loginModal", true);
    },
    test() {
      this.emitter.emit("Navi", true);
      if (this.$store.state.email !== "") {
        this.emitter.emit("testModal", true);
        this.mobileNav = false;
      } else {
        this.emitter.emit("loginModal", true);
        this.mobileNav = false;
      }
    },
    async logoutUser() {
      this.emitter.emit("Navi", true);
      await axios
        .get("/users/logout")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            // console.log(result.data.message);
            this.$store.commit("clearCode");
            this.$store.commit("clearToken");
            deleteCookie("auth");
            deleteCookie("user");
            this.$router.push("/");
            let message = "로그아웃 되었습니다.";
            this.emitter.emit("showRedToast", message);
            this.emitter.emit("closeToggle");
            this.emitter.emit("logoutFetch");
          } else {
            console.log(result.data);
            this.$router.go();
          }
        })
        .catch((err) => console.log(err));
    },
    toggleMobileNav() {
      this.emitter.emit("Navi", true);
      this.mobileNav = !this.mobileNav;
    },

    updateScroll() {
      const scrollPostion = window.scrollY;
      if (scrollPostion > 50) {
        this.scrolledNav = true;
        return;
      }
      this.scrolledNav = false;
    },

    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },

    fetchUserInfo() {
      axios
        .get("/users/getUserInfo")
        .then((user) => {
          console.log(user.data);
          if (user.data.success) {
            console.log(user.data.userInfo);
            this.isAdmin = user.data.userInfo.role === "ADMIN" ? true : false;
          }
        })
        .catch(console.log);
    },
  },
};
</script>

<style lang="scss" scoped>
*:not(i) {
  font-family: "Noto Sans KR", sans-serif !important;
}
header {
  background-color: #f7f8fa;
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #3f4150;

  nav {
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }

    ul,
    .link {
      font-weight: 500;
      color: #3f4150;
      list-style: none;
      text-decoration: none;
    }

    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }

    .link {
      padding-left: 20px;
      font-size: 14px;
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: $blue;
        /* border-color: #3F4150; */
      }
    }
    .branding {
      margin-top: 4px;
      display: flex;
      align-items: center;

      img {
        /* width: 50px; */
        width: 80px;
        transition: 0.5s ease all;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;

      i {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;

        &:hover {
          color: $blue;
        }
      }
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: #f7f8fa;
      top: 0;
      left: 0;

      li {
        margin-left: 0;
        .link {
          color: #3f4150;

          &:hover {
            color: $blue;
          }
        }

        .logo_mobile_nav {
          width: 80px;
        }
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
      transform: translateX(0);
    }
  }
}

.scrolled-nav {
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);

  nav {
    padding: 8px 0;

    .branding {
      svg {
        width: 70px;
        box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
      }
    }
  }
}
</style>

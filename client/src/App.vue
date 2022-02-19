<template>
  <div class="app">
    <transition name="toast">
      <Toast v-if="showToast" :showMessage="showMessage" />
    </transition>
    <transition name="toast">
      <RedToast v-if="showRedToast" :showMessage="showMessage" />
    </transition>
    <transition name="toast">
      <NoticeToast v-if="showNoticeToast" :showMessage="showMessage" />
    </transition>
    <transition name="fade">
      <div id="pagetop" class="top-button" v-show="scY > 300" @click="toTop">
        <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="6" width="26" height="27" fill="white" />
          <path
            d="M0 20C0 8.95161 8.95161 0 20 0C31.0484 0 40 8.95161 40 20C40 31.0484 31.0484 40 20 40C8.95161 40 0 31.0484 0 20ZM18.629 10.8145L7.70161 21.7419C6.94355 22.5 6.94355 23.7258 7.70161 24.4758L9.07258 25.8468C9.83064 26.6048 11.0565 26.6048 11.8065 25.8468L20 17.6532L28.1935 25.8468C28.9516 26.6048 30.1774 26.6048 30.9274 25.8468L32.2984 24.4758C33.0565 23.7177 33.0565 22.4919 32.2984 21.7419L21.371 10.8145C20.6129 10.0565 19.3871 10.0565 18.629 10.8145Z"
            fill="#A3A2A1"
          />
        </svg>
      </div>
    </transition>

    <Navigation />
    <LoginModal v-if="isModalOpen"></LoginModal>
    <TestSelectModal v-if="isTestModalOpen"></TestSelectModal>
    <FindPasswordModal v-if="isfindPWModalOpen"></FindPasswordModal>
    <DeleteAccountModal v-if="isDeleteModalOpen"></DeleteAccountModal>
    <BreastTypeSelectModal v-if="isTypeModalOpen"></BreastTypeSelectModal>
    <EndupTestModal v-if="isEndupTestModalOpen"></EndupTestModal>
    <!-- <DeliveryModal deliverDate="deliverDate" v-if="isDeliveryModalOpen"></DeliveryModal> -->
    <DeliveryModal v-if="isDeliveryModalOpen"></DeliveryModal>
    <KitUploadGuideModal v-if="isKitGuideModalOpen"></KitUploadGuideModal>
    <KitOrderCompleteModal v-if="isKitCompleteModalOpen"></KitOrderCompleteModal>
    <HomeFittingOrderCompleteModal v-if="isHomeCompleteModalOpen"></HomeFittingOrderCompleteModal>
    <ServiceNotOpenModal v-if="isServiceNotOpenModalOpen"></ServiceNotOpenModal>

    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// import { ref } from 'vue'
import Toast from "@/components/Toast.vue";
import RedToast from "@/components/RedToast.vue";
import NoticeToast from "@/components/NoticeToast.vue";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import LoginModal from "@/components/LoginModal.vue";
import FindPasswordModal from "@/components/FindPasswordModal.vue";
import TestSelectModal from "@/components/TestSelectModal.vue";
import DeleteAccountModal from "@/components/DeleteAccountModal.vue";
import BreastTypeSelectModal from "@/components/BreastTypeSelectModal.vue";
import EndupTestModal from "@/components/EndupTestModal.vue";
import DeliveryModal from "@/components/DeliveryModal.vue";
import KitUploadGuideModal from "@/components/KitUploadGuideModal.vue";
import KitOrderCompleteModal from "@/components/KitOrderCompleteModal.vue";
import HomeFittingOrderCompleteModal from "@/components/HomeFittingOrderCompleteModal.vue";
import ServiceNotOpenModal from "@/components/ServiceNotOpenModal.vue";

export default {
  name: "App",
  data() {
    return {
      // Top 버튼
      scTimer: 0,
      scY: 0,

      isModalOpen: false,
      isTestModalOpen: false,
      isfindPWModalOpen: false,
      isDeleteModalOpen: false,
      isTypeModalOpen: false,
      isEndupTestModalOpen: false,
      isDeliveryModalOpen: false,
      isKitGuideModalOpen: false,
      isKitCompleteModalOpen: false,
      isHomeCompleteModalOpen: false,
      isServiceNotOpenModalOpen: false,
      deliverDate: null,
      isRevisionModalOpen: false,
      showToast: false,
      showRedToast: false,
      showNoticeToast: false,
      showMessage: "",
    };
  },
  components: {
    Toast,
    RedToast,
    NoticeToast,
    Navigation,
    Footer,
    LoginModal,
    FindPasswordModal,
    TestSelectModal,
    DeleteAccountModal,
    BreastTypeSelectModal,
    EndupTestModal,
    DeliveryModal,
    KitUploadGuideModal,
    KitOrderCompleteModal,
    HomeFittingOrderCompleteModal,
    ServiceNotOpenModal,
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    this.emitter.on("loginModal", (state) => {
      this.isModalOpen = state;
    });

    this.emitter.on("closeModal", () => {
      this.isModalOpen = false;
    });

    this.emitter.on("findPWModal", (state) => {
      this.isfindPWModalOpen = state;
    });

    this.emitter.on("closefindPWModal", () => {
      this.isfindPWModalOpen = false;
    });

    this.emitter.on("testModal", (state) => {
      this.isTestModalOpen = state;
    });

    this.emitter.on("deleteAccountModal", (state) => {
      this.isDeleteModalOpen = state;
    });

    this.emitter.on("typeSelectModal", (state) => {
      this.isTypeModalOpen = state;
    });

    this.emitter.on("EndupTestModal", (state) => {
      this.isEndupTestModalOpen = state;
    });

    this.emitter.on("DeliveryModal", state => {
      this.isDeliveryModalOpen = state
    })

    this.emitter.on("MemberInfoRevisionModal", (state) => {
      this.isRevisionModalOpen = state;
    });

    this.emitter.on("KitGuideModal", (state) => {
      this.isKitGuideModalOpen = state;
    });

    this.emitter.on("KitCompleteModal", (state) => {
      this.isKitCompleteModalOpen = state;
    });

    this.emitter.on("HomeOrderModal", (state) => {
      this.isHomeCompleteModalOpen = state;
    });

    this.emitter.on("ServiceNotOpenModal", (state) => {
      this.isServiceNotOpenModalOpen = state;
    });

    this.emitter.on("showToast", (message) => {
      this.showToast = true;
      this.showMessage = message;
      // this.color = color
      setTimeout(() => (this.showToast = false), 3000);
    });

    this.emitter.on("showRedToast", (message) => {
      this.showRedToast = true;
      this.showMessage = message;
      // this.color = color
      setTimeout(() => (this.showRedToast = false), 3000);
    });

    this.emitter.on("showNoticeToast", (message) => {
      this.showNoticeToast = true;
      this.showMessage = message;
      // this.color = color
      setTimeout(() => (this.showNoticeToast = false), 3000);
    });
  },
  methods: {
    handleScroll() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}

.app {
  min-height: 100vh;
  position: relative;
  background-color: #f1f1f1;
}
.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}

.top-button {
  position: fixed;
  right: 4%;
  bottom: 4%;
  z-index: 99;
}

.top-icon {
  font-size: 44px;
  /* color: #a3a2a1; */
}

/* enter transitions */
.toast-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
/* .toast-enter-to {
    opacity: 1;
    transform: translateY(0);
  } */
.toast-enter-active {
  transition: all 0.3s ease;
}
/* leave transitions */
/* .toast-leave-from {
    opacity: 1;
    transform: translateY(0);
  } */
.toast-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.toast-leave-active {
  transition: all 0.3s ease;
}
</style>

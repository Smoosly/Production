<template>
  <transition name="modal" appear>
    <form class="modal">
      <div data-aos="zoom-out-up" data-aos-anchor-placement="top-bottom" data-aos-duration="250" class="modal__window">
        <span class="header_logo">
          <img src="@/assets/smoosly_eng_main_4x.png" alt="" />
        </span>
        <p>
          설문을 완료하면 수정할 수 없습니다. <br />
          답변을 제출하시겠습니까?
        </p>
        <div class="button-box">
          <button type="submit" @click="endTest" class="btn-primary btn-48">확인</button>
          <button type="submit" @click="close" class="btn-secondary btn-48">닫기</button>
        </div>
      </div>
      <div class="modal__overlay" @click="close"></div>
    </form>
  </transition>
</template>

<script>
import axios from "axios";
export default {
  name: "EndupTestModal",
  data() {
    return {
      email: this.$store.state.email,
    };
  },
  methods: {
    close() {
      this.emitter.emit("EndupTestModal", false);
    },
    async endTest(e) {
      e.preventDefault();
      console.log("endTest");
      axios.post("/breastTest/complete", { PK_ID: this.$store.state.PK_ID })
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            console.log(result.data.message);
            // 테스트 완료 처리
            this.emitter.emit("EndupTestModal", false);
            // 페이지 이동 처리
            this.$router.push("/survey/complete");
            return;
          }
          return this.emitter.emit("showRedToast", result.data.message);
        })
        .catch((error) => {
          //error handling
          console.log(error.result.data);
          this.logMessage = error.result.data;
        })
        .finally(() => {
          this.emitter.emit("EndupTestModal", false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  flex-direction: column;
  z-index: 105;
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
    padding: 8px;
    margin: 8px 0 16px;

    img {
      margin: auto;
      width: 96px;
    }
  }

  p {
    @include text-style(14, $primary);
    margin: 16px;
    margin-bottom: 24px;
    text-align: center;
  }
  .button-box {
    margin: 16px;
    display: flex;
    button {
      display: flex;
      justify-content: space-around;
      width: 104px;
      margin: auto;
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
    width: 19rem;
    height: 16rem;
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

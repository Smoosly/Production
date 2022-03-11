<template>
  <transition name="modal" appear>
    <div class="modal">
      <div class="modal__window">
        <span class="header_logo">
          <img src="@/assets/smoosly_eng_main_4x.png" alt="" />
        </span>
        <p>이미 키트 신청을 완료했습니다.</p>
        <div class="button-box">
          <button @click="close" class="btn-primary btn-48">확인</button>
          <!-- <button @click="close" class="btn-secondary btn-48">닫기</button> -->
        </div>
      </div>
      <div class="modal__overlay" @click="close"></div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ServiceNotOpenModal',
  data() {
    return {
      // PK_ID: this.$store.state.PK_ID,
    };
  },
  methods: {
    close() {
      this.emitter.emit('ServiceNotOpenModal', false);
    },
    submitForm() {
      // axios.post("/users/requestNotify", {PK_ID: this.PK_ID})
      axios
        .post('/users/requestNotify')
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            console.log(result.data.message);
            this.emitter.emit('showToast', result.data.message);
            this.emitter.emit('ServiceNotOpenModal', false);
            // this.$router.push('/mypage');
          } else {
            console.log(result.data.message);
            this.emitter.emit('showNoticeToast', result.data.message);
            // this.emitter.emit("ServiceNotOpenModal", false);
          }
        })
        .catch(console.log);
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
    margin-top: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      /* width: 50px; */
      width: 96px;
      transition: 0.5s ease all;
    }
  }

  p {
    @include text-style(14, $primary);
    margin: 24px 16px;
    text-align: center;
    line-height: 200%;
  }
  .button-box {
    margin: 24px 16px;
    display: flex;
    justify-content: center;
    button {
      display: flex;
      width: 100px;
      /* margin: auto; */
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
    width: 18rem;
    height: 14rem;
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

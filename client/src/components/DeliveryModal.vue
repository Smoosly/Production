<template>
  <transition name="modal" appear>
    <form class="modal">
      <div data-aos="zoom-out-up" data-aos-anchor-placement="top-bottom" data-aos-duration="250"  class="modal__window">
        <span class="close_button" @click="close">
          <i class="fas fa-times"></i>
        </span>
        <div class="howto">
          <h2>반송 신청</h2>
          <p>
            1. 아래 날짜 중에서 수거 가능한 날짜를 선택해 주세요. <br />
            2. 비닐의 여백이 최소화 될 수 있도록 브라를 겹겹이 넣어 재포장 해주세요. <br />
            3. 신청 일자의 <span>오전 9시</span>까지 제품을 꼭 내놓아 주세요!
          </p>
        </div>
        <div class="datePick">
          <h3>신청 가능일</h3>
          <div class="select-group is-active">
            <select v-model="date" class="form-select">
              <option :value="day1">{{ day1 }}</option>
              <option :value="day2">{{ day2 }}</option>
              <option :value="day3">{{ day3 }}</option>
            </select>
            <i class="fas fa-caret-down" aria-hidden></i>
          </div>
        </div>

        <button @click="braReturn" class="btn-primary btn-48">해당 날짜로 반송 요청하기</button>
      </div>
      <div class="modal__overlay" @click="close"></div>
    </form>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  name: "DeliveryModal",
  data() {
    return {
      date: null,
      day1: null,
      day2: null,
      day3: null,
    };
  },
  methods: {
    close() {
      this.emitter.emit("DeliveryModal", false);
    },
    dateFormat(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();

      month = month >= 10 ? month : "0" + month;
      day = day >= 10 ? day : "0" + day;

      return date.getFullYear() + "-" + month + "-" + day;
    },
    braReturn(e) {
      e.preventDefault();
      if (this.date === null) {
        this.emitter.emit("showRedToast", "반송 날짜를 선택해주세요.");
        return;
      }
      axios.post("/homeFitting/returning", { PK_ID: this.$store.state.PK_ID, returnDate: this.date })
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.emitter.emit("showToast", result.data.message);
            this.emitter.emit("DeliveryModal", false);
            return;
          }
          this.emitter.emit("showRedToast", result.data.message);
        })
        .catch(console.log);

      this.emitter.emit('deliverStatus', {
        state: true,
        date: this.date,
      })
    },
  },
  mounted() {
    const today = new Date();

    let tomorrow = new Date();
    let twoAfter = new Date();
    let threeAfter = new Date();

    // 주말이면 제외 - 목/금/토
    tomorrow.setDate(today.getDate() + 1);
    twoAfter.setDate(today.getDate() + 2);
    threeAfter.setDate(today.getDate() + 3);

    this.day1 = this.dateFormat(tomorrow);
    this.day2 = this.dateFormat(twoAfter);
    this.day3 = this.dateFormat(threeAfter);
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

  .howto {
    h2 {
      @include text-style(18, $primary);
      font-weight: bold;
      text-align: center;
      margin-bottom: 16px;
    }
    p {
      @include text-style(14, $primary);
      font-weight: bold;
      margin-bottom: 12px;
      padding: 4px;
      background-color: $background;
      border-radius: 8px;
      box-shadow: 1px 1px 1px 1px $border;
      span {
        @include text-style(14, $red);
        font-weight: bolder;
      }
    }
  }

  .datePick {
    h3 {
      text-align: center;
      @include text-style(16, $blue-dark);
      font-weight: bold;
      margin-bottom: 12px;
    }
    .form-select {
      margin-bottom: 28px;
    }
  }

  button {
    display: flex;
    width: 200px;
    margin: auto;
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
    width: 20rem;
    height: 26rem;

    @media screen and (max-width: 320px) {
      width: 18rem;
    }

    @media screen and (max-width: 320px) {
      width: 16rem;
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

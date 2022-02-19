<template>
  <transition name="modal" appear>
    <form @submit.prevent="submitForm" class="modal">
      <div data-aos="zoom-out-up" data-aos-anchor-placement="top-bottom" data-aos-duration="250"  :class="[ step == 2 ? 'modal__window' : 'modal__small']">
        <span  class="close_button" @click="close">
          <i class="fas fa-times"></i>
        </span>
        <div v-if="step == 1" class="guide">
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="500"  class="head">
            <h3>
              내 가슴 찾기
            </h3>
            <span>24개의 대표사진과 68개의 추가사진을 통해, 나와 가장 비슷한 가슴을 찾아보세요</span>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="500"  class="howto">
            <h4>사진 선택 가이드&nbsp;<i class="far fa-hand-pointer"></i></h4>
            <p>
              1. 유형 1-24번 중 가장 비슷한 가슴 사진을 찾아주세요. <br>
              2. 해당 사진을 클릭한 뒤, 더 다양한 가슴을 확인하세요. <br>
              3. 그 중 가장 유사한 가슴을 선택해 주세요. 
            </p>
          </div>
        </div>
        <div v-if="step == 2" class="single-select">
          <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="500"  class="title">
            <span>step1. 24장 중 가장 비슷한 유형 선택</span>
          </div>          
          <div class="image-box">
            <div class="item-box">
              <span>01</span>
              <i v-if="!isSelected[0]" @click="setAnswer(1)" class="far fa-circle"></i>
              <i v-if="isSelected[0]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(1)" class="one" src="@/assets/bratabase/1/1-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>02</span>
              <i v-if="!isSelected[1]" @click="setAnswer(2)" class="far fa-circle"></i>
              <i v-if="isSelected[1]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(2)" class="two" src="@/assets/bratabase/2/2-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>03</span>
              <i v-if="!isSelected[2]" @click="setAnswer(3)" class="far fa-circle"></i>
              <i v-if="isSelected[2]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(3)" class="three" src="@/assets/bratabase/3/3-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>04</span>
              <i v-if="!isSelected[3]" @click="setAnswer(4)" class="far fa-circle"></i>
              <i v-if="isSelected[3]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(4)" class="four" src="@/assets/bratabase/4/4-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>05</span>
              <i v-if="!isSelected[4]" @click="setAnswer(5)" class="far fa-circle"></i>
              <i v-if="isSelected[4]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(5)" class="five" src="@/assets/bratabase/5/5-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>06</span>
              <i v-if="!isSelected[5]" @click="setAnswer(6)" class="far fa-circle"></i>
              <i v-if="isSelected[5]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(6)" class="six" src="@/assets/bratabase/6/6-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>07</span>
              <i v-if="!isSelected[6]" @click="setAnswer(7)" class="far fa-circle"></i>
              <i v-if="isSelected[6]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(7)" class="seven" src="@/assets/bratabase/7/7-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>08</span>
              <i v-if="!isSelected[7]" @click="setAnswer(8)" class="far fa-circle"></i>
              <i v-if="isSelected[7]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(8)" class="eight" src="@/assets/bratabase/8/8-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>09</span>
              <i v-if="!isSelected[8]" @click="setAnswer(9)" class="far fa-circle"></i>
              <i v-if="isSelected[8]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(9)" class="nine" src="@/assets/bratabase/9/9-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>10</span>
              <i v-if="!isSelected[9]" @click="setAnswer(10)" class="far fa-circle"></i>
              <i v-if="isSelected[9]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(10)" class="ten" src="@/assets/bratabase/10/10-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>11</span>
              <i v-if="!isSelected[10]" @click="setAnswer(11)" class="far fa-circle"></i>
              <i v-if="isSelected[10]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(11)" class="eleven" src="@/assets/bratabase/11/11-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>12</span>
              <i v-if="!isSelected[11]" @click="setAnswer(12)" class="far fa-circle"></i>
              <i v-if="isSelected[11]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(12)" class="twelve" src="@/assets/bratabase/12/12-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>13</span>
              <i v-if="!isSelected[12]" @click="setAnswer(13)" class="far fa-circle"></i>
              <i v-if="isSelected[12]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(13)" class="thirteen" src="@/assets/bratabase/13/13-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>14</span>
              <i v-if="!isSelected[13]" @click="setAnswer(14)" class="far fa-circle"></i>
              <i v-if="isSelected[13]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(14)" class="fourteen" src="@/assets/bratabase/14/14-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>15</span>
              <i v-if="!isSelected[14]" @click="setAnswer(15)" class="far fa-circle"></i>
              <i v-if="isSelected[14]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(15)" class="fifteen" src="@/assets/bratabase/15/15-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>16</span>
              <i v-if="!isSelected[15]" @click="setAnswer(16)" class="far fa-circle"></i>
              <i v-if="isSelected[15]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(16)" class="sixteen" src="@/assets/bratabase/16/16-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>17</span>
              <i v-if="!isSelected[16]" @click="setAnswer(17)" class="far fa-circle"></i>
              <i v-if="isSelected[16]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(17)" class="seventeen" src="@/assets/bratabase/17/17-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>18</span>
              <i v-if="!isSelected[17]" @click="setAnswer(18)" class="far fa-circle"></i>
              <i v-if="isSelected[17]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(18)" class="eighteen" src="@/assets/bratabase/18/18-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>19</span>
              <i v-if="!isSelected[18]" @click="setAnswer(19)" class="far fa-circle"></i>
              <i v-if="isSelected[18]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(19)" class="nineteen" src="@/assets/bratabase/19/19-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>20</span>
              <i v-if="!isSelected[19]" @click="setAnswer(20)" class="far fa-circle"></i>
              <i v-if="isSelected[19]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(20)" class="twenty" src="@/assets/bratabase/20/20-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>21</span>
              <i v-if="!isSelected[20]" @click="setAnswer(21)" class="far fa-circle"></i>
              <i v-if="isSelected[20]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(21)" class="twentyone" src="@/assets/bratabase/21/21-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>22</span>
              <i v-if="!isSelected[21]" @click="setAnswer(22)" class="far fa-circle"></i>
              <i v-if="isSelected[21]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(22)" class="twentytwo" src="@/assets/bratabase/22/22-1.png" alt="" />
            </div>
          </div>
          <div class="image-box">
            <div class="item-box">
              <span>23</span>
              <i v-if="!isSelected[22]" @click="setAnswer(23)" class="far fa-circle"></i>
              <i v-if="isSelected[22]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(23)" class="twentythree" src="@/assets/bratabase/23/23-1.png" alt="" />
            </div>
            <div class="item-box">
              <span>24</span>
              <i v-if="!isSelected[23]" @click="setAnswer(24)" class="far fa-circle"></i>
              <i v-if="isSelected[23]" class="fas fa-check-circle"></i>
              <img @click="setAnswer(24)" class="twentyfour" src="@/assets/bratabase/24/24-1.png" alt="" />
            </div>
          </div>
        </div>
        <button v-if="step == 1" type="button" @click="step = 2" class="btn-primary btn-48 next-btn">전체유형보기</button>
        <button v-if="step == 2" :disabled="!clicked" @click="close" type="submit" class="btn-primary btn-48">선택</button>
      </div>

      <div class="modal__overlay" @click="close"></div>
    </form>
  </transition>
</template>

<script>
export default {
  name: "BreastTypeSelectModal",
  data() {
    return {
      isSelected: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,],
      clicked: false,
      step: 1,
    };
  },
  methods: {
    close() {
      this.emitter.emit("typeSelectModal", false);
    },
    setAnswer(type) {
      this.clicked = true;
      this.emitter.emit("setType", type);
      for (let idx in this.isSelected) {
        this.isSelected[idx] = false;
      }
      this.isSelected[type - 1] = true;
    },
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button) {
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
      font-size: 22px;
      color: $primary;

      &:hover {
        color: $blue;
      }

      @media screen and (max-width: 820px) {
        padding: 4px;
      }
    }
  }

  .title {
    @include text-style(14, $primary);
    display: flex;
    justify-content: center;
    font-weight: bolder;
    margin-top: 16px;

  }

  .guide {
    display: flex-start;
    justify-content: center;
    flex-direction: column;
    @include text-style(18, $primary);
    text-align: center;
    margin-bottom: 32px;
    margin-top: 16px;
    height: auto;
    padding: 16px 36px;

    @media screen and (max-width: 820px) {
      margin-top: 24px;
      margin-bottom: 0px;
      height: auto;
      padding: 0px;
    }

    h3 {
      @include text-style(28, $primary);
      font-size: 28px;
      font-weight: bolder;

      @media screen and (max-width: 820px) {
        @include text-style(18, $primary);
        font-size: 22px;
      }
    }

    span {
      @include text-style(14, $primary);
      margin: 64px 0;
      line-height: 1.5;
      @media screen and (max-width: 820px) {
        @include text-style(13, $secondary);
        margin-top: 16px;
        margin-bottom: 16px;

      }      
    }

    .head {
      margin: 8px 88px;

      @media screen and (max-width: 820px) {
        margin: 4px 40px;
      }
    }

    .howto {
      margin: 18px 0;
      padding: 2px;
      background-color: $background;
      border-radius: 8px;
      h4 {
        margin-top: 8px;
        @include text-style(16, $blue-dark);
        font-weight: bolder;

        @media screen and (max-width: 820px) {
          @include text-style(14, $blue-dark);

        }
      }

      p {
        @include text-style(14, $primary);
        margin: 8px 0;    
        font-weight: bolder;
        line-height: 160%;
        @media screen and (max-width: 820px) {
          @include text-style(13, $primary);
        }

      }
    }

    .guide-image {
      margin: 16px 0px;
      padding: 4px;
      @media screen and (max-width: 820px) {
        margin-top: 8px;
        width: 300px;
        height: 243px;
      }

      @media screen and (max-width: 320px) {
        margin-top: 8px;
        width: 280px;
      }      
    }
  }

  .single-select {
    overflow-y: scroll;
    height: 588px;
    margin: 16px;
    margin-top: 8px;
    @media screen and (max-width: 820px) {
      height: 496px;
      margin: 8px;
    }

    .title {
      margin-top: 0;
      span {
        @include text-style(18, $blue-dark);
        font-weight: 600;
        background-color: $background;
        padding: 4px;
        border-radius: 8px;

        @media screen and (max-width: 820px) {
          @include text-style(16, $blue-dark);
        }
      }
    }

    .image-box {
      display: flex;
      margin: 8px;
      justify-content: center;

      @media screen and (max-width: 820px) {
        flex-direction: row;
      }
    }

    img {
      width: 200px;
      height: 200px;
      margin: 4px;
      border-radius: 8px;
      opacity: 1;
      transition: opacity 200ms ease-in-out;

      @media screen and (max-width: 820px) {
        width: 120px;
        height: 120px;
      }

      &:not(:disabled):hover {
        opacity: 0.7;
      }
    }
  }

  .next-btn {
    margin-top: 16px;
  }

  button {
    position: relative;
    display: flex;
    width: 300px;
    margin: auto;

    @media screen and (max-width: 820px) {
      width: 270px;
      margin-top: 16px;
    }
  }

  .item-box {
    position: relative;

    i {
      color: $blue;
      font-size: 24px;
      position: absolute;
      bottom: 10%;
      right: 6%;
    }

    span {
      position: absolute;
      padding: 2px 4px;
      background-color: rgba(255, 246, 240, 0.67);
      color: $blue-dark;
      font-weight: 700;
      border-radius: 4px;

    }
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
    width: 33rem;
    height: 44rem;
    border-radius: 0.4rem;
    overflow: hidden;
    padding: 16px;
    z-index: 1;
    box-shadow: 0px 4px 20px 0px $secondary;
    background-color: white;
    position: relative;
    /* overflow-y: scroll; */

    @media screen and (max-width: 820px) {
      width: 21rem;
      height: 38rem;
      padding: 8px;
    }

    @media screen and (max-width: 320px) {
      width: 20rem;
      height: 36rem;
      padding: 8px;
    }
    @media screen and (max-width: 280px) {
      width: 18rem;
      height: 36rem;
      padding: 8px;
    }
    button {
      position: absolute;
      bottom: 3%;
      left: 50%;
      transform: translate(-50%);
    }
  }

  &__small {
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: block;
    overflow: hidden;
    width: 33rem;
    height: 25rem;
    border-radius: 0.4rem;
    overflow: hidden;
    padding: 16px;
    z-index: 1;
    box-shadow: 0px 4px 20px 0px $secondary;
    background-color: white;
    position: relative;
    /* overflow-y: scroll; */

    @media screen and (max-width: 820px) {
      width: 21rem;
      height: 23rem;
      padding: 8px;
    }

    @media screen and (max-width: 320px) {
      width: 20rem;
      height: 21rem;
      padding: 8px;
    }
    @media screen and (max-width: 280px) {
      width: 18rem;
      height: 21rem;
      padding: 8px;
    }
    button {
      position: absolute;
      bottom: 3%;
      left: 50%;
      transform: translate(-50%);
    }
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

<template>
  <transition name="modal" appear>
    <form @submit.prevent="submitForm" class="modal">
      <div data-aos="zoom-out-up" data-aos-anchor-placement="top-bottom" data-aos-duration="250" class="modal__window">
        <span class="close_button" @click="close">
          <i class="fas fa-times"></i>
        </span>
        <div class="container">
          <div class="before-start">
            <h3>
              <i class="far fa-hand-point-right"></i>&nbsp;시작하기 전, <br />
              가슴 측정 키트를 준비해 주세요.
            </h3>
            <div class="steps">
              <div class="step">
                <h4>
                  <span>1</span>
                  가슴 측정 시트
                </h4>
                <div class="image-box">
                  <img src="@/assets/kitguide/half_fold.png" alt="" />
                </div>
                <p>
                  측정 시트가 잘 펴지도록, 라인 테이프를 4개 모서리에 붙여 고정해주세요. <br />
                  <span>* 테이프가 주황색선을 침범하지 않게 해주세요.</span><br>
                  <span>* 접힌 부분의 반대 방향으로 종이를 접지 말아주세요.</span>
                </p>
              </div>
              <div class="step">
                <h4>
                  <span>2</span>
                  가위, 철사, 라인테이프
                </h4>
                <div class="image-box">
                  <img src="@/assets/kitguide/joonbemool.png" alt="" />
                </div>
                <p>가위는 동봉되어 있지 않으니, 따로 준비해 주세요!</p>
              </div>
            </div>
          </div>
          <div class="guide">
            <div class="title">
              <p>그럼, 이제 시작해 보아요!</p>
              <div class="notice">
                <h4><i class="far fa-check-square"></i>&nbsp;안내 사항</h4>
                <p>
                  1. <span class="highlight">더 큰쪽 가슴</span>을 측정&nbsp;
                  <span class="msg">(더 정확한 추천을 원하는 경우, 양쪽 가슴 모두 측정)</span> <br />
                  2. 거울을 보며 진행 
                  <br>
                  <br>
                  <span class="howlong">* 총 6단계 진행, 5~10분 소요</span>
                </p>
              </div>
            </div>
            <div class="step">
              <div class="step-title">
                <h3><i class="fas fa-dice-one"></i>&nbsp;STEP 1</h3>
              </div>
              <div class="image-box">
                <img src="@/assets/kitguide/step1.png" alt="" />
              </div>
              <div class="description">
                <div class="content">
                  <p>
                    가슴의 <span>끝점(안쪽, 바깥쪽, 아래쪽)</span>에 스티커 3개를 각각 붙여주세요.
                  </p>
                </div>
                <div class="notice">
                  <h4><i class="far fa-check-square"></i>&nbsp;가슴 안쪽 점</h4>
                  <div class="box">
                    <div class="image-box">
                      <img src="@/assets/test_guide/guide-kit.png" alt="" />
                    </div>
                    <p>
                      가슴을 안으로 밀었을 때&nbsp;<span>접히기 시작하는 부분</span>
                    </p>
                  </div>
                  <h4><i class="far fa-check-square"></i>&nbsp;가슴 바깥쪽 점</h4>
                  <div class="box">
                    <div class="image-box">
                      <img src="@/assets/kitguide/gasum_kkeut.png" alt="" />
                    </div>
                  </div> 
                  <h4><i class="far fa-check-square"></i>&nbsp;가슴 아래쪽 점</h4>
                  <div class="box">
                    <p>
                      유두에서 수직으로 내려올 때 만나는 점
                    </p>
                  </div>                                   
                </div>
              </div>
            </div>
            <div class="step">
              <div class="step-title">
                <h3><i class="fas fa-dice-two"></i>&nbsp;STEP 2</h3>
              </div>
              <div class="image-box">
                <img src="@/assets/kitguide/step2.png" alt="" />
              </div>
              <div class="description">
                <div class="content">
                  <p>
                    라인 테이프를 <span>유두</span>부터 <span>가슴 안쪽 점</span>까지 붙인 상태에서 가위로 잘라주세요.<br>
                    <span>* 다치지 않게 조심</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="step">
              <div class="step-title">
                <h3><i class="fas fa-dice-three"></i>&nbsp;STEP 3</h3>
              </div>
              <div class="image-box">
                <img src="@/assets/kitguide/step3.png" alt="" />
              </div>
              <div class="description">
                <div class="content">
                  <p>위의 방법을 <span>겨드랑이쪽 점</span>에도 이어서 진행해 주세요.</p>
                </div>
              </div>
            </div>
            <div class="step">
              <div class="step-title">
                <h3><i class="fas fa-dice-four"></i>&nbsp;STEP 4</h3>
              </div>
              <div class="image-box">
                <img src="@/assets/kitguide/step4.png" alt="" />
              </div>
              <div class="description">
                <div class="content">
                  <p>
                    위의 방법을 <span>아래쪽 점</span>까지 이어서 진행해 주세요.
                  </p>
                </div>
              </div>
            </div>
            <div class="step">
              <div class="step-title">
                <h3><i class="fas fa-dice-five"></i>&nbsp;STEP 5</h3>
              </div>
              <div class="image-box">
                <img src="@/assets/kitguide/step5.png" alt="" />
              </div>
              <div class="description">
                <div class="content">
                  <p>
                    철사를 <span>가슴 밑선 모양</span>을 따라 구부린 후, 가위로 잘라주세요. <br />
                    <span>* 양쪽 테이프가 끝나는 지점을 넘지 않도록 잘라주세요.</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="step">
              <div class="step-title">
                <h3><i class="fas fa-dice-six"></i>&nbsp;STEP 6</h3>
              </div>
              <div class="image-box">
                <img src="@/assets/kitguide/step6.png" alt="" />
              </div>
              <div class="description">
                <div class="content">
                  <p>
                    (1) 철사의 <span>가슴 밑 점</span> 부분과 <span>겨드랑이 쪽</span> 부분을 회색 점선에 맞춰 놓아 주세요.
                  </p>
                </div>
              </div>
              <div class="image-label">
                <h4><i class="fas fa-sort-down"></i>&nbsp;완성본</h4>
              </div>
              <div class="image-box">
                <img src="@/assets/kitguide/step7.png" alt="" /> 
              </div>
              <div class="description">
                <div class="content">
                  <p>
                    (2) 가슴에 붙인 테이프를 하나씩 뗀 후, 해당하는 부분에 붙여주면 끝!
                  </p>
                </div>
                <div class="notice">
                  <h4><i class="far fa-check-square"></i>&nbsp;주의 사항</h4>
                  <div class="box">
                    <div class="image-box">
                      <img src="@/assets/kitguide/image_for_guide.png" alt="" />
                    </div>
                    <p>
                      라인 테이프를 칸 중간에 붙여주세요. 이렇게 테이프가&nbsp;<span>검은 선과 맞닿으면</span>
                      인식이 되지 않을 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>              
            </div>
          </div>
          <div class="upload-guide">
            <p>
              <i class="fas fa-file-upload"></i>&nbsp;이제 결과를 업로드해야 하는데요..! <br />
              <span><i class="fas fa-sort-down"></i>&nbsp;주황색 점선에 맞춰, <strong>수평</strong>으로 찍어주세요!<br><strong>* 카메라 4:3 비율 권장</strong></span>
            </p>
            <div class="image-box">
              <img src="@/assets/kitguide/last_pang.png" alt="" />
            </div>
            <p class="last">가로, 세로 모두 한쪽으로 기울어진 느낌 없이 찍어주세요.</p>
          </div>
        </div>
      </div>

      <div class="modal__overlay" @click="close"></div>
    </form>
  </transition>
</template>

<script>
export default {
  name: "BreastTypeSelectModal",
  data() {
    return {};
  },
  methods: {
    close() {
      this.emitter.emit("KitGuideModal", false);
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
      right: 5%;
      font-size: 24px;
      color: $primary;

      &:hover {
        color: $blue;
      }

      @media screen and (max-width: $md-breakpoint) {
        padding: 4px;
        right: 3%;
        top: 5%;
      }
    }
  }

  button {
    position: relative;
    display: flex;
    width: 300px;
    margin: auto;

    @media screen and (max-width: $md-breakpoint) {
      width: 270px;
      margin-top: 32px;
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
    width: 35rem;
    height: 44rem;
    border-radius: 0.4rem;
    overflow: hidden;
    padding: 16px;
    z-index: 5;
    box-shadow: 0px 4px 20px 0px $secondary;
    background-color: rgb(255, 234, 199);
    /* overflow-y: scroll; */

    @media screen and (max-width: $md-breakpoint) {
      width: 20rem;
      height: 38rem;
      padding: 4px;
    }

    @media screen and (max-width: 320px) {
      width: 19rem;
      height: 34rem;
      padding: 4px;
    }

    .container {
      overflow-y: scroll;
      height: 700px;
      padding: 32px 12px 32px 12px;

      /* 시작전에 준비물 설명 부분 */
      .before-start {
        h3 {
          @include text-style(18, $blue-dark);
          padding-left: 12px;
          font-weight: bolder;

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(16, $blue-dark);
          }
        }

        .steps {
          .step {
            background-color: $background;
            border: 1px solid $blue-light;
            border-radius: 8px;
            padding: 4px;
            margin: 16px auto;

            h4 {
              margin-top: 8px;
              @include text-style(16, $primary);
              font-weight: bold;
              text-align: center;
              margin-bottom: 8px;
              span {
                @include text-style(14, $white);
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 50%;
                background-color: $blue;
              }
            }
            .image-box {
              display: flex;
              justify-content: center;
              margin-bottom: 8px;
              img {
                width: 386px;

                @media screen and (max-width: $md-breakpoint) {
                  width: 256px;
                }
              }
            }
            p {
              @include text-style(16, $primary);
              padding: 8px 0;
              text-align: center;
              font-weight: bolder;
              @media screen and (max-width: $md-breakpoint) {
                @include text-style(14, $primary);
              }

              span {
                @include text-style(14, $red);
                font-weight: bold;
                @media screen and (max-width: $md-breakpoint) {
                  @include text-style(13, $red);
                }
              }
            }
          }
        }
      }

      /* 스텝별로 설명하는 부분 */
      .guide {
        .title {
          margin-top: 32px;
          h3,
          p {
            @include text-style(18, $blue-dark);
            padding-left: 12px;
            font-weight: bolder;

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(16, $blue-dark);
            }
          }

          .notice {
            margin: 8px auto;
            background-color: $white;
            border-radius: 8px;
            h4 {
              @include text-style(18, $primary);
              font-weight: bold;

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(16, $primary);
              }
              padding-top: 8px;
              text-align: center;
            }

            p {
              padding: 16px;
              color: $primary;

              span {
                color: $red;
                font-weight: bold;
              }

              .msg {
                font-size: 14px;
                color: $secondary;
              }

              .howlong {
                font-weight: bolder;
                color: $primary;
              }
            }
          }
        }

        .step {
          background-color: $background;
          border: 1px solid $blue-light;
          border-radius: 8px;
          padding: 4px;
          margin: 16px auto;

          .step-title {
            h3 {
              margin-top: 8px;
              @include text-style(24, $blue-dark);
              font-weight: 1000;
              text-align: center;
              margin-bottom: 8px;

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(18, $blue-dark);
              }
            }
          }

          .image-label {
            margin-top: 16px;
            h4 {
              @include text-style(18, $blue-dark);
              text-align: center;
              font-weight: bold;

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(16, $blue-dark);
              }
            }
          }

          .image-box {
            display: flex;
            justify-content: center;
            margin-bottom: 8px;
            img {
              width: 386px;

              @media screen and (max-width: $md-breakpoint) {
                width: 256px;
              }
            }
          }

          .description {
            .content {
              p {
                @include text-style(16, $primary);
                padding: 8px 16px;
                text-align: center;
                font-weight: bolder;
                @media screen and (max-width: $md-breakpoint) {
                  @include text-style(14, $primary);
                }

                i {
                  color: $blue;
                }

                span {
                  @include text-style(16, $red);
                  font-weight: bold;
                  @media screen and (max-width: $md-breakpoint) {
                    @include text-style(14, $red);
                  }
                }
              }
            }

            .notice {
              margin: 8px 16px;
              background-color: $white;
              border-radius: 8px;
              h4 {
                @include text-style(18, $primary);
                font-weight: bold;

                @media screen and (max-width: $md-breakpoint) {
                  @include text-style(16, $primary);
                }
                padding-top: 8px;
                text-align: center;

                span {
                  color: $red;
                  font-weight: bold;
                }
              }
              .box {
                display: flex;
                flex-direction: column;
                padding-top: 8px;
                @media screen and (max-width: $md-breakpoint) {
                }
                .image-box {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  img {
                    width: 168px;
                    padding: 16px;

                    @media screen and (max-width: $md-breakpoint) {
                      width: 114px;
                      /* height: 60px; */
                      padding: 0px;
                    }
                  }
                }

                p {
                  @include text-style(16, $primary);
                  @media screen and (max-width: $md-breakpoint) {
                    @include text-style(13, $primary);
                  }
                  padding: 0px 16px 16px 16px;
                  color: $primary;

                  span {
                    color: $red;
                    font-weight: bold;
                  }

                  .msg {
                    font-size: 14px;
                    color: $secondary;
                  }

                  .howlong {
                    font-weight: bolder;
                    color: $primary;
                  }
                }
              }
            }

            .sub-image {
              display: flex;
              justify-content: center;
              margin-bottom: 8px;
              img {
                width: 386px;

                @media screen and (max-width: $md-breakpoint) {
                  width: 256px;
                }
              }
            }
          }
        }
      }

      /* 업로드 가이드 - 마지막 */
      .upload-guide {
        margin-top: 16px;
        padding-bottom: 32px;
        p {
          @include text-style(18, $primary);
          padding: 4px 18px;
          text-align: center;
          font-weight: bolder;
          @media screen and (max-width: $md-breakpoint) {
            @include text-style(16, $primary);
          }

          span {
            @include text-style(16, $red);
            font-weight: bold;
            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $red);
            }
          }
        }

        .last {
          padding-bottom: 60px;

          @media screen and (max-width: 320px) {
            padding-bottom: 120px;
          }
        }

        .image-box {
          display: flex;
          justify-content: center;
          margin-bottom: 8px;
          img {
            width: 386px;

            @media screen and (max-width: $md-breakpoint) {
              width: 256px;
            }
          }
        }
      }
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

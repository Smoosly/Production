<template>
  <div class="body">
    <div class="form">
      <div class="main-title">
        <span>{{ result.date }}</span>
        <h1>{{ result.username }}&nbsp;님의 가슴 진단 결과</h1>
      </div>
      <!-- breast result -->
      <div class="breast-result">
        <h2 class="result-title">내 가슴 결과</h2>
        <!-- container : size -->
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="container size">
          <div class="container-title">
            <h3><i class="far fa-check-circle"></i>&nbsp;사이즈</h3>
          </div>
          <div class="container-content">
            <p>
              브라 사이즈 공식에 따라,
              <span>{{ result.size }}</span> 사이즈가 도출되었습니다.&nbsp;
              디자인에 따라 사이즈가 조금씩 다르므로 절대적인 정답은 아니랍니다!
            </p>
          </div>
        </div>
        <!-- container : breast underline -->
        <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="container breast-underline">
          <div class="container-title">
            <h3><i class="far fa-check-circle"></i>&nbsp;가슴 밑선</h3>
          </div>
          <div class="container-content">
            <div class="image-box">
              <div class="image-item left">
                <label for="leftImg">왼쪽&nbsp;<i class="fas fa-sort-down"></i></label>
                <img v-if="!result.leftLowerShapeImg" src="@/assets/noImage.png" alt="" />
                <img v-if="result.leftLowerShapeImg" src="/breastTest/getLowerImg/left" id="leftImg" alt="" />
              </div>
              <div class="image-item right">
                <label for="rightImg">오른쪽&nbsp;<i class="fas fa-sort-down"></i></label>
                <img v-if="!result.rightLowerShapeImg" src="@/assets/noImage.png" alt="" />
                <img v-if="result.rightLowerShapeImg" src="/breastTest/getLowerImg/right" id="rightImg" alt="" />
              </div>
              <!-- 응답 X 사진은 응답 미완료 표시 (이미지 칸 중간에 문구 띄우기) -->
            </div>
            <div class="underline-table info-table">
              <!-- column 3 -->
              <div class="left-values">
                <div :class="{ noResult : !result.leftWidth }" class="value">{{ result.leftWidth ? result.leftWidth : "결과 없음" }}</div>
                <div :class="{ noResult : !result.leftInnerCurve }" class="value">{{ result.leftInnerCurve ? result.leftInnerCurve : "결과 없음" }}</div>
                <div :class="{ noResult : !result.leftOuterCurve }" class="value">{{ result.leftOuterCurve ? result.leftOuterCurve : "결과 없음" }}</div>
                <div :class="{ noResult : !result.leftFinish }" class="value long">{{ result.leftFinish ? result.leftFinish : "결과 없음" }}</div>
              </div>
              <!-- column 1 -->
              <div class="table-head">
                <div class="head">너비</div>
                <div class="head">안쪽 곡률</div>
                <div class="head">바깥쪽 곡률</div>
                <div class="head">끝부분 위치</div>
              </div>
              <!-- column 2 -->
              <div class="right-values">
                <div :class="{ noResult : !result.rightWidth }" class="value">{{ result.rightWidth ? result.rightWidth : "결과 없음" }}</div>
                <div :class="{ noResult : !result.rightInnerCurve }" class="value">{{ result.rightInnerCurve ? result.rightInnerCurve : "결과 없음" }}</div>
                <div :class="{ noResult : !result.rightOuterCurve }" class="value">{{ result.rightOuterCurve ? result.rightOuterCurve : "결과 없음" }}</div>
                <div :class="{ noResult : !result.rightFinish }" class="value long">{{ result.rightFinish ? result.rightFinish : "결과 없음" }}</div>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="container fat-range">
          <div class="container-title">
            <h3><i class="far fa-check-circle"></i>&nbsp;지방 분포</h3>
          </div>
          <div class="container-content">
            <div class="area-dist-type">
              <img v-if="result.distAreaName == '돌출형'" src="@/assets/distArea/total_dolchul.png" alt="" />
              <img v-if="result.distAreaName == '고른형'" src="@/assets/distArea/total_gorun.png" alt="" />
              <img v-if="result.distAreaName == '완만형'" src="@/assets/distArea/total_gorun.png" alt="" />
              <div class="detail-info">
                <h4>면적 분포 유형</h4>
                <p>
                  <i class="fas fa-arrow-right"></i>&nbsp;&nbsp;
                  <span>{{ result.distAreaName }}</span>
                </p>
                <p class="details">{{ result.distAreaInfo }}</p>
              </div>
            </div>
            <div class="inout-dist-type">
              <img v-if="result.distInOutName == '안쪽형'" src="@/assets/distArea/inout_in.png" alt="" />
              <img v-if="result.distInOutName == '고른형'" src="@/assets/distArea/inout_gorun.png" alt="" />
              <img v-if="result.distInOutName == '바깥형'" src="@/assets/distArea/inout_out.png" alt="" />
              <div class="detail-info">
                <h4>안밖 분포 유형</h4>
                <p>
                  <i class="fas fa-arrow-right"></i>&nbsp;&nbsp;
                  <span>{{ result.distInOutName }}</span>
                </p>
                <p class="details">{{ result.distInOutInfo }}</p>
              </div>
            </div>
            <div class="updown-dist-type">
              <img v-if="result.distUpDownName == '위쪽형'" src="@/assets/distArea/updown_up.png" alt="" />
              <img v-if="result.distUpDownName == '고른형'" src="@/assets/distArea/updown_gorun.png" alt="" />
              <img v-if="result.distUpDownName == '아래형'" src="@/assets/distArea/updown_down.png" alt="" />
              <div class="detail-info">
                <h4>위아래 분포 유형</h4>
                <p>
                  <i class="fas fa-arrow-right"></i>&nbsp;&nbsp;
                  <span>{{ result.distUpDownName }}</span>
                </p>
                <p class="details">{{ result.distUpDownInfo }}</p>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="container position">
          <div class="container-title">
            <h3><i class="far fa-check-circle"></i>&nbsp;위치 정보</h3>
          </div>
          <div class="container-content">
            <!-- graph -->
            <div class="graph-box">
              <canvas id="myChart" width="266" height="266"></canvas>
            </div>
            <div class="partition"></div>
            <div class="graph-details">
              <div class="detail-item">
                <div class="detail-head">
                  <h4><span>1</span>처짐</h4>
                </div>
                <div class="detail-text">
                  <i class="fas fa-arrow-right"></i>
                  <span>{{ result.sagInfo }}</span>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-head">
                  <h4><span>2</span>유두 벌어짐</h4>
                  <p>( 유두가 바깥을 향하는 정도 )</p>
                </div>
                <div class="detail-text">
                  <i class="fas fa-arrow-right"></i>
                  <span>{{ result.dirInfo }}</span>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-head">
                  <h4><span>3</span>가슴 사이 거리</h4>
                  <p>( 양쪽 가슴이 가까이 붙어져 있는 정도 )</p>
                </div>
                <div class="detail-text">
                  <i class="fas fa-arrow-right"></i>
                  <span>{{ result.gapInfo }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="result.volumeDiff" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="container diff-breast">
          <div class="container-title">
            <h3><i class="far fa-check-circle"></i>&nbsp;짝가슴 여부</h3>
          </div>
          <div class="container-content">
            <div class="diff-table info-table">
              <!-- column 1 -->
              <div class="table-head">
                <div class="head">양쪽 부피 차이</div>
                <div class="head">양쪽 너비 차이</div>
              </div>
              <!-- column 2 -->
              <div class="right-values">
                <div class="value">{{ result.volumeDiff }}</div>
                <div class="value">{{ result.widthDiff }}</div>
              </div>
            </div>
            <div class="detail-text">
              <i class="fas fa-arrow-right"></i>
              <span>{{ result.diffInfo }}</span>
            </div>
          </div>
        </div>
        <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="container result-else">
          <div class="container-title">
            <h3><i class="far fa-check-circle"></i>&nbsp;가슴 외 결과</h3>
          </div>
          <div class="else-table info-table">
            <!-- column 1 -->
            <div class="table-head">
              <div class="head">어깨</div>
              <div class="head">흉곽</div>
              <div class="head">부유방</div>
              <div class="head">살결</div>
            </div>
            <!-- column 2 -->
            <div class="right-values">
              <div class="value">{{ result.shoulder }}</div>
              <div class="value">{{ result.rib }}</div>
              <div class="value">{{ result.accBreast }}</div>
              <div class="value">{{ result.flesh }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- bra review -->
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="bra-review">
        <h2 class="result-title">브라 착용 리뷰</h2>
        <div class="container wearing">
          <div class="container-title">
            <h3>올바르게 입고 있었을까?</h3>
          </div>
          <div class="container-content">
            <p>{{ result.wearing1 }}</p>
            <p>{{ result.wearing2 }}</p>
          </div>
        </div>
        <div class="container hard-to-wear">
          <div class="container-title">
            <h3>이제까지 힘드셨죠?</h3>
          </div>
          <div class="container-content">
            <p>{{ result.hardToWear1 }}</p>
            <p>{{ result.hardToWear2 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="comments">
      <p>내 가슴 결과와 브라 착용 실태를 고려한</p>
    </div>
    <div class="button-container">
      <div class="buttons">
        <button @click="goToRecomBra" type="button" class="btn-primary btn-55">추천브라 보러가기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      result: {
        date: "",
        username: "",

        size: "",

        leftLowerShapeImg: null,
        rightLowerShapeImg: null,

        //왼
        leftWidth: "",
        leftInnerCurve: "",
        leftOuterCurve: "",
        leftFinish: "",

        //오
        rightWidth: "",
        rightInnerCurve: "",
        rightOuterCurve: "",
        rightFinish: "",

        //유형에따른이미지경로
        distAreaImg: null,
        distInOutImg: null,
        distUpDownImg: null,

        //유형명
        distAreaName: "",
        distInOutName: "",
        distUpDownName: "",

        //유형에따른설명
        distAreaInfo: "",
        distInOutInfo: "",
        distUpDownInfo: "",

        //그래프쪽은 아직 보류
        sag: "", //처짐정도, 0,1,2 셋중 하나, 0-하 1-중 2-상, 그래프에 이용
        dir: "", //벌어짐정도 0,1,2 셋중 하나, 0-하 1-중 2-상, 그래프에 이용
        gap: "", //가슴사이거리 0,1,2 셋중 하나, 0-하 1-중 2-상, 그래프에 이용

        //변수 따로 안쓰고 위에꺼 0,1,2에 따라 다르게 해도 되긴 될듯
        // sagDegree: "상", //처짐정도, 상중하
        // dirDegree: "상", //벌어짐정도, 상중하
        // gapDegree: "상", //가슴사이거리, 상중하

        sagInfo: "",
        dirInfo: "",
        gapInfo: "",

        //짝가슴 여부
        volumeDiff: "",
        widthDiff: "",
        diffInfo: "",

        //가슴 외 결과
        shoulder: "",
        rib: "",
        accBreast: "",
        flesh: "",

        //올바르게 입고 있었을까?
        wearing1: "",
        wearing2: "",
        hardToWear1: "",
        hardToWear2: "",
      },
    };
  },
  methods: {
    drawGraph() {
      const ctx = document.getElementById("myChart");
      const myChart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["처짐", "유두 벌어짐", "가슴 사이 거리"],
          datasets: [
            {
              label: `${this.result.username} 님`,
              data: [this.result.sag, this.result.dir, this.result.gap],
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
              labels: {
                fontSize: 18,
              },
            },
          },
          scales: {
            r: {
              pointLabels: {
                fontSize: 16,
              },
              ticks: {
                callback: function (val) {
                  if (val == 0) return "하";
                  else if (val == 1) return "중";
                  else if (val == 2) return "상";
                  else return "";
                },
              },
            },
          },
          scale: {
            min: -1,
            max: 2,
            stepSize: 1,
            pointLabels: {
              fontSize: 14,
              fontStyle: "bold",
            },
            angleLines: {
              display: false,
            },
          },
        },
      });
      console.log(myChart);
    },
    async fetchResultData() {
      await axios.get("/breastTest/getResult")
        .then((result) => {
          // console.log(result.data);
          if (result.data.success) {
            let data = result.data.result[0];
            // console.log(data);
            this.result = data;
            this.drawGraph();
            if (data.distAreaName === "돌출형") this.result.distAreaImg = require("@/assets/dist_area.png");
            else if (data.distAreaName === "고른형") this.result.distAreaImg = require("@/assets/dist_area.png");
            else if (data.distAreaName === "완만형") this.result.distAreaImg = require("@/assets/dist_area.png");
            if (data.distInOutName === "위쪽형") this.result.distInOutImg = require("@/assets/dist_inout.png");
            else if (data.distInOutName === "고른형") this.result.distInOutImg = require("@/assets/dist_inout.png");
            else if (data.distInOutName === "아래형") this.result.distInOutImg = require("@/assets/dist_inout.png");
            if (data.distUpDownName === "안쪽형") this.result.distUpDownImg = require("@/assets/dist_updown.png");
            else if (data.distUpDownName === "고른형") this.result.distUpDownImg = require("@/assets/dist_updown.png");
            else if (data.distUpDownName === "바깥형") this.result.distUpDownImg = require("@/assets/dist_updown.png");
          }
        })
        .catch(console.log);
    },
    goToRecomBra() {
      this.$router.push("result/preview");
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  created() {
    this.fetchResultData();
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button) {
  font-family: $font-main, sans-serif !important;
}
.body {
  /* height: 570vh; */
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 180px;

  @media screen and (max-width: 912px) {
    padding: 40px 8px;
    /* height: 4500px; */
    height: auto;
  }

  .form {
    padding: 24px;
    display: flex;
    justify-content: center;
    box-shadow: 1px 4px 4px 1px $border;
    flex-direction: column;
    background-color: $white;
    width: 100%;
    /* height: 900px; */
    margin-top: 96px;
    @media screen and (max-width: $md-breakpoint - 1px) {
      padding: 16px;
    }

    @media screen and (max-width: 280px) {
      padding: 0px;
    }

    .main-title {
      display: flex;
      justify-content: center;
      flex-direction: column;

      span {
        @include text-style(16, $secondary);
        text-align: center;
        /* margin: 8px; */
      }

      h1 {
        @include text-style(28, $primary);
        text-align: center;
        margin: 8px;

        @media screen and (max-width: 414px) {
          @include text-style(24, $primary);
        }
      }
    }

    .breast-result {
      h2 {
        text-align: center;
      }
    }

    .result-title {
      @include text-style(24, $primary);
      text-align: center;
      margin-top: 32px;

      @media screen and (max-width: 414px) {
        @include text-style(18, $primary);
        font-weight: bold;
        margin-top: 16px;
      }
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      box-shadow: 1px 4px 4px 1px $border;
      flex-direction: column;
      width: 80%;
      background-color: $background;
      margin: 44px auto;
      @media screen and (max-width: $md-breakpoint) {
        width: 97%;
        margin: 28px auto;
      }

      /* &:hover {
          background-color: $background;
          .container-title {
            background-color: $blue;
          }
        } */

      .container-title {
        width: 224px;
        padding: 4px;
        /* margin-top: 16px; */
        border-radius: 16px;
        background-color: $blue-light;
        color: $white;
        box-shadow: 1px 2px 2px 1px $border;
        /* border-bottom: 1px solid $tertiary; */
        h3 {
          @include text-style(18);
          font-weight: bold;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .container-content {
        padding: 0px 16px 16px 16px;
      }
    }

    .size,
    .wearing,
    .hard-to-wear {
      padding: 24px;

      @media screen and (max-width: 414px) {
        padding:  24px 8px 8px 8px;
      }

      /* size container */
      .container-content {
        @include text-style(16, $primary);
        margin-top: 16px;
        text-align: center;

        @media screen and (max-width: $md-breakpoint) {
          @include text-style(14, $primary);
        }

        span {
          @include text-style(18, $blue);
          font-weight: bold;

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(16, $blue);
          }
        }

        p {
          padding: 8px;
          line-height: 180%;

          @media screen and (max-width: 320px) {
            padding: 0;
          }
        }
      }
    }

    .breast-underline {
      padding: 24px;

      .container-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .image-box {
          display: flex;

          @media screen and (max-width: 1027px) {
            width: 100%;
          }

          /* @media screen and (max-width: 320px) {
            width: 90%;
          } */

          .image-item {
            margin: 4px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            label {
              @include text-style(16, $primary);
              text-align: center;
              margin: 4px 0;
            }

            img {
              width: 220px;
              box-shadow: 1px 2px 2px 1px $border;
              background-color: #fff;

              @media screen and (max-width: $md-breakpoint) {
                width: 140px;
              }

              @media screen and (max-width: 320px) {
                width: 120px;
              }
            }
          }
        }

        .info-table {
          display: flex;
          justify-content: center;

          .table-head,
          .right-values,
          .left-values {
            margin-right: 16px;
            /* flex-grow: 1; */

            @media screen and (max-width: $md-breakpoint) {
              margin-right: 8px;
            }

            @media screen and (max-width: 320px) {
              margin-right: 4px;
            }

            .head,
            .value {
              margin: 32px 4px;
              width: 244px;
              text-align: center;

              @media screen and (max-width: $md-breakpoint) {
                margin: 24px 0;
              }
            }

            .head {
              @include text-style(16, $primary);
              font-weight: bold;
              padding: 2px;
              width: 100px;

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(14, $primary);
                width: 80px;
              }
            }

            .value {
              @include text-style(14, $blue);
              border-radius: 16px;
              font-weight: bolder;
              padding: 2px;
              background-color: $white;
              width: 160px;
              height: 28px;

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(14, $blue);
                padding: 2px;
                width: 96px;
              }

              @media screen and (max-width: 320px) {
                width: 80px;
              }
            }

            .noResult {
              color: $secondary;
            }

            .long {
              word-break: keep-all;
              @media screen and (max-width: $md-breakpoint) {
                padding: 2px 8px;
                height: 54px;
              }

              @media screen and (max-width: 320px) {
                /* height: 70px; */
                padding: 2px;
              }
            }
          }

          /* .left-values {
            margin-right: 0px;
          } */
        }
      }
    }

    .fat-range {
      padding: 24px;

      .container-content {
        display: flex;
        flex-direction: column;

        .area-dist-type,
        .inout-dist-type,
        .updown-dist-type {
          display: flex;
          align-items: center;
          margin: 16px 0;

          img {
            width: 164px;
            margin-right: 16px;
            box-shadow: 1px 2px 2px 1px $border;

            @media screen and (max-width: $md-breakpoint) {
              width: 136px;
            }

            @media screen and (max-width: 320px) {
              width: 114px;
            }
          }

          .detail-info {
            display: flex;
            flex-direction: column;

            h4 {
              @include text-style(16, $primary);
              margin-bottom: 16px;
              margin-left: 16px;
              background-color: $white;
              width: 144px;
              border-radius: 16px;
              text-align: center;
              padding: 2px;

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(14, $primary);
                width: 120px;
                margin-bottom: 4px;
                margin-left: 0;
              }
            }

            p {
              margin-left: 16px;
              margin-bottom: 16px;

              @media screen and (max-width: $md-breakpoint) {
                margin-bottom: 4px;
                margin-left: 0;
              }
              i {
                margin-left: 4px;
                color: $primary;

                @media screen and (max-width: $md-breakpoint) {
                  margin-left: 12px;
                  font-size: 14px;
                }
              }
              span {
                @include text-style(18, $blue-dark);
                font-weight: bold;

                @media screen and (max-width: $md-breakpoint) {
                  @include text-style(16, $blue-dark);
                }
              }
            }

            .details {
              @include text-style(16, $primary);
              margin-left: 28px;

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(14, $primary);
                margin-left: 0px;
              }

              @media screen and (max-width: 320px) {
                @include text-style(13, $primary);
              }
            }
          }
        }
      }
    }

    .diff-breast {
      padding: 24px;

      .container-content {
        .info-table {
          display: flex;
          justify-content: center;

          .table-head,
          .right-values {
            margin-right: 44px;
            /* flex-grow: 1; */
            @media screen and (max-width: $md-breakpoint) {
              margin-right: 28px;
            }

            .head,
            .value {
              margin: 32px 0;
              text-align: center;
            }

            .head {
              @include text-style(16, $primary);
              font-weight: bold;
              padding: 2px;
              width: 100px;
            }

            .value {
              @include text-style(16, $blue);
              border-radius: 16px;
              font-weight: bolder;
              padding: 2px;
              background-color: $white;
              width: 160px;
              height: 30px;

              @media screen and (max-width: $md-breakpoint) {
                width: 100px;
              }
            }
          }

          .right-values {
            margin-right: 0px;
          }
        }

        .detail-text {
          margin-top: 16px;
          @include text-style(16, $primary);
          @media screen and (max-width: $md-breakpoint) {
            @include text-style(14, $primary);
            margin-top: 0px;
          }
          i {
            margin-right: 16px;

            @media screen and (max-width: $md-breakpoint) {
              margin-right: 8px;
            }
          }
          span {
            font-weight: bolder;
            border-bottom: 1px solid $tertiary;
            padding: 8px;

            @media screen and (max-width: $md-breakpoint) {
              line-height: 270%;
              /* background-color: white;
                border-bottom: 0px;
                border-radius: 8px; */
            }
          }
        }
      }
    }

    .position {
      padding: 24px;

      .container-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        /* .partition{
            margin-top: 0;
            margin-bottom: 20px;
            border: 0.3px solid $border;
            width: 400px;
            height: 0.6px;
          }   */

        .graph-box {
          margin-top: 16px;
        }

        .graph-details {
          display: flex;
          /* justify-content: center; */
          flex-direction: column;
          background-color: white;
          padding: 32px 64px;
          border-radius: 8px;

          @media screen and (max-width: $md-breakpoint) {
            padding: 16px 20px;
          }

          @media screen and (max-width: 320px) {
            padding: 16px;
            /* width: 100%; */
            justify-content: center;
          }

          .detail-item {
            margin: 8px 0;

            @media screen and (max-width: 320px) {
              width: 216px;
              /* padding: auto 24px; */
            }

            .detail-head {
              span {
                @include text-style(18, $white);
                background-color: $blue;
                color: white;
                padding: 2px 6px;
                border-radius: 50%;
                margin-right: 8px;

                @media screen and (max-width: $md-breakpoint) {
                  @include text-style(16, $white);
                }
              }
              h4 {
                @include text-style(18, $primary);
                font-weight: bolder;
                @media screen and (max-width: $md-breakpoint) {
                  @include text-style(16, $primary);
                }
              }

              p {
                @include text-style(13, $secondary);
                margin-left: 28px;
              }
            }

            .detail-text {
              margin-left: 16px;
              margin-bottom: 16px;
              margin-top: 12px;

              @media screen and (max-width: $md-breakpoint) {
                margin-bottom: 8px;
                margin-top: 8px;
              }
              i {
                margin-left: 16px;
                color: $primary;
                margin-right: 8px;

                @media screen and (max-width: $md-breakpoint) {
                  margin-left: 0px;
                }
              }
              span {
                @include text-style(16, $primary);
                /* font-weight: bold; */
                @media screen and (max-width: $md-breakpoint) {
                  @include text-style(14, $primary);
                }
              }
            }
          }
        }
      }
    }

    .result-else {
      padding: 24px;

      .info-table {
        display: flex;
        justify-content: center;

        .table-head,
        .right-values {
          margin-right: 44px;
          /* flex-grow: 1; */

          @media screen and (max-width: $md-breakpoint) {
            margin-right: 8px;
          }

          .head,
          .value {
            margin: 32px 0;
            text-align: center;

            @media screen and (max-width: $md-breakpoint) {
              margin: 24px 0;
            }
          }

          .head {
            @include text-style(16, $primary);
            font-weight: bold;
            padding: 2px;
            width: 100px;

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $primary);
              width: 60px;
            }
          }

          .value {
            @include text-style(16, $blue);
            border-radius: 16px;
            font-weight: bolder;
            padding: 2px;
            background-color: $white;
            width: 260px;

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $blue);
              width: 216px;
            }

            @media screen and (max-width: 414px) {
              @include text-style(14, $blue);
              width: 196px;
            }

            @media screen and (max-width: 320px) {
              @include text-style(14, $blue);
              width: 180px;
            }
          }
        }

        .right-values {
          margin-right: 0px;
        }
      }
    }
  }

  .comments {
    p {
      @include text-style(14, $secondary);
      margin-top: 32px;
      text-align: center;
    }
  }

  .button-container {
    /* margin: 16px; */
    display: flex;
    justify-content: center;

    button {
      margin: 8px;
      width: 180px;
      @media screen and (max-width: $md-breakpoint) {
        margin: 8px;
        width: 160px;
      }
    }
  }
}
</style>

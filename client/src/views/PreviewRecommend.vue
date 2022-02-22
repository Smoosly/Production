<template>
  <div class="body">
    <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="title">
      <h1>{{ userName }} 님을 위한 브라</h1>
      <p v-if="isRecom">
        {{ userName }}&nbsp;님의 가슴, 그리고 브라 기능과 취향을 <br />
        모두 고려하여 준비했어요! <br />
        <span>하나씩 선택해서, 추천 이유를 확인해 보세요&nbsp;<i class="far fa-smile"></i></span>
      </p>
      <p v-if="!isRecom">
        {{ userName }}&nbsp;님의 가슴, 그리고 브라 기능과 취향을 <br />
        분석하는 중이에요! <br />
        <span>추천이 완료되면 카톡 알림으로 알려드리겠습니다&nbsp;<i class="far fa-smile"></i></span><br />
        <span class="how-long">* 약 7일 소요</span>
      </p>
    </div>
    <!-- when recommend done -->
    <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="isRecom && !isDetailView" class="container">
      <div
        @click="moveToDetail(i)"
        @mouseover="isMouseOver(i)"
        @mouseout="isMouseOut(i)"
        :class="{ mouseOn: isMouseOn[i] == true }"
        v-for="(bra, i) in bra_preview"
        :key="i"
        class="item"
      >
        <div v-if="i == 0 && bra_preview[0]" class="image-box comp">
          <img src="/braRecommend/getImg/bra/1" alt="" />
        </div>
        <div v-if="i == 1 && bra_preview[1]" class="image-box comp">
          <img src="/braRecommend/getImg/bra/2" alt="" />
        </div>
        <div v-if="i == 2 && bra_preview[2]" class="image-box comp">
          <img src="/braRecommend/getImg/bra/3" alt="" />
        </div>
        <div v-if="this.braNum = 4 && i == 3 && bra_preview[3]" class="image-box comp">
          <img src="/braRecommend/getImg/bra/4" alt="" />
        </div>
        <div class="details comp">
          <div class="naming">
            <h3>{{ bra.brandName }}</h3>
            <h2>{{ bra.braName }}</h2>
          </div>
          <div class="tags">
            <span v-for="(tag, i) in bra.tags" :key="i">#{{ tag }}&nbsp;</span>
          </div>
        </div>
        <p class="mouseOn-text" v-if="isMouseOn[i]">상세 보기<br /><i class="fas fa-book-open"></i></p>
      </div>
    </div>
    <!-- when recommend not done -->
    <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="!isRecom && !isDetailView" class="container">
      <!-- 개발 하는 동안만 아래 클릭이벤트 적용 / 완료후 지우기  -->
      <div v-for="idx in 4" :key="idx" class="item">
        <div class="image-box comp">
          <img src="@/assets/bras/bra4.png" alt="" />
        </div>
        <div class="details comp">
          <div class="loading">
            <h2>준비 중..</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- 브라 상세 클릭하면 상세 화면 컴포넌트 -->
    <ProductDetail v-if="isDetailView" :userName_="userName" :index_="index" :braDetails_="braDetails"></ProductDetail>

    <div class="home-tryon">
      <div class="description">
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="title">
          <h3>그럼에도, 무엇을 살지 고민된다면?</h3>
          <h2><span>홈 피팅 서비스</span>를 이용해보세요!</h2>
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="contents">
          <p>
            <span>홈 피팅 서비스란?</span>
            추천된 브라들을 구매하기 전에, <br />
            집에서 미리 입어볼 수 있도록 해주는 서비스입니다. <br />
            <br />
            매장에 직접 가봐야 하는 번거로움과, <br />
            온라인 쇼핑 시 발생되는 환불비를 줄여 <br />
            브라 구매에 대한 시행착오를 최대한 줄이고자 합니다.
          </p>
          <div class="image-box">
            <img src="@/assets/homedeliver.png" alt="" />
          </div>
          <div class="warning">
            <p>
              택배 개봉시, 반송해야 하므로 비닐이 찢어지지 않도록 해주세요. <br />
              <span>위의 사항이 모두 숙지되었다면, 홈 피팅 신청하기를 눌러주세요!</span>
            </p>
          </div>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="button-box">
        <button v-if="!isOrderedHomeserv && isRecom" @click="this.$router.push('/homefitting/order')" type="button" class="btn-primary btn-55">
          홈 피팅 서비스 신청하기
        </button>
        <button v-if="!isOrderedHomeserv && !isRecom" type="button" class="btn-primary btn-55" disabled>
          홈 피팅 서비스 준비 중&nbsp;<i class="fas fa-ellipsis-h"></i>
        </button>
        <button v-if="isOrderedHomeserv" type="button" class="btn-primary btn-55" disabled>홈 피팅 서비스 신청 완료&nbsp;<i class="fas fa-check"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductDetail from "@/components/ProductDetail.vue";

export default {
  data() {
    return {
      // 홈 피팅 서비스 신청여부
      isOrderedHomeserv: false,
      // 상세정보 전체 배열
      index: 0,
      naviClicked: false,
      braDetails: [
        {
          braInfo: {
            braName: "",
            tagNum: 0,
            tags: [],
            brandName: "",
            price: "",
            recomSize: [],
            color: [],
            // 페이지 내 이동(id)해서 링크 부분으로 이동시키기
            link: [], // 색깔 배열과 동일하게
          },
          breastMatch: {
            breastLowerShape: 0,
            braLowerShape: 0,
            rip: {
              type: null, // 0-> 해당없음, 1->오목, 2->새
              content1: "",
              content2: "",
            },
          },
          funcMatch: {
            bigger: [],
            gather: [],
            pushup: [],
            under: [],
            accBreast: [],
            accBack: [],

            //없는 경우는 Null
            cupShape: {
              title: "",
              content: "",
            },

            //없는 경우는 Null
            cover: {
              title: "",
              content: "",
            },

            //항상
            bbong: {
              title: "",
              value: {
                thick: "",
                detachThick: "",
                loc: 0,
                locString: "", //아래, 옆아래, 전체
              },
              content: "",
            },

            //항상
            wing: {
              title: "", //넓지 않은 날개 (괄호안에 값+cm)
              content: "",
              value: 0,
            },

            //항상
            sidebone: {
              title: "", //(괄호안에 값+개)
              content: "",
              value: 0,
            },

            //없는 경우는 Null
            shoulderStrap: {
              title: "",
              content: "",
            },
          },
          addInfo: {
            //항상
            wire: {
              title: "",
              content: "",
            },

            //없는 경우는 null
            cupShape: {
              title: "",
              content: "",
              value: 1,
            },

            //없는 경우는 null
            cupType: {
              title: "",
              content: "",
              value: 1,
            },

            //항상
            hookEye: {
              title: "",
              content: "",
              value: {
                hook: 0,
                eye: 0,
              },
            },
          },
        },
        {
          braInfo: { braName: "", tagNum: 0, tags: [], brandName: "", price: "", recomSize: [], color: [], link: [] },
          breastMatch: { breastLowerShape: 0, braLowerShape: 0, rip: { type: null, content1: "", content2: "" } },
          funcMatch: {
            bigger: [],
            gather: [],
            pushup: [],
            under: [],
            accBreast: [],
            accBack: [],
            cupShape: { title: "", content: "" },
            cover: { title: "", content: "" },
            bbong: { title: "", value: { thick: 0, loc: 0, locString: "", detach: "" }, content: "" },
            wing: { title: "", content: "", value: 0 },
            sidebone: { title: "", content: "", value: 0 },
            shoulderStrap: { title: "", content: "" },
          },
          addInfo: {
            wire: { title: "", content: "" },
            cupShape: { title: "", content: "", value: 1 },
            cupType: { title: "", content: "", value: 1 },
            hookEye: { title: "", content: null, value: { hook: 0, eye: 0 } },
          },
        },
        {
          braInfo: { braName: "", tagNum: 0, tags: [], brandName: "", price: "", recomSize: [], color: [], link: [] },
          breastMatch: { breastLowerShape: 0, braLowerShape: 0, rip: { type: null, content1: "", content2: "" } },
          funcMatch: {
            bigger: [],
            gather: [],
            pushup: [],
            under: [],
            accBreast: [],
            accBack: [],
            cupShape: { title: "", content: "" },
            cover: { title: "", content: "" },
            bbong: { title: "", value: { thick: 0, loc: 0, locString: "", detach: "" }, content: "" },
            wing: { title: "", content: "", value: 0 },
            sidebone: { title: "", content: "", value: 0 },
            shoulderStrap: { title: "", content: "" },
          },
          addInfo: {
            wire: { title: "", content: "" },
            cupShape: { title: "", content: "", value: 1 },
            cupType: { title: "", content: "", value: 1 },
            hookEye: { title: "", content: null, value: { hook: 0, eye: 0 } },
          },
        },
        {
          braInfo: { braName: "", tagNum: 0, tags: [], brandName: "", price: "", recomSize: [], color: [], link: [] },
          breastMatch: { breastLowerShape: 0, braLowerShape: 0, rip: { type: null, content1: "", content2: "" } },
          funcMatch: {
            bigger: [],
            gather: [],
            pushup: [],
            under: [],
            accBreast: [],
            accBack: [],
            cupShape: { title: "", content: "" },
            cover: { title: "", content: "" },
            bbong: { title: "", value: { thick: 0, loc: 0, locString: "", detach: "" }, content: "" },
            wing: { title: "", content: "", value: 0 },
            sidebone: { title: "", content: "", value: 0 },
            shoulderStrap: { title: "", content: "" },
          },
          addInfo: {
            wire: { title: "", content: "" },
            cupShape: { title: "", content: "", value: 1 },
            cupType: { title: "", content: "", value: 1 },
            hookEye: { title: "", content: null, value: { hook: 0, eye: 0 } },
          },
        },
      ],

      // others used here
      isMouseOn: [false, false, false, false],
      isDetailView: false,
      userName: "",
      isRecom: false,
      braNum: 0,
      bra_preview: [
        { brandName: "", braName: "", tagNum: 0, tags: [] },
        { brandName: "", braName: "", tagNum: 0, tags: [] },
        { brandName: "", braName: "", tagNum: 0, tags: [] },
        { brandName: "", braName: "", tagNum: 0, tags: [] },
      ],
    };
  },
  components: {
    ProductDetail,
  },
  methods: {
    isMouseOver(idx) {
      this.isMouseOn[idx] = true;
    },
    isMouseOut(idx) {
      this.isMouseOn[idx] = false;
    },
    moveToDetail(i) {
      // 클릭한 해당 브라 정보 fetch 하기 braInfo, breastMatch, funcMatch, addInfo
      this.isMouseOut(i);
      this.index = i;
      console.log(this.braDetails[this.index]);
      // this.drawGraph(i)
      this.isDetailView = true;
      axios.put(`/braRecommend/braCheck/${i}`);
    },
    fetchIsRecom() {
      axios
        .get("/braRecommend/isRecom")
        .then((result) => {
          console.log(result.data);
          this.isRecom = result.data.isRecom;
          this.userName = result.data.userName;
          if (result.data.success && result.data.isRecom) {
            this.fetchBraDetails();
          } else {
            console.log(result.data.message);
          }
        })
        .catch(console.log);
    },
    // fetchRecomBra() {
    //   axios
    //     .get("/braRecommend/getPreview")
    //     .then((result) => {
    //       console.log(result.data);
    //       if (result.data.success) {
    //         this.braNum = result.data.braNum;
    //         this.isOrderedHomeserv = result.data.isOrderedHomeserv;
    //         this.bra_preview = result.data.preview;
    //         this.fetchBraDetails();
    //       } else {
    //         console.log(result.data.message);
    //         if (Object.keys(result.data).includes("isRecom") && result.data.isRecom === false) {
    //           this.isRecom = result.data.isRecom;
    //           this.userName = result.data.userName;
    //           return;
    //         }
    //         return;
    //       }
    //     })
    //     .catch(console.log);
    // },
    fetchBraDetails() {
      axios
        .get("/braRecommend/getBraDetails")
        .then((result) => {
          console.log(result.data);
          if (!result) {
            return;
          }
          if (result.data.success) {
            console.log(result.data.message);
            this.braNum = result.data.braNum;
            this.isOrderedHomeserv = result.data.isOrderedHomeserv;
            this.bra_preview = result.data.preview;
            this.braDetails = result.data.braDetails;
          } else {
            console.log(result.data.message);
          }
        })
        .catch(console.log);
    },
  },
  watch: {
    $route(to, from) {
      console.log(from);
      if (to.name !== "PreviewRecommend" && this.isDetailView && !this.naviClicked) {
        console.log("hi");
        this.$router.push("/survey/result/preview");
        this.isDetailView = false;
      }
    },
  },
  created() {
    this.fetchIsRecom();
  },
  mounted() {
    window.scrollTo(0, 0);
    this.emitter.on("seeBasicView", (state) => {
      this.isDetailView = state;
    });

    this.emitter.on("Navi", (state) => {
      this.naviClicked = state;
    });
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button) {
  font-family: $font-main, sans-serif !important;
}
.body {
  /* height: 600vh; */
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 240px;
  // padding 원래 120 180 이었음 해보고 수정 다시

  @media screen and (max-width: 1024px) {
    padding: 120px 180px;
    /* height: 4500px; */
    height: auto;
  }

  @media screen and (max-width: 980px) {
    padding: 120px 100px;
    /* height: 4500px; */
    height: auto;
  }

  @media screen and (max-width: $md-breakpoint) {
    padding: 120px 150px;
    /* height: 4500px; */
    height: auto;
  }

  @media screen and (max-width: 700px) {
    padding: 96px 80px;
    /* height: 4500px; */
    height: auto;
  }

  @media screen and (max-width: 550px) {
    padding: 96px 8px;
    /* height: 4500px;   
    height: auto;  */
  }

  @media screen and (max-width: 360px) {
    padding: 96px 8px;
    /* height: 4800px; */
    height: auto;
  }

  .title {
    margin-bottom: 32px;
    h1 {
      @include text-style(24, $primary);
      font-weight: bold;
      text-align: center;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(18, $primary);
      }
    }

    p {
      @include text-style(16, $primary);
      text-align: center;
      margin-top: 8px;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(14, $primary);
      }

      i {
        color: $blue;
      }

      .how-long {
        @include text-style(14, $red);
        font-weight: bold;
      }
    }
  }

  .container {
    width: 100%;
    /* background-color: $white; */
    border-radius: 8px;
    /* padding: 0 4px; */
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 30px 100px;

    @media screen and (max-width: 1118px) {
      padding: 30px;
    }

    @media screen and (max-width: $md-breakpoint) {
      padding: 30px 32px;
    }

    @media screen and (max-width: 414px) {
      padding: 0 12px;
    }

    @media screen and (max-width: 375px) {
      padding: 0;
    }

    @media screen and (max-width: 360px) {
      padding: 0 44px;
    }

    .item {
      width: 224px;
      background-color: $white;
      border-radius: 8px;
      box-shadow: 0px 3px 7px 0px $tertiary;
      margin: 24px;
      flex-grow: 0;
      display: flex;
      flex-direction: column;
      cursor: pointer;

      @media screen and (max-width: $md-breakpoint) {
        margin: 8px;
        width: 158px;
      }

      @media screen and (max-width: 360px) {
        flex-grow: 1;
        display: flex;
        justify-content: center;
      }
      /* .comp {
        flex-grow: 1;
      } */

      .image-box {
        display: flex;
        justify-content: center;
        padding: 8px;
        /* width: 224px; */

        @media screen and (max-width: $md-breakpoint) {
          /* width: 150px; */
        }
        img {
          width: 200px;
          height: 170px;

          @media screen and (max-width: $md-breakpoint) {
            width: 120px;
            height: 100px;
          }
        }
      }

      .details {
        display: flex;
        padding: 8px 16px;
        height: 150px;
        background-color: #dfdfdf;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        justify-content: center;
        flex-direction: column;
        // align-items: flex-start;

        @media screen and (max-width: $md-breakpoint) {
          padding: 8px 8px;
          // height: 140px;
        }

        @media screen and (max-width: 412px) {
          height: 168px;
        }

        @media screen and (max-width: 360px) {
          padding: 8px 16px;
          height: 144px;
        }

        @media screen and (max-width: 280px) {
          height: 180px;
        }

        .naming {
          display: flex;
          align-items: flex-start;
          flex-direction: column;

          h3 {
            @include text-style(14, $primary);
            @media screen and (max-width: $md-breakpoint) {
              @include text-style(13, $primary);
            }
          }
          h2 {
            @include text-style(16, $primary);
            font-weight: bold;
            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $primary);
            }
          }
        }

        .loading {
          h2 {
            text-align: center;
            @include text-style(16, $primary);
            font-weight: bold;

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $primary);
            }
          }
        }

        .tags {
          @include text-style(14, $blue-dark);
          font-weight: bold;
          margin-top: 8px;

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(13, $blue-dark);
          }

          span {
            /* background: #ffd19d;
						color: white; */
            font-weight: bold;
            display: inline-block;
            /* padding: 4px 6px;
						margin-right: 4px;
						border-radius: 16px; */
          }
        }
      }
    }

    .mouseOn {
      opacity: 0.8;
      position: relative;

      .mouseOn-text {
        @include text-style(18, $blue-dark);
        text-align: center;
        @media screen and (max-width: $md-breakpoint) {
          @include text-style(16, $blue-dark);
        }
        font-weight: bold;
        position: absolute;
        left: 50%;
        top: 50%;

        transform: translate(-50%, -50%);
      }
    }
  }

  /* 상세 컨테이너 css */

  .container-box {
    background-color: $border;
    padding: 16px;
    margin: 0px 64px;
    border-radius: 8px;

    @media screen and (max-width: $md-breakpoint) {
      padding: 8px;
      margin: 0px;
    }

    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;

      .goback {
        font-size: 24;
        color: $primary;
        position: absolute;
        left: 2%;
        display: flex;
        align-items: center;

        &:hover {
          color: $tertiary;
        }

        span {
          @include text-style(16, primary);
          font-weight: bold;
          @media screen and (max-width: $md-breakpoint) {
            @include text-style(14, primary);
          }
        }
      }

      h2 {
        @include text-style(18, $primary);
        text-align: center;
        font-weight: bold;
        @media screen and (max-width: $md-breakpoint) {
          @include text-style(16, $primary);
        }
      }
    }

    .bra-info {
      background-color: $white;
      margin: 16px 32px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      flex-direction: column;

      @media screen and (max-width: $md-breakpoint) {
        margin: 16px 8px;
      }
      .image-box {
        display: flex;
        justify-content: center;
        padding: 8px;
        img {
          width: 200px;
        }
      }

      .bra-name {
        display: flex;
        background-color: $background;
        margin: 8px;
        padding: 8px;
        justify-content: center;
        flex-direction: column;

        h3 {
          @include text-style(18, $primary);
          font-weight: bold;
          text-align: center;
          @media screen and (max-width: $md-breakpoint) {
            @include text-style(16, $primary);
          }
        }

        p {
          text-align: center;
          margin-top: 4px;
          span {
            @include text-style(16, $blue-dark);
            font-weight: bold;

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $blue-dark);
            }
          }
        }
      }
    }

    .details {
      background-color: $white;
      margin: 16px 32px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      flex-direction: column;

      @media screen and (max-width: $md-breakpoint) {
        margin: 16px 8px;
      }
      table {
        padding: 16px 32px;

        @media screen and (max-width: $md-breakpoint) {
          padding: 16px;
        }
        tr {
          th {
            display: flex;
            align-content: flex-start;
            font-weight: bold;
            @include text-style(16, $secondary);
            width: 88px;
            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $secondary);
            }
          }

          td {
            @include text-style(16, $primary);
            font-weight: bold;
            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $primary);
            }
            .msg {
              @include text-style(14, $red);

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(13, $red);
              }
            }

            span {
              font-weight: bold;
              margin-right: 1px;
            }
          }
        }
      }

      .button-box {
        display: flex;
        padding: 8px;
        justify-content: center;
        button {
          width: 144px;
        }
      }
    }

    .breast-fit {
      .breast-fit-title {
        margin-left: 32px;
        margin-top: 32px;
        display: flex;
        align-items: center;

        @media screen and (max-width: $md-breakpoint) {
          margin-left: 16px;
        }
        h3 {
          @include text-style(18, $primary);
          font-weight: bold;

          span {
            @include text-style(18, $red);
            font-weight: bold;
          }
        }

        i {
          color: $primary;
        }
      }

      .breast-under {
        background-color: $white;
        margin: 16px 32px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        flex-direction: column;

        @media screen and (max-width: $md-breakpoint) {
          margin: 16px 8px;
        }

        .breast-under-graph {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;

          @media screen and (max-width: $md-breakpoint) {
            flex-direction: column;
          }

          .graph-box {
            display: inline-flex;
            margin: 8px;
            margin-left: 16px;

            width: auto;
            border-right: 3px solid $blue-light;
            border-left: 3px solid $blue-light;

            .image-box {
              display: inline-flex;
              flex-direction: column;

              .user-image-box {
                display: inline-flex;
                justify-content: center;
                z-index: 2;
                img {
                  border-left: 3px solid $red;
                  border-right: 3px solid $red;
                  /* margin-left: px; */
                }
              }
            }
          }

          .description_ {
            p {
              @include text-style(14, $primary);
              font-weight: bold;
              margin-left: 8px;
            }
          }
        }

        .description {
          padding: 16px 32px;

          @media screen and (max-width: $md-breakpoint) {
            padding: 16px;
          }
          .title {
            display: flex;
            justify-content: center;
            h4 {
              @include text-style(16, $white);
              font-weight: bold;
              box-shadow: 1px 2px 2px 1px $border;
              /* margin-left: 8px */
              text-align: center;
              margin-bottom: 8px;
              padding: 8px 16px;
              border-radius: 16px;
              width: 120px;
              background-color: $blue-light;
            }
          }

          p {
            @include text-style(14, $primary);
          }
        }
      }

      .rib {
        background-color: $white;
        margin: 16px 32px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 16px 32px;

        @media screen and (max-width: $md-breakpoint) {
          margin: 16px 8px;
          padding: 16px;
        }

        .rib-title {
          display: flex;
          justify-content: center;
          h4 {
            @include text-style(16, $white);
            font-weight: bold;
            box-shadow: 1px 2px 2px 1px $border;
            /* margin-left: 8px */
            text-align: center;
            margin-bottom: 8px;
            padding: 8px 16px;
            border-radius: 16px;
            width: 120px;
            background-color: $blue-light;
          }
        }

        .detail-box {
          display: flex;
          flex-direction: column;

          .detail {
            /* flex-grow: 1; */
            display: flex;
            flex-direction: column;
            margin-bottom: 8px;
            .image-box {
              display: flex;
              justify-content: center;
              img {
                width: 256px;
                padding: 16px;

                @media screen and (max-width: $md-breakpoint) {
                  width: 144px;
                }
              }
            }

            p {
              @include text-style(14, $primary);
              padding: 0 16px;
            }
          }
        }
      }
    }

    .func-fit {
      .func-fit-title {
        margin-left: 32px;
        margin-top: 32px;
        display: flex;
        align-items: center;

        @media screen and (max-width: $md-breakpoint) {
          margin-left: 16px;
        }
        h3 {
          @include text-style(18, $primary);
          font-weight: bold;

          span {
            @include text-style(18, $red);
            font-weight: bold;
          }
        }

        i {
          color: $primary;
        }
      }

      .func-fit-graph {
        background-color: $white;
        margin: 16px 32px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 16px 32px;
        position: relative;

        @media screen and (max-width: $md-breakpoint) {
          margin: 16px 8px;
          padding: 16px;
        }

        .graph-values {
          position: absolute;
          right: 16%;
          height: 80%;
          /* margin-top: 32px; */
          display: flex;
          flex-direction: column;
          z-index: 20;

          @media screen and (max-width: $md-breakpoint) {
            height: 70%;
          }

          .value {
            display: flex;
            align-items: center;
            flex-grow: 1;

            h5 {
              @include text-style(16, $primary);
              font-weight: bold;

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(14, $primary);
              }
            }
          }
        }
      }

      .func-why-description {
        background-color: $white;
        margin: 16px 32px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 16px 32px;

        @media screen and (max-width: $md-breakpoint) {
          margin: 16px 8px;
          padding: 16px;
        }

        .description-title {
          display: flex;
          justify-content: center;

          h4 {
            @include text-style(16, $white);
            font-weight: bold;
            box-shadow: 1px 2px 2px 1px $border;
            /* margin-left: 8px */
            text-align: center;
            margin-bottom: 8px;
            padding: 8px 8px;
            border-radius: 16px;
            width: 256px;
            background-color: $blue-light;
          }
        }

        .cup-shape,
        .cover,
        .bbong,
        .wing,
        .side-bone,
        .shoulder-strap {
          display: flex;
          margin: 8px 0;
          flex-direction: column;

          .key-word {
            h5 {
              @include text-style(16, $blue-dark);
              font-weight: bold;
              margin-bottom: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              /* margin-left: 4px; */
              text-align: center;
            }
          }
          .box {
            display: flex;

            @media screen and (max-width: 414px) {
              flex-direction: column;
              justify-content: center;
            }
            .image-box {
              display: flex;
              align-items: center;
              @media screen and (max-width: 375px) {
                /* flex-direction: column; */
                justify-content: center;
                margin: 4px;
              }
              img {
                width: 120px;
                margin-right: 16px;
                @media screen and (max-width: $md-breakpoint) {
                  width: 92px;
                  margin-right: 8px;
                }

                /* @media screen and (max-width: 375px) {
                  width: 80px;
                  margin-right: 8px;
                } */
              }
            }

            .description {
              background-color: $background;
              display: flex;
              align-items: center;
              flex: 1;
              padding: 2px 12px;
              border-radius: 8px;

              .contents {
                p {
                  @include text-style(16, $primary);
                  @media screen and (max-width: $md-breakpoint) {
                    @include text-style(13, $primary);
                  }
                }
              }
            }
          }
        }

        .bbong {
          .box {
            .description {
              display: flex;
              flex-direction: column;
              .contents {
                p {
                  span {
                    padding: 2px 4px;
                    text-align: center;
                    font-weight: bold;
                  }
                }
              }

              .message {
                p {
                  @include text-style(13, $secondary);
                  margin-top: 4px;
                  /* font-weight: bold; */
                }
              }
            }
          }
        }
      }
    }

    .add-info {
      .add-info-title {
        margin-left: 32px;
        margin-top: 32px;
        display: flex;
        align-items: center;

        @media screen and (max-width: $md-breakpoint) {
          margin-left: 16px;
        }
        h3 {
          @include text-style(18, $primary);
          font-weight: bold;
        }
      }

      .add-description {
        background-color: $white;
        margin: 16px 32px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 16px 32px;

        @media screen and (max-width: $md-breakpoint) {
          margin: 16px 8px;
          padding: 16px;
        }
        .wire,
        .cupShape,
        .cupType,
        .hookEye {
          display: flex;
          margin: 8px 0;
          flex-direction: column;

          .key-word {
            h5 {
              @include text-style(16, $blue-dark);
              font-weight: bold;
              margin-bottom: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              /* margin-left: 4px; */
              text-align: center;
            }
          }
          .box {
            display: flex;
            /* width: 100%; */

            @media screen and (max-width: 414) {
              flex-direction: column;
              justify-content: center;
            }
            .image-box {
              display: flex;
              align-items: center;
              @media screen and (max-width: 375px) {
                /* flex-direction: column; */
                justify-content: center;
                margin: 4px;
              }
              img {
                width: 120px;
                margin-right: 16px;
                @media screen and (max-width: $md-breakpoint) {
                  width: 92px;
                  margin-right: 8px;
                }

                /* @media screen and (max-width: 375px) {
                  width: 80px;
                  margin-right: 8px;
                } */
              }
            }

            .description {
              background-color: $background;
              display: flex;
              align-items: center;
              flex: 1;
              padding: 2px 12px;
              border-radius: 8px;
              /* width: 100%; */

              .contents {
                p {
                  @include text-style(16, $primary);
                  @media screen and (max-width: $md-breakpoint) {
                    @include text-style(13, $primary);
                  }
                }
              }
            }
          }
        }
      }
    }

    .purchase-links {
      .purchase-links-title {
        margin-left: 32px;
        margin-top: 32px;
        display: flex;
        align-items: center;

        @media screen and (max-width: $md-breakpoint) {
          margin-left: 16px;
        }
        h3 {
          @include text-style(18, $primary);
          font-weight: bold;

          span {
            @include text-style(18, $red);
            font-weight: bold;
          }
        }

        i {
          color: $primary;
        }
      }

      .contents {
        background-color: $white;
        margin: 16px 32px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        /* flex-direction: column; */
        padding: 16px 32px;

        @media screen and (max-width: $md-breakpoint) {
          margin: 16px 8px;
          padding: 16px;
        }

        a {
          @include text-style(14, $white);
          font-weight: bold;
          background-color: $blue-dark;
          margin-right: 8px;

          padding: 4px 8px;
          border-radius: 8px;

          &:hover {
            background-color: $blue-light;
          }
        }
      }
    }
  }

  /* 상세 컨테이너 css end */

  .spinner-box {
    display: flex;
    margin: 120px auto;
    align-items: center;
    justify-content: center;
  }

  .home-tryon {
    width: 100%;
    /* margin-top: 24px; */
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .description {
      margin: 32px 0px;
      .title {
        h3 {
          @include text-style(16, $primary);
          /* font-weight: bold; */
          text-align: center;

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(14, $primary);
          }
        }

        h2 {
          @include text-style(24, $primary);
          /* font-weight: bold; */
          text-align: center;

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(18, $primary);
          }

          span {
            color: $blue-dark;
            font-weight: bold;
          }
        }
      }

      .contents {
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: $white;

        padding: 16px 8px;
        p {
          @include text-style(16, $primary);
          text-align: center;
          margin-top: 8px;

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(14, $primary);
          }
        }

        .image-box {
          display: flex;
          justify-content: center;
          margin: 24px 0;
          img {
            width: 400px;

            @media screen and (max-width: $md-breakpoint) {
              width: 256px;
            }
          }
        }

        .warning {
          p {
            /* padding: 0 64px; */
            span {
              @include text-style(14, $red);

              @media screen and (max-width: $md-breakpoint) {
                @include text-style(13, $red);
              }
            }
          }
        }
      }
    }

    .button-box {
      width: 100%;
      display: flex;
      margin: 8px;
      justify-content: center;

      button {
        width: 256px;
      }
    }
  }
}
</style>

<template>
  <div class="body">
    <div class="progressbar-container">
      <ProgressBar :percentage="percentage" />
    </div>
    <div class="question-title">
      <h3>
        {{ page[0].flow_txt }}<br />
        <strong>가슴 응답이 완료되었습니다. 브라 취향에 대해 알아보아요.</strong>
      </h3>
    </div>
    <div class="question-container">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="700" class="slider">
        <div class="title">Q. {{ page[0].question_txt }}</div>
        <div class="container">
          <vue-slider :tooltip-style="{ backgroundColor: '#FFD07F', borderColor: '#FFD07F' }" :process-style="{ backgroundColor: 'orange' }" railStyle="height: 20px; width: 256px;" v-model="value" :marks="marks" :included="true" :tooltip-formatter="formatter">
            <template v-slot:label="{ active, value }">
              <div :class="['vue-slider-mark-label', 'custom-label', { active }]">{{ value / 10 }}</div>
            </template>
          </vue-slider>
        </div>
        <div class="label-box">
          <span>안입은 듯 한</span>
          <span>꽉 잡아주는</span>
        </div>
      </div>
    </div>
    <div class="button-container">
      <div class="buttons">
        <button type="button" @click="goBack" class="btn-secondary btn-55 prev-btn">이전</button>
        <button type="button" @click="goNext" class="btn-primary btn-55 next-btn">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar.vue";
import { survey, page_info } from "../../Survey";
import axios from "axios";
import VueSlider from "vue-slider-component";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";

export default {
  data() {
    return {
      process: (dotsPos) => [[dotsPos[0], { backgroundColor: "orange" }]],
      paging: page_info,
      survey: survey,
      page: survey.page11,
      percentage: 0,
      value: 0,
      marks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      formatter: (v) => `${v / 10}`,
    };
  },
  components: {
    ProgressBar,
    VueSlider,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    setValue(value) {
      this.value = value;
    },
    goBack() {
      const answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.value / 10,
      };
      axios
        .post("/breastTest/save/11", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/10");
        })
        .catch(console.log);
    },
    goNext() {
      if (this.value === null) {
        return this.emitter.emit("showRedToast", "답변을 입력해주세요");
      }
      const answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.value / 10,
      };
      axios
        .post("/breastTest/save/11", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/12");
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      axios
        .get("/breastTest/getData/11")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            const ans1 = result.data.record[this.page[0].column];
            ans1 === null || this.setValue(ans1 * 10);
          }
        })
        .catch(console.log);
    },
    fetchProgress() {
      axios
        .get("/breastTest/getProgress")
        .then((result) => {
          console.log(result.data);
          this.percentage = result.data.Progress;
        })
        .catch(console.log);
    },
  },
  created() {
    this.fetchAnswerInfo();
    this.fetchProgress();
  },
};
</script>

<style lang="scss" scoped>
.body {
  // height: 160vh;
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 100px;

  @media screen and (max-width: $md-breakpoint) {
    padding: 90px 16px;
    // height: 1400px;
    height: auto;
  }

  .question-container {
    margin-top: 24px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: auto;
  }

  .question-title {
    // margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    h3 {
      @include text-style(16, $secondary);
      text-align: center;
      width: 256px;
      // border: 2px solid $blue;
      padding: 8px 16px;
      font-weight: 600;
      border-radius: 8px;
      background-color: $white;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(14, $secondary);
        // margin-top: 8px;
      }
    }

    strong {
      @include text-style(14, $secondary);
      font-weight: 400;
      text-align: center;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(13, $secondary);
      }
    }
  }

  .container {
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .button-container {
    margin: 16px;
    display: flex;
    justify-content: center;

    button {
      margin: 8px;
      width: 144px;
      @media screen and (max-width: $md-breakpoint) {
        margin: 4px;
        width: 100px;
      }
    }
  }

  .single-select {
    /* width: 80%; */
    .title {
      @include text-style(18, $white);
      /* margin-right: 16px; */
      width: 100%;
      text-align: center;
      background-color: $blue;
      color: $white;
      padding: 8px;
      font-weight: 700;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      /* margin-top: 8px; */
      @media screen and (max-width: $md-breakpoint) {
        @include text-style(18, $white);
      }
    }
    background-color: $white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    margin: 32px;
    border-radius: 8px;
    box-shadow: 1px 4px 4px 1px $border;

    @media screen and (max-width: $md-breakpoint) {
      @include text-style(14, $primary);
      width: 330px;
      margin: 16px 8px;
    }

    @media screen and (max-width: 320px) {
      flex-direction: column;
      width: 300px;
      margin: 16px 8px;
      @include text-style(14, $primary);
    }
  }

  .slider {
    .title {
      @include text-style(18, $white);
      /* margin-right: 16px; */
      width: 100%;
      text-align: center;
      background-color: $blue;
      color: $white;
      padding: 8px;
      font-weight: 700;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      /* margin-top: 8px; */
      @media screen and (max-width: $md-breakpoint) {
        @include text-style(18, $white);
      }
    }

    background-color: $white;
    /* display: flex;  */
    /* flex-direction: column;  */
    /* justify-content: center;  */
    /* align-items: center;  */
    width: 600px;
    margin: 32px;
    border-radius: 8px;
    box-shadow: 1px 4px 4px 1px $border;

    @media screen and (max-width: $md-breakpoint) {
      @include text-style(14, $primary);
      width: 330px;
      margin: 16px 8px;
    }

    @media screen and (max-width: 320px) {
      flex-direction: column;
      width: 300px;
      margin: 16px 8px;
      @include text-style(14, $primary);
    }
    @media screen and (max-width: 280px) {
      flex-direction: column;
      width: 260px;
      margin: 16px 4px;
      @include text-style(14, $primary);
    }

    .vue-slider {
      margin-top: 16px;
    }

    height: 200px;

    .label-box {
      @include text-style(14, $secondary);
      width: 264px;
      margin: 4px auto;
      display: flex;
      justify-content: space-between;
      bottom: -10%;

      @media screen and (max-width: 820px) {
        @include text-style(13, $secondary);
      }
    }
  }

  .answer-box {
    margin: 16px;
    display: flex;
    flex-wrap: wrap;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    /* width: 100%; */
    color: $white;

    .image-btn {
      @include text-style(16, $blue-dark);
      margin: 4px;
      width: 172px;
      height: 210px;
      /* border: 2px solid $blue-dark; */
      box-shadow: 1px 4px 4px 1px $border;
      background-color: #fcecdd;
      /* background-color: $white; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px;
      border-radius: 8px;

      @media screen and (max-width: $md-breakpoint) {
        width: 216px;
        height: 210px;
      }
      transition: background-color 200ms ease-in-out;

      &:not(:disabled):hover {
        background-color: $blue-dark;
        color: $white;
      }

      img {
        width: 145px;
        height: 145px;
        margin: 4px;

        @media screen and (max-width: $md-breakpoint) {
          width: 140px;
          height: 140px;
        }
      }

      /* span {
        margin: 4px;
      } */
    }

    @media screen and (max-width: $md-breakpoint) {
      margin: 16px 40px;
    }
    .selected {
      /* border: 2px solid $secondary; */
      background-color: $blue-dark;
      color: white;
    }
  }
}
</style>

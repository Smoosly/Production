<template>
  <div class="body">
    <div class="progressbar-container">
      <ProgressBar :percentage="percentage" />
    </div>
    <div class="question-title">
      <h3>{{ page[0].flow_txt }}</h3>
    </div>
    <div class="question-container">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="700" class="single-select">
        <div class="title">Q. {{ page[0].question_txt }}</div>
        <div class="img-guide">
          <p><i class="far fa-lightbulb"></i> 와이어 브라는 기본 선택되어, 1개 이상 추천됩니다!</p>
        </div>
        <div class="answer-box">
          <button type="button" v-for="(ans, i) in page[0].answer_options" :key="i" :disabled="ans.show == 'hidden'" @click="setAnswer(i)" :class="{ selected: answer_1[i] == true }" class="btn-border-answer btn-50-ans answer-btn">
            {{ ans.content }}
          </button>
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

export default {
  data() {
    return {
      paging: page_info,
      survey: survey,
      page: survey.page12,
      percentage: 0,
      answer_1: [true, false, false, false],
      answer: "",
    };
  },
  components: {
    ProgressBar,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    setAnswer(i) {
      if (i !== 0) {
        this.answer_1[i] = !this.answer_1[i];
      }
      console.log(this.answer_1);
      let _answer = "";
      this.answer_1.forEach((ans, idx) => {
        if (ans) _answer = _answer.concat(`${idx},`);
      });
      console.log(_answer);
      this.answer = _answer;
    },
    goBack() {
      this.setAnswer(this.answer_1);
      const answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer,
      };
      axios
        .post("/breastTest/save/12", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/11");
        })
        .catch(console.log);
    },
    goNext() {
      this.setAnswer(this.answer_1);
      if (this.answer === "") {
        return this.emitter.emit("showRedToast", "답변을 입력해주세요");
      }
      const answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer,
      };
      axios
        .post("/breastTest/save/12", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/13");
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      axios
        .get("/breastTest/getData/12")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            let ans1 = result.data.record[this.page[0].column];
            console.log(ans1);
            ans1 = ans1.slice(0, -1).split(",");
            for (let idx in this.answer_1) {
              this.answer_1[Number(idx)] = false;
            }
            ans1.forEach((idx) => {
              this.answer_1[Number(idx)] = true;
            });
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
  // height: 140vh;
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 100px;

  @media screen and (max-width: $md-breakpoint) {
    padding: 90px 16px;
    // height: 700px;
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
      width: 240px;
      // border: 2px solid $blue;
      padding: 8px 4px;
      font-weight: 500;
      border-radius: 8px;
      background-color: $white;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(14, $secondary);
        // margin-top: 8px;
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
    .img-guide {
      background-color: $background;
      margin: 16px 16px 0px 16px;
      padding: 8px 18px;
      border-radius: 8px;
      /* text-align: center; */

      img {
        width: 256px;
      }
      p {
        @include text-style(14, $primary);
        i {
          color: $blue;

          /* font-size: 18px; */
          margin: 4px;
        }
      }
    }

    .answer-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 16px 60px;
      width: 100%;
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
    @media screen and (max-width: 280px) {
      flex-direction: column;
      width: 260px;
      margin: 16px 4px;
      @include text-style(14, $primary);
    }

    .answer-btn {
      margin: 8px;
      width: 192px;

      @media screen and (max-width: $md-breakpoint) {
        margin: 4px;
      }
    }

    .selected {
      /* border: 2px solid $secondary; */
      background-color: $blue-dark;
      color: $white;
    }
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
}
</style>

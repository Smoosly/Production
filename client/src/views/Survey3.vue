<template>
  <div class="body">
    <div class="progressbar-container">
      <ProgressBar :percentage="percentage" />
    </div>
    <div class="question-title">
      <h3>{{ page[0].flow_txt }}</h3>
    </div>
    <div class="question-container">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q0" class="single-select">
        <div class="title">Q. {{ page[0].question_txt }}</div>
        <div class="answer-box">
          <button type="button" @click="setAnswer(page[0].column, i)" v-for="(ans, i) in page[0].answer_options" :key="i" :class="{ selected: answer_1[i] == true }" class="btn-border-answer btn-50-ans">
            {{ ans.content }}
          </button>
        </div>
      </div>
      <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q1" class="single-select">
        <div class="title">Q. {{ page[1].question_txt }}</div>
        <div class="answer-box">
          <button type="button" @click="setAnswer(page[1].column, i)" v-for="(ans, i) in page[1].answer_options" :key="i" :class="{ selected: answer_2[i] == true }" class="btn-border-answer btn-50-ans">
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
      page: survey.page3,
      answer_1: [false, false, false, false, false, false, false, false, false, false],
      answer_2: [false, false, false, false, false, false, false, false, false, false, false],
      answer1: null,
      answer2: null,
      percentage: 0,
    };
  },
  components: {
    ProgressBar,
  },
  methods: {
    setAnswer(column, index) {
      if (column == this.page[0].column) {
        this.answer1 = index;
        for (let idx in this.answer_1) {
          this.answer_1[idx] = false;
        }
        this.answer_1[index] = true;
      } else if (column == this.page[1].column) {
        this.answer2 = index;
        for (let idx in this.answer_2) {
          this.answer_2[idx] = false;
        }
        this.answer_2[index] = true;
      }
    },
    goBack() {
      let answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer1,
        [this.page[1].column]: this.answer2,
      };
      axios
        .post("/breastTest/save/3?back=yes", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/2");
        })
        .catch(console.log);
    },
    goNext() {
      if (this.answer1 === null || this.answer2 === null) {
        const questions = [this.answer1, this.answer2]
        for (let i=0; i<questions.length; i++) {
          if (questions[i] === null) {
            document.getElementById(`q${i}`).scrollIntoView(false);
            break;
          }
        }
        return this.emitter.emit("showRedToast", "답변을 입력해주세요.");
      }
      let answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer1,
        [this.page[1].column]: this.answer2,
      };
      axios
        .post("/breastTest/save/3", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/4");
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      // 이전에 저장된 답변 정보 불러오기
      axios
        .get("/breastTest/getData/3")
        .then((result) => {
          console.log(result.data.record);
          if (result.data.success) {
            this.setAnswer(this.page[0].column, result.data.record[this.page[0].column]);
            this.setAnswer(this.page[1].column, result.data.record[this.page[1].column]);
          }
        })
        .catch(console.log);
    },
    async fetchProgress() {
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
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
.body {
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 100px;

  @media screen and (max-width: $md-breakpoint) {
    height: auto;
    padding: 100px 16px;
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
    display: flex;
    justify-content: center;
    align-items: center;

    h3 {
      @include text-style(16, $secondary);
      text-align: center;
      width: 240px;
      padding: 8px 4px;
      font-weight: 500;
      border-radius: 8px;
      background-color: $white;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(14, $secondary);
      }
    }
  }

  .input-set {
    margin: 16px;
    .title {
      @include text-style(16, $primary);
      margin-right: 16px;
    }

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: $md-breakpoint) {
      flex-direction: column;
      @include text-style(14, $primary);
    }
  }

  .short-answer {
    margin: 8px;
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
    .title {
      @include text-style(18, $white);
      width: 100%;
      text-align: center;
      background-color: $blue;
      color: $white;
      padding: 8px;
      font-weight: 700;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      @media screen and (max-width: $md-breakpoint) {
        @include text-style(16, $white);
      }

      @media screen and (max-width: 280px) {
        @include text-style(16, $white);
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
    @media screen and (max-width: 280px) {
      flex-direction: column;
      width: 260px;
      margin: 16px 4px;
      @include text-style(14, $primary);
    }
  }

  .answer-box {
    margin: 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    button {
      @include text-style(16);
      margin: 4px;
      width: 80px;

      @media screen and (max-width: $md-breakpoint) {
        width: 56px;
      }
    }

    @media screen and (max-width: $md-breakpoint) {
      margin: 16px 40px;
    }
  }

  .selected {
    background-color: $blue-dark;
    color: white;
  }
}
</style>

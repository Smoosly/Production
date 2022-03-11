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
        <div class="title">Q. {{ page[0].question }}</div>
        <img src="@/assets/test_guide/line_guide.png" alt="" />
        <div class="img-guide">
          <p><i class="far fa-lightbulb"></i> 겨드랑이 선을 기준으로 가슴이 끝나는 위치를 파악해주세요</p>
        </div>
        <!-- left -->
        <div class="right-left-container">
          <div class="right-answer">
            <span>{{ page[0].question_txt }}</span>
            <div class="answer-box">
              <button type="button" @click="setAnswer(page[0].column, i)" v-for="(ans, i) in page[0].answer_options" :key="i" :class="{ selected: answer_1[i] == true }" class="btn-border-answer btn-50-ans">
                {{ ans.content }}
              </button>
            </div>
          </div>

          <!-- right -->
          <div class="left-answer">
            <span>{{ page[1].question_txt }}</span>
            <div class="answer-box">
              <button type="button" @click="setAnswer(page[1].column, i)" v-for="(ans, i) in page[1].answer_options" :key="i" :class="{ selected: answer_2[i] == true }" class="btn-border-answer btn-50-ans">
                {{ ans.content }}
              </button>
            </div>
          </div>
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
      page: survey.page9,
      percentage: 0,
      answer_1: [false, false, false],
      answer_2: [false, false, false],
      answer1: null,
      answer2: null,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  components: {
    ProgressBar,
  },
  methods: {
    setAnswer(column, index) {
      // console.log(column, index);
      if (column == this.page[0].column) {
        this.answer_1[index] = true;
        this.answer1 = Number(this.page[0].answer_options[index].id);
        for (let idx in this.answer_1) {
          if (idx != index) this.answer_1[idx] = false;
        }
      } else if (column == this.page[1].column) {
        this.answer_2[index] = true;
        this.answer2 = Number(this.page[1].answer_options[index].id);
        for (let idx in this.answer_2) {
          if (idx != index) this.answer_2[idx] = false;
        }
      }
    },
    goBack() {
      const answers = {
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer1,
        [this.page[1].column]: this.answer2,
      };
      axios
        .post("/breastTest/save/9?back=yes", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/8");
        })
        .catch(console.log);
    },
    goNext() {
      if (this.answer1 === null || this.answer2 === null) {
        document.getElementById("q0").scrollIntoView(false);
        return this.emitter.emit("showRedToast", "답변을 입력해주세요");
      }
      const answers = {
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer1,
        [this.page[1].column]: this.answer2,
      };
      axios
        .post("/breastTest/save/9", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/10");
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      axios
        .get("/breastTest/getData/9")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            const ans1 = result.data.record[this.page[0].column];
            const ans2 = result.data.record[this.page[1].column];
            if (ans1 !== null) {
              this.page[0].answer_options.forEach((option, idx) => {
                if (option.id === ans1) {
                  this.setAnswer(this.page[0].column, idx);
                }
              });
            }
            if (ans2 !== null) {
              this.page[1].answer_options.forEach((option, idx) => {
                if (option.id === ans2) {
                  this.setAnswer(this.page[1].column, idx);
                }
              });
            }
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
  // height: 150vh;
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 100px;

  @media screen and (max-width: $md-breakpoint) {
    /* padding: 90px 55px;  */
    // height: 1200px;
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
    display: flex;

    .img-guide {
      background-color: $background;
      margin: 0px 16px 0px 16px;
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

    .right-left-container {
      display: flex;

      .right-answer,
      .left-answer {
        margin: 24px auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        span {
          @include text-style(16, $blue-dark);
          text-align: center;
          font-weight: 500;
          margin-top: 16px;
        }
      }

      .right-answer {
        border-right: 2px dashed $border;
      }
    }

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

    img {
      margin: 16px 4px;
      width: 64%;

      @media screen and (max-width: 820px) {
        width: 95%;
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
    margin: 16px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    /* width: 100%; */

    button {
      @include text-style(16);
      margin: 4px;
      width: 210px;

      @media screen and (max-width: $md-breakpoint) {
        width: 136px;
      }

      @media screen and (max-width: 280px) {
        width: 106px;
        height: 80px;
      }
    }

    @media screen and (max-width: $md-breakpoint) {
      margin: 16px 4px;
    }
  }

  .selected {
    /* border: 2px solid $secondary; */
    background-color: $blue-dark;
    color: $white;
  }
}
</style>

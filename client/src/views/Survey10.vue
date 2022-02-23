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
        <div class="guide">
          <h4><i class="far fa-lightbulb"></i> 살결 판단 Tip</h4>
          <img src="@/assets/test_guide/guide-salgyeol.png" alt="" />
          <div class="important">
            <p>
              이런식으로 가슴을 만졌을 때, <br />
              대체로 물렁하면&nbsp;<i class="fas fa-caret-right"></i><span>A</span><br />
              몽우리가 많이 만져지면&nbsp;<i class="fas fa-caret-right"></i><span>D</span>
            </p>
          </div>
        </div>

        <div class="answer-box">
          <div class="image-btn" @click="setAnswer(i)" v-for="(ans, i) in page[0].answer_options" :key="i" :class="{ selected: answer_1[i] == true }">
            <img :src="ans.path" alt="" />
            <span class="btn-label">{{ ans.label }}</span>
            <span>{{ ans.content }}</span>
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
      page: survey.page10,
      percentage: 0,
      answer: null,
      answer_1: [false, false],
    };
  },
  components: {
    ProgressBar,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    setAnswer(index) {
      for (let i in this.answer_1) {
        this.answer_1[i] = false;
      }
      this.answer_1[index] = true;
      this.answer = Number(this.page[0].answer_options[index].id);
    },
    goBack() {
      const answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer,
      };
      axios
        .post("/breastTest/save/10", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/9");
        })
        .catch(console.log);
    },
    goNext() {
      if (this.answer === null) {
        document.getElementById("q0").scrollIntoView(false);
        return this.emitter.emit("showRedToast", "답변을 입력해주세요");
      }
      const answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer,
      };
      axios
        .post("/breastTest/save/10", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/11");
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      axios
        .get("/breastTest/getData/10")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            const ans1 = result.data.record[this.page[0].column];
            ans1 === null || this.setAnswer(ans1);
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
  // height: 220vh;
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 100px;

  @media screen and (max-width: 820px) {
    padding: 90px 16px;
    // height: 2000px;
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

      @media screen and (max-width: 820px) {
        @include text-style(14, $secondary);
        // margin-top: 8px;
      }
    }
  }

  .button-container {
    margin: 16px;
    display: flex;
    justify-content: center;

    button {
      margin: 8px;
      width: 144px;
      @media screen and (max-width: 820px) {
        margin: 4px;
        width: 100px;
      }
    }
  }

  .single-select {
    .guide {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: $background;
      border-radius: 8px;
      margin: 16px 80px;
      padding: 4px 16px;

      @media screen and (max-width: 820px) {
        margin: 16px 8px;
        padding: 4px;
      }

      h4 {
        margin: 8px;
        @include text-style(16, $primary);
        font-weight: bold;
      }

      img {
        width: 196px;
        margin: 4px;

        @media screen and (max-width: 820px) {
          width: 172px;
        }
      }

      .important {
        display: flex;
        // flex-direction: column;
        align-items: center;
        margin: 8px 16px;
        background-color: #ffebc5;
        border: 2px solid $blue;
        border-radius: 8px;
        padding: 16px 48px;

        @media screen and (max-width: 320px) {
          flex-direction: column;
        }
        h5 {
          @include text-style(18, $blue-dark);
          font-weight: 900;
          // margin: 10px;
          // margin-bottom: 8px;
          padding: 16px;
          // width: 144px;
          @media screen and (max-width: 820px) {
            @include text-style(16, $blue-dark);
            padding: 8px;
          }
        }

        p {
          @include text-style(16, $blue);
          font-weight: bold;
          text-align: start;
          margin-left: 8px;

          @media screen and (max-width: 820px) {
            @include text-style(14, $blue);
            margin-left: 4px;
          }

          span {
            @include text-style(18, $blue-dark);
            font-weight: bold;
            margin-left: 8px;

            @media screen and (max-width: 820px) {
              @include text-style(16, $blue-dark);
            }
          }
        }
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
      @media screen and (max-width: 820px) {
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

    @media screen and (max-width: 820px) {
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

    .guide-image {
      margin-top: 32px;
      margin-bottom: 16px;
      padding: 4px;
      @media screen and (max-width: 820px) {
        margin-top: 28px;
        margin-bottom: 8px;
        width: 300px;
        height: 344px;
      }
      @media screen and (max-width: 280px) {
        margin-top: 24px;
        margin-bottom: 8px;
        width: 260px;
        height: 304px;
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
    margin-bottom: 32px;

    .image-btn {
      .btn-label {
        @include text-style(16, $blue-dark);
        font-weight: bold;
        /* margin-top: 8px; */
      }
      @include text-style(14, $blue-dark);
      margin: 4px;
      width: 240px;
      height: 280px;
      cursor: pointer;
      /* border: 2px solid $blue-dark; */
      box-shadow: 1px 4px 4px 1px $border;
      background-color: #fef3e9;
      /* background-color: $white; */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 8px;
      border-radius: 8px;

      @media screen and (max-width: 820px) {
        width: 120px;
        height: 216px;
      }
      transition: background-color 200ms ease-in-out;

      &:not(:disabled):hover {
        background-color: $blue-dark;
        color: $white;

        span {
          color: $white;
        }
      }

      img {
        width: 145px;
        /* height: 145px; */
        margin: 4px;
        padding-top: 4px;

        @media screen and (max-width: 820px) {
          width: 80px;
          /* height: 140px; */
        }
      }

      span {
        /* height: 48px; */
        margin: 4px;
        text-align: center;
        font-weight: 600;
      }
    }

    @media screen and (max-width: 820px) {
      margin: 16px;
    }
    .selected {
      /* border: 2px solid $secondary; */
      background-color: $blue-dark;
      color: $white;

      .btn-label {
        color: $white;
      }
    }
  }
}
</style>

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
        <div class="img-guide">
          <p><i class="far fa-lightbulb"></i> '길'이란 부유방과 실제 유방 사이에 미세하게 접힌 자국을 말해요</p>
        </div>
        <div class="answer-box">
          <div class="image-btn" @click="setAnswer(i)" v-for="(ans, i) in page[0].answer_options" :key="i" :class="{ selected: answer_1[i] == true }">
            <img :src="ans.path" alt="" />
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
      page: survey.page8,
      percentage: 0,
      answer: null,
      answer_1: [false, false, false],
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
        .post("/breastTest/save/8?back=yes", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/7");
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
        .post("/breastTest/save/8", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/9");
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      axios
        .get("/breastTest/getData/8")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            const ans1 = result.data.record[this.page[0].column];
            if (ans1 === null) return;
            this.page[0].answer_options.forEach((option, idx) => {
              if (option.id === ans1) {
                this.setAnswer(idx);
              }
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

    .img-guide {
      background-color: $background;
      margin: 16px 16px 0;
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
    flex-wrap: wrap;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    /* width: 100%; */
    color: $white;
    cursor: pointer;

    .image-btn {
      @include text-style(16, $blue-dark);
      margin: 4px;
      width: 172px;
      height: 180px;
      /* border: 2px solid $blue-dark; */
      box-shadow: 1px 4px 4px 1px $border;
      background-color: #fff7f0;
      // background-color: $white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px;
      border-radius: 8px;

      @media screen and (max-width: $md-breakpoint) {
        width: 216px;
        height: 180px;
      }
      transition: background-color 200ms ease-in-out;

      &:not(:disabled):hover {
        background-color: $blue-dark;
        color: $white;
      }

      img {
        width: 156px;
        // height: 155px;
        margin: 4px;

        @media screen and (max-width: $md-breakpoint) {
          width: 144px;
          // height: 160px;
        }
      }

      span {
        margin-top: 2px;
        font-weight: 600;
      }
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

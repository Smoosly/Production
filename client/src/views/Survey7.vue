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
        <img src="@/assets/test_guide/bone_guide.png" alt="" />
        <div class="img-guide">
          <p>
            <i class="far fa-lightbulb"></i> 가슴을 아래로 내려다봤을 때, 흉곽모양이 볼록한지 오목한지 평평한지 파악해주세요 <br />
            <i class="far fa-lightbulb"></i> 젖꼭지 사이의 가운데 흉곽에 주목
          </p>
        </div>
        <span class="help"><i class="fas fa-exclamation-circle"></i> 특징이 아주 심한 경우에만 선택해주세요. 헷갈린다면, '해당 없음'입니다.</span>
        <!-- <img src="@/assets/difference/bureogym.png" alt=""> -->
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
      page: survey.page7,
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
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer,
      };
      axios
        .post("/breastTest/save/7?back=yes", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/6");
        })
        .catch(console.log);
    },
    goNext() {
      if (this.answer === null) {
        document.getElementById("q0").scrollIntoView(false);
        return this.emitter.emit("showRedToast", "답변을 입력해주세요");
      }
      const answers = {
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer,
      };
      axios
        .post("/breastTest/save/7", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/8");
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      axios
        .get("/breastTest/getData/7")
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
      margin: 0px 16px 16px 16px;
      padding: 8px 18px;
      // line-height: 190%;
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

    .help {
      /* margin-top: 4px; */
      color: $red;
      padding: 2px 56px;

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(13, $red);
        padding: 0px 28px;
        line-height: 160%;
      }

      i {
        color: $red;
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

    img {
      margin: 16px 4px;
      width: 64%;

      @media screen and (max-width: 820px) {
        width: 90%;
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
      background-color: #fef3e9;
      /* background-color: $white; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px;
      border-radius: 8px;

      @media screen and (max-width: $md-breakpoint) {
        width: 216px;
        height: 144px;
      }
      transition: background-color 200ms ease-in-out;

      @media screen and (min-width: 820px) {
        &:not(:disabled):hover {
          background-color: $blue-dark;
          color: $white;
        }
      }

      img {
        width: 120px;
        /* height: 165px; */
        margin: 4px;

        @media screen and (max-width: $md-breakpoint) {
          width: 104px;
          /* height: 200px; */
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

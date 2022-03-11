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
        <div class="answer-box bbong-box">
          <button type="button" @click="setBBongAnswer(i)" v-for="(ans, i) in page[0].answer_options" :key="i" :class="{ answer_1: answer_0[i] == true }" class="btn-border-answer btn-50-ans answer-btn">
            {{ ans.content }}
          </button>
        </div>
      </div>
      <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q1" class="multi-select">
        <div class="title">Q. {{ page[1].question_txt }}</div>
        <div class="func-bigger">
          <button v-if="isBiggerShow && bigger[0] == false && bigger[1] == false" type="button" @click="setAnswer(0, 0)" :class="{ answer_1: bigger[0] == true }" class="btn-primary-answer btn-50-ans">
            {{ page[1].answer_contents[0].subContents[0] }}
          </button>
          <button v-if="bigger[0] == false && bigger[1] == false" type="button" @click="isBiggerShow = !isBiggerShow" class="btn-border-answer btn-50-ans">
            {{ page[1].answer_contents[0].content }}
          </button>
          <button v-if="isBiggerShow && bigger[0] == false && bigger[1] == false" type="button" @click="setAnswer(0, 1)" :class="{ answer_1: bigger[1] == true }" class="btn-primary-answer btn-50-ans">
            {{ page[1].answer_contents[0].subContents[1] }}
          </button>
          <!-- cancelAnswer -->
          <button v-if="bigger[0] == true" @click="cancelAnswer(0, 0)" type="button" class="btn-border-answer btn-50-ans long-btn">조금 커보이기</button>
          <button v-if="bigger[1] == true" @click="cancelAnswer(0, 1)" type="button" class="btn-border-answer btn-50-ans long-btn">많이 커보이기</button>
        </div>
        <div class="func-gather">
          <button v-if="isGatherShow && gather[0] == false && gather[1] == false" type="button" @click="setAnswer(1, 0)" :class="{ answer_1: gather[0] == true }" class="btn-primary-answer btn-50-ans">
            {{ page[1].answer_contents[1].subContents[0] }}
          </button>
          <button v-if="gather[0] == false && gather[1] == false" type="button" @click="isGatherShow = !isGatherShow" class="btn-border-answer btn-50-ans">
            {{ page[1].answer_contents[1].content }}
          </button>
          <button v-if="isGatherShow && gather[0] == false && gather[1] == false" type="button" @click="setAnswer(1, 1)" :class="{ answer_1: gather[1] == true }" class="btn-primary-answer btn-50-ans">
            {{ page[1].answer_contents[1].subContents[1] }}
          </button>
          <button v-if="gather[0] == true" @click="cancelAnswer(1, 0)" type="button" class="btn-border-answer btn-50-ans long-btn">조금 모아주기</button>
          <button v-if="gather[1] == true" @click="cancelAnswer(1, 1)" type="button" class="btn-border-answer btn-50-ans long-btn">많이 모아주기</button>
        </div>
        <div class="func-pushup">
          <button v-if="isPushupShow && pushup[0] == false && pushup[1] == false" type="button" @click="setAnswer(2, 0)" :class="{ answer_1: pushup[0] == true }" class="btn-primary-answer btn-50-ans">
            {{ page[1].answer_contents[2].subContents[0] }}
          </button>
          <button v-if="pushup[0] == false && pushup[1] == false" type="button" @click="isPushupShow = !isPushupShow" class="btn-border-answer btn-50-ans">
            {{ page[1].answer_contents[2].content }}
          </button>
          <button v-if="isPushupShow && pushup[0] == false && pushup[1] == false" type="button" @click="setAnswer(2, 1)" :class="{ answer_1: pushup[1] == true }" class="btn-primary-answer btn-50-ans">
            {{ page[1].answer_contents[2].subContents[1] }}
          </button>
          <button v-if="pushup[0] == true" @click="cancelAnswer(2, 0)" type="button" class="btn-border-answer btn-50-ans long-btn">조금 올려주기</button>
          <button v-if="pushup[1] == true" @click="cancelAnswer(2, 1)" type="button" class="btn-border-answer btn-50-ans long-btn">많이 올려주기</button>
        </div>

        <div class="answer-box">
          <button type="button" @click="setOthers(i)" v-for="(ans, i) in page[1].others" :key="i" :class="{ answer_1: others[i] == true }" class="btn-border-answer btn-50-ans answer-btn">
            {{ ans.content }}
          </button>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q2" v-if="pickMostImportant" class="single-select">
        <div class="title">Q. {{ page[2].question_txt }}</div>
        <div class="answer-box">
          <button type="button" @click="pickBest(i)" v-for="(ans, i) in selOptions" :key="i" :class="{ answer_1: answer_2[i] == true }" class="btn-border-answer btn-50-ans btn-most">
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
import { survey } from "../../Survey";
import axios from "axios";

export default {
  data() {
    return {
      // paging: page_info,
      survey: survey,
      page: survey.page13,
      percentage: 0,
      isBiggerShow: false,
      bigger: [false, false],
      isGatherShow: false,
      gather: [false, false],
      isPushupShow: false,
      pushup: [false, false],
      others: [false, false, false, false, false],
      answer_0: [false, false, false],
      answer_1: [false, false, false, false, false, false, false, false, false, false, false],
      answer_2: [],
      answer0: null,
      answer1: null,
      answer2: null,
      pickMostImportant: false,
      selOptions: [],
    };
  },
  components: {
    ProgressBar,
  },
  methods: {
    setBBongAnswer(index) {
      this.answer_0[index] = true;
      for (let idx in this.answer_0) {
        if (idx != index) {
          this.answer_0[idx] = false;
        }
      }
      this.answer0 = Number(this.page[0].answer_options[index].id);
    },
    setAnswer(order, index) {
      // console.log("setAnswer");
      // console.log(order, index);
      if (order == 0) {
        this.bigger[index] = !this.bigger[index];
        this.answer_1[0] = this.bigger[0];
        this.answer_1[1] = this.bigger[1];
        // 작아보이기 false로
        this.others[1] = false;
        this.answer_1[7] = false;
      } else if (order == 1) {
        this.gather[index] = !this.gather[index];
        this.answer_1[2] = this.gather[0];
        this.answer_1[3] = this.gather[1];
      } else if (order == 2) {
        this.pushup[index] = !this.pushup[index];
        this.answer_1[4] = this.pushup[0];
        this.answer_1[5] = this.pushup[1];
      }
      this.others[4] = false;
      this.answer_1[10] = false;
      console.log(this.answer_1);
      this.decideNext();
    },
    cancelAnswer(order, index) {
      // console.log("cancelAnswer");
      // console.log(order, index);
      if (order == 0) {
        this.isBiggerShow = false;
        this.bigger = [false, false];
      } else if (order == 1) {
        this.isGatherShow = false;
        this.gather = [false, false];
      } else if (order == 2) {
        this.isPushupShow = false;
        this.pushup = [false, false];
      }
      this.answer_1[2 * order + index] = false;
      console.log(this.answer_1);
      this.decideNext();
    },
    setOthers(i) {
      console.log("setOthers");
      console.log(i);
      this.others[i] = !this.others[i];

      if (this.others[1]) {
        this.bigger = [false, false];
        this.answer_1[0] = false;
        this.answer_1[1] = false;
        this.isBiggerShow = false;
      }

      if (i === 4) {
        for (let id in this.others) {
          if (Number(id) !== 4) this.others[Number(id)] = false;
        }
        this.bigger = [false, false];
        this.gather = [false, false];
        this.pushup = [false, false];
        for (let idx = 0; idx < 6; idx++) {
          if (idx < 6) {
            this.answer_1[idx] = false;
          }
        }
        this.isBiggerShow = false;
        this.isGatherShow = false;
        this.isPushupShow = false;
      } else {
        this.others[4] = false;
      }
      console.log(this.others);
      console.log(this.answer_1);
      for (const idx in this.others) {
        this.answer_1[Number(idx) + 6] = this.others[Number(idx)];
      }
      console.log(this.answer_1);
      this.decideNext();
    },
    decideNext() {
      let count = 0;
      for (let i in this.answer_1) {
        if (this.answer_1[i] == true) count++;
      }
      // console.log("count:", count);
      this.selOptions = [];
      for (let index in this.answer_1) {
        if (this.answer_1[index] == true) {
          this.selOptions = this.selOptions.concat(this.page[2].answer_options[index]);
        }
      }
      // console.log(this.selOptions);
      let len = this.selOptions.length;
      if (count === 0) {
        this.answer2 = null;
      }
      if (count === 1) {
        this.answer2 = this.selOptions[0].id;
      }
      if (count >= 2) {
        this.answer2 = null;
        this.answer_2 = new Array(len).fill(false);
        this.pickMostImportant = true;
        // console.log(this.answer_2);
      } else {
        this.pickMostImportant = false;
      }
      this.collectAns();
    },
    collectAns() {
      // console.log("collectAns");
      let _answer1 = "";
      if (this.bigger[1]) _answer1 = _answer1.concat(`${this.page[2].answer_options[1].id},`); //많이 커보이게
      if (this.bigger[0]) _answer1 = _answer1.concat(`${this.page[2].answer_options[0].id},`); //조금 커보이게
      if (this.gather[0]) _answer1 = _answer1.concat(`${this.page[2].answer_options[2].id},`); //조금 모아주기
      if (this.gather[1]) _answer1 = _answer1.concat(`${this.page[2].answer_options[3].id},`); //많이 모아주기
      if (this.pushup[0]) _answer1 = _answer1.concat(`${this.page[2].answer_options[4].id},`); //조금 올려주기
      if (this.pushup[1]) _answer1 = _answer1.concat(`${this.page[2].answer_options[5].id},`); //많이 올려주기
      this.others.forEach((ans, idx) => {
        if (Number(idx) !== 4 && ans) _answer1 = _answer1.concat(`${this.page[2].answer_options[idx + 6].id},`);
        if (Number(idx) == 4 && ans) _answer1 = _answer1.concat(`${this.page[2].answer_options[idx + 6].id},`);
      });
      // console.log(_answer1);
      this.answer1 = _answer1;
    },
    pickBest(index) {
      for (let i in this.answer_2) {
        this.answer_2[i] = false;
      }
      this.answer_2[index] = true;
      this.answer2 = this.selOptions[index].id;
      // console.log(this.answer2);
    },
    goBack() {
      const answers = {
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer0,
        [this.page[1].column]: this.answer1,
        [this.page[2].column]: this.answer2,
      };
      console.log(answers);
      axios
        .post("/breastTest/save/13?back=yes", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/12");
        })
        .catch(console.log);
    },
    goNext() {
      if (this.answer0 === null || this.answer1 === null || this.answer1 === "" || (this.pickMostImportant === true && this.answer2 === null)) {
        const questions = [this.answer0, this.answer1, this.answer2]
        for (let i=0; i<questions.length; i++) {
          if (questions[i] === null || questions[i] === "") {
            if (i === 2 && this.pickMostImportant === true) {
              document.getElementById("q2").scrollIntoView(false);
              break;
            }
            else {
              document.getElementById(`q${i}`).scrollIntoView(false);
              break;
            }   
          }
        }
        return this.emitter.emit("showRedToast", "답변을 입력해주세요");
      }
      const answers = {
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer0,
        [this.page[1].column]: this.answer1,
        [this.page[2].column]: this.answer2,
      };
      console.log(answers);
      axios
        .post("/breastTest/save/13", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/14");
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      axios
        .get("/breastTest/getData/13")
        .then(async (result) => {
          console.log(result.data);
          if (result.data.success) {
            const ans0 = result.data.record[this.page[0].column];
            if (ans0 === null) return;
            // console.log(ans0);
            this.page[0].answer_options.forEach((option, idx) => {
              if (option.id === ans0) {
                this.setBBongAnswer(idx);
              }
            });

            let ans1 = result.data.record[this.page[1].column];
            if (ans1 === null) return;
            this.answer1 = ans1;
            ans1 = ans1.slice(0, -1).split(",");
            // console.log(ans1, ans1[0], typeof ans1[0]);
            ans1.forEach((ans) => {
              if (ans[0] === "0") {
                this.setOthers(4);
                return false;
              }
              //1,2,3 커보이기, 모아주기, 올려주기
              if (ans[0] === "1") {
                if (ans[1]) {
                  this.setAnswer(0, 1);
                } else {
                  this.setAnswer(0, 0);
                }
                this.answer_1[0] = this.bigger[0];
                this.answer_1[1] = this.bigger[1];
              }
              if (ans[0] === "2") {
                if (ans[1]) {
                  this.setAnswer(1, 1);
                } else {
                  this.setAnswer(1, 0);
                }
                this.answer_1[2] = this.gather[0];
                this.answer_1[3] = this.gather[1];
              }
              if (ans[0] === "3") {
                if (ans[1]) {
                  this.setAnswer(2, 1);
                } else {
                  this.setAnswer(2, 0);
                }
                this.answer_1[4] = this.pushup[0];
                this.answer_1[5] = this.pushup[1];
                console.log(this.answer_1);
              }
              //4,5,6,7, 받쳐, 작아, 부유방, 등살
              if (Number(ans[0]) >= 4 && Number(ans[0]) <= 7) {
                console.log(ans[0], typeof Number(ans[0]));
                this.setOthers(Number(ans[0]) - 4);
              }
            });

            let ans2 = result.data.record[this.page[2].column];
            if (ans2 !== null) {
              console.log(this.answer_1);
              this.decideNext();
              this.answer2 = ans2;
              // console.log(ans2);
              this.selOptions.forEach((ans, idx) => {
                if (ans2 === ans.id) {
                  this.pickBest(idx);
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
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
.body {
  // height: 240vh;
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 100px;

  @media screen and (max-width: $md-breakpoint) {
    /* padding: 90px 55px;  */
    // height: 2100px;
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

  .answer-box {
    display: flexbox;
    justify-content: center;
    align-items: center;
    padding: 16px 60px;

    @media screen and (max-width: $md-breakpoint) {
      padding: 16px 48px;
    }
  }

  .multi-select,
  .single-select {
    display: flex;
    .title {
      @include text-style(18, $white);
      /* margin-right: 16px; */
      width: 100%;
      font-weight: 700;
      text-align: center;
      background-color: $blue;
      color: $white;
      padding: 8px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      margin-bottom: 16px;
      /* margin-top: 8px; */
      @media screen and (max-width: $md-breakpoint) {
        @include text-style(18, $white);
      }
    }

    .func-bigger,
    .func-gather,
    .func-pushup {
      .btn-primary-answer {
        @media screen and (max-width: $md-breakpoint) {
          width: 76px;
        }
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

    .answer-btn {
      margin: 8px;
      width: 156px;

      @media screen and (max-width: $md-breakpoint) {
        margin: 4px;
        width: 120px;
      }
    }

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

    .answer-box {
      display: flexbox;
      justify-content: center;
      align-items: center;
      padding: 16px 60px;

      @media screen and (max-width: $md-breakpoint) {
        padding: 16px 8px;
      }
    }

    .bbong-box {
      button {
        width: 224px;

        @media screen and (max-width: $md-breakpoint) {
          width: 192px;
        }
      }
    }
  }

  .func-bigger,
  .func-gather,
  .func-pushup,
  .answer-box {
    margin: 8px;
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    /* width: 100%; */

    button {
      @include text-style(16);
      margin: 4px;
      width: 150px;
      height: 48px;

      @media screen and (max-width: $md-breakpoint) {
        width: 128px;
      }

      @media screen and (max-width: 280px) {
        width: 80px;
      }
    }
    .btn-most {
      width: 180px;
      @media screen and (max-width: 820px) {
        width: 136px;
      }
    }

    .long-btn {
      width: 216px;
      height: 48px;
      background-color: $blue-dark;
      color: white;

      @media screen and (max-width: $md-breakpoint) {
        width: 192px;
      }
    }

    @media screen and (max-width: $md-breakpoint) {
      margin: 8px 0px;
      width: 310px;
    }

    .answer_1 {
      /* border: 2px solid $secondary; */
      background-color: $blue-dark;
      color: $white;
    }
  }

  .next-btn {
    width: 224px;
    margin-bottom: 24px;

    i {
      font-size: 24px;
    }
  }

  .answer_1 {
    /* border: 2px solid $secondary; */
    background-color: $blue-dark;
    color: $white;
  }
}
</style>

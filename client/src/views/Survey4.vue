<template>
  <div class="body">
    <div class="progressbar-container">
      <ProgressBar :percentage="percentage" />
    </div>
    <div class="question-title">
      <h3>{{ page[0].flow_txt }}</h3>
    </div>
    <div class="question-container">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q0" class="carousel-container">
        <div class="title">{{ page[0].question_txt }} <i @click="isHelp = !isHelp" class="far fa-question-circle question"></i></div>
        <button type="button" class="btn-outlined btn-40 see-all-btn" v-if="!isSelected" @click="open">전체유형보기</button>
        <div v-if="isHelp" class="help">
          <div class="contents">
            <h4><i class="fas fa-clipboard-check"></i>&nbsp;사진 선택 가이드</h4>
            <div class="important">
              <h5>주목할 것</h5>
              <p>
                <i class="fas fa-caret-right"></i>&nbsp;가슴 경계선이 선명한지 흐린지 <br />
                <i class="fas fa-caret-right"></i>&nbsp;지방이 어디 쪽에 분포되어 있는지 등의 <span>전반적인 "가슴" 실루엣</span>
              </p>
            </div>
            <div class="exclusion">
              <h5>배제할 것</h5>
              <p>
                <i class="fas fa-caret-right"></i>&nbsp;유두 모양과 크기 <br />
                <i class="fas fa-caret-right"></i>&nbsp;피부색 등의 <span>가슴과 관련 없는 요소</span>
              </p>
            </div>
          </div>
        </div>
        <div class="carousel">
          <i v-if="!isSelected" @click="prev" class="fas fa-chevron-circle-left"></i>
          <div class="image-container">
            <!-- {{ typeImages[curr-1].represent}} -->
            <span>{{ curr }}-{{ sidx }}</span>
            <img class="represent-image" :src="representImage" alt="" />
          </div>
          <i v-if="!isSelected" @click="next" class="fas fa-chevron-circle-right"></i>
        </div>
        <div v-if="!isSelected" class="sub-images">
          <div v-for="(image, i) in typeImages[curr - 1].subImages" :key="i" class="image-box">
            <div class="item-box">
              <span>{{ curr }}-{{ i + 1 }}</span>
              <img @click="setRepresent(i)" :src="image.path" :class="{ clicked: representImage == image.path }" alt="" />
            </div>

            <button @click="selectOne(image, i)" type="button" class="btn-primary btn-32">선택</button>
          </div>
        </div>

        <div v-if="isSelected" class="re-select">
          <button @click="isSelected = !isSelected" type="button" class="btn-secondary btn-32">다시 선택하기</button>
        </div>
      </div>
    </div>
    <div v-if="isSelected" class="answer-diff">
      <div class="before-start">내 가슴이 선택한 사진과 어떻게 다른지 <br />체크해 주세요&nbsp; <i class="fas fa-angle-double-down"></i></div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q1" class="single-select">
        <div class="title">Q. 사진과 다른 부분 : {{ page[1].question_txt }}</div>
        <img src="@/assets/test_guide/middle-length.png" alt="" />
        <div class="img-guide">
          <p><i class="far fa-lightbulb"></i> 가슴 사이 거리란 양쪽의 가슴이 얼마나 멀리 떨어져있는지를 나타내는 말입니다</p>
        </div>
        <div class="answer-box">
          <button type="button" @click="setDanswer(page[1].column, i)" v-for="(ans, i) in page[1].answer_options" :key="i" :class="{ selected: danswer_1[i] == true }" class="btn-border-answer btn-50-ans">{{ ans.content }}</button>
        </div>
      </div>
      <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q2" class="single-select">
        <div class="title">Q. 사진과 다른 부분 : {{ page[2].question_txt }}</div>
        <img src="@/assets/test_guide/youdo_beorugym.png" alt="" />
        <!-- guide -->
        <div class="img-guide">
          <p><i class="far fa-lightbulb"></i> 유두 벌어짐이란 유두가 정면이 아닌 바깥쪽을 향하고 있는 상태를 말합니다</p>
        </div>
        <div class="answer-box">
          <button type="button" @click="setDanswer(page[2].column, i)" v-for="(ans, i) in page[2].answer_options" :key="i" :class="{ selected: danswer_2[i] == true }" class="btn-border-answer btn-50-ans">{{ ans.content }}</button>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q3" class="single-select">
        <div class="title">Q. 사진과 다른 부분 : {{ page[3].question_txt }}</div>
        <div class="answer-box">
          <button type="button" @click="setDanswer(page[3].column, i)" v-for="(ans, i) in page[3].answer_options" :key="i" :class="{ selected: danswer_3[i] == true }" class="btn-border-answer btn-50-ans">{{ ans.content }}</button>
        </div>
      </div>
      <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="700" class="short-answer">
        <div class="title">Q. 사진과 다른 부분 : {{ page[4].question_txt }}</div>
        <div class="input-group">
          <input v-model="opinions" type="text" class="form-input" placeholder="" />
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
import typeImages from "../../BreastTypeImage";
import axios from "axios";
export default {
  data() {
    return {
      paging: page_info,
      survey: survey,
      typeImages: typeImages,
      curr: 1,
      sidx: 1,
      isHelp: false,
      page: survey.page4,
      percentage: 0,
      answer: null,
      danswer_1: [false, false, false],
      danswer_2: [false, false, false],
      danswer_3: [false, false, false],
      danswer1: null,
      danswer2: null,
      danswer3: null,
      opinions: null,
      representImage: "",
      isSelected: false,
    };
  },
  components: {
    ProgressBar,
  },
  watch: {
    isSelected(newVal) {
      if (newVal == false) {
        console.log("reSelect");
        this.isSelected = false;
        this.answer = null;
        this.danswer_1 = [false, false];
        this.danswer_2 = [false, false];
        this.danswer_3 = [false, false];
        this.danswer1 = null;
        this.danswer2 = null;
        this.danswer3 = null;
        this.opinions = null;
      }
    },
  },
  methods: {
    setDanswer(column, index) {
      if (column == this.page[1].column) {
        this.danswer_1[index] = true;
        this.danswer1 = this.page[1].answer_options[index].id;
        for (let idx in this.danswer_1) {
          if (idx != index) this.danswer_1[idx] = false;
        }
      } else if (column == this.page[2].column) {
        this.danswer_2[index] = true;
        this.danswer2 = this.page[2].answer_options[index].id;
        for (let idx in this.danswer_2) {
          if (idx != index) this.danswer_2[idx] = false;
        }
      } else if (column == this.page[3].column) {
        this.danswer_3[index] = true;
        this.danswer3 = this.page[3].answer_options[index].id;
        for (let idx in this.danswer_3) {
          if (idx != index) this.danswer_3[idx] = false;
        }
      }
    },
    open() {
      this.emitter.emit("typeSelectModal", true);
    },
    prev() {
      if (this.curr == 1) {
        this.curr = 24;
        console.log(this.typeImages[this.curr - 1].represent);
        this.representImage = this.typeImages[this.curr - 1].represent;
        this.sidx = 1;
      } else {
        this.curr -= 1;
        this.representImage = this.typeImages[this.curr - 1].represent;
        this.sidx = 1;
      }
    },
    next() {
      if (this.curr == 24) {
        this.curr = 1;
        this.representImage = this.typeImages[this.curr - 1].represent;
        this.sidx = 1;
      } else {
        this.curr += 1;
        this.representImage = this.typeImages[this.curr - 1].represent;
        this.sidx = 1;
      }
    },
    setRepresent(index) {
      this.sidx = index + 1;
      this.representImage = this.typeImages[this.curr - 1].subImages[index].path;
    },
    selectOne(obj, index) {
      this.setRepresent(index);
      this.answer = Number(obj.id);
      this.isSelected = true;
      window.scrollTo(0, 0);
    },
    goBack() {
      const answers = {
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer,
        [this.page[1].column]: this.danswer1,
        [this.page[2].column]: this.danswer2,
        [this.page[3].column]: this.danswer3,
        [this.page[4].column]: this.opinions,
      };
      axios
        .post("/breastTest/save/4?back=yes", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/3");
        })
        .catch(console.log);
    },
    goNext() {
      if (this.answer === null || this.danswer1 === null || this.danswer2 === null || this.danswer3 === null) {
        const questions = [this.danswer, this.danswer1, this.danswer2, this.danswer3]
        for (let i=0; i<questions.length; i++) {
          if (questions[i] === null) {
            document.getElementById(`q${i}`).scrollIntoView(false);
            break;
          }
        }
        return this.emitter.emit("showRedToast", "답변을 입력해주세요.");
      }
      const answers = {
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer,
        [this.page[1].column]: this.danswer1,
        [this.page[2].column]: this.danswer2,
        [this.page[3].column]: this.danswer3,
        [this.page[4].column]: this.opinions,
      };
      axios
        .post("/breastTest/save/4", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/5");
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      // 이전에 저장된 답변 정보 불러오기
      axios
        .get("/breastTest/getData/4")
        .then((result) => {
          console.log(result.data);
          if (result.data.success && result.data.record[this.page[0].column]) {
            this.answer = result.data.record[this.page[0].column];
            let i = null;
            typeImages.forEach((type) => {
              i = 0;
              type.subImages.forEach((image) => {
                if (image.id === this.answer) {
                  this.curr = type.type;
                  this.selectOne(type.subImages[i], i);
                  return false;
                }
                i++;
              });
            });
            this.page[1].answer_options.forEach((option, idx) => {
              if (option.id === result.data.record[this.page[1].column]) {
                this.setDanswer(this.page[1].column, idx);
              }
            });
            this.page[2].answer_options.forEach((option, idx) => {
              if (option.id === result.data.record[this.page[2].column]) {
                this.setDanswer(this.page[2].column, idx);
              }
            });
            this.page[3].answer_options.forEach((option, idx) => {
              if (option.id === result.data.record[this.page[3].column]) {
                this.setDanswer(this.page[3].column, idx);
              }
            });
            this.opinions = result.data.record[this.page[4].column];
            this.emitter.emit("typeSelectModal", false);
          } else {
            this.emitter.emit("typeSelectModal", true);
          }
        })
        .catch(console.log);
    },
    fetchProgress() {
      axios
        .get("/breastTest/getProgress")
        .then((result) => {
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
    this.representImage = this.typeImages[0].represent;
    this.emitter.emit("typeSelectModal", true);
    this.emitter.on("setType", (state) => {
      this.curr = state;
      this.sidx = 1;
      this.representImage = this.typeImages[this.curr - 1].represent;
    });
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
    padding: 100px 16px;
    height: auto;
  }
  .question-container {
    margin: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      margin: 4px;
    }
    .carousel-container {
      position: relative;
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
        margin-bottom: 16px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        @media screen and (max-width: $md-breakpoint) {
          @include text-style(16, $white);
        }

        i {
          position: absolute;
          right: 3%;
          color: $white;
          font-size: 24px;
          &:hover {
            color: $tertiary;
          }
        }
      }

      .re-select {
        margin-bottom: 8px;
      }

      .help {
        position: absolute;
        right: 3%;
        top: 6%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        width: 70%;
        z-index: 3;
        @media screen and (max-width: 820px) {
          width: 97%;
        }
        .contents {
          background-color: $background;
          padding: 4px;
          border-radius: 8px;
          border: 2px solid $white;
          h4 {
            @include text-style(16, $primary);
            margin: 8px auto;
            text-align: center;
            font-weight: 600;
            @media screen and (max-width: 820px) {
              @include text-style(14, $primary);
            }
          }

          .important,
          .exclusion {
            display: flex;
            align-items: center;
            margin: 8px;
            background-color: #faefda;
            border-radius: 8px;
            padding: 16px 8px;
            @media screen and (max-width: 320px) {
              flex-direction: column;
            }
            h5 {
              @include text-style(16, $blue-dark);
              font-weight: 900;
              padding: 16px;
              @media screen and (max-width: 820px) {
                @include text-style(14, $blue-dark);
                padding: 8px;
              }
            }
            p {
              @include text-style(16, $blue);
              font-weight: bold;
              text-align: start;
              margin-left: 8px;
              width: 70%;
              @media screen and (max-width: 820px) {
                @include text-style(14, $blue);
                margin-left: 4px;
              }
              span {
                @include text-style(16, red);
                font-weight: bold;
                @media screen and (max-width: 820px) {
                  @include text-style(13, red);
                }
              }
            }
          }
        }
      }
    }
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

  .carousel {
    margin: 16px auto;
    display: flex;
    align-items: center;
    @media screen and (max-width: $md-breakpoint) {
    }
    i {
      font-size: 40px;
      color: $blue;
      @media screen and (max-width: $md-breakpoint) {
        font-size: 30px;
      }
      &:hover {
        opacity: 0.7;
      }
    }
    .image-container {
      display: flex;
      justify-content: center;
      width: 350px;
      height: 300px;
      position: relative;
      span {
        position: absolute;
        font-size: 16px;
        left: 6%;
        top: 2%;
        padding: 1px 6px;
        background-color: rgba(255, 255, 255, 0.67);
        color: $blue-dark;
        font-weight: 700;
        border-radius: 4px;
      }
      @media screen and (max-width: $md-breakpoint) {
        width: 230px;
        height: 200px;
      }
      @media screen and (max-width: 280px) {
        width: 190px;
        height: 160px;
      }
      .represent-image {
        width: 300px;
        height: 300px;
        box-shadow: 1px 4px 4px 1px $border;
        @media screen and (max-width: $md-breakpoint) {
          width: 200px;
          height: 200px;
        }

        @media screen and (max-width: 280px) {
          width: 164px;
          height: 164px;
        }
      }
    }
  }

  .sub-images {
    display: flex;
    flex-wrap: wrap;
    margin: 16px;
    width: 400px;
    height: auto;

    @media screen and (max-width: $md-breakpoint) {
      width: 300px;
      padding: 0 18px;
    }

    .image-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 24px;

      @media screen and (max-width: $md-breakpoint) {
        margin: 16px;
      }

      img {
        width: 150px;
        height: 150px;
        box-shadow: 1px 4px 4px 1px $border;
        @media screen and (max-width: $md-breakpoint) {
          width: 100px;
          height: 100px;
        }
      }
      .clicked {
        background-color: rgba(255, 220, 179, 0.87);
      }

      button {
        margin: 4px;
        width: 50px;
      }
    }

    .item-box {
      position: relative;
      span {
        font-size: 13px;
        position: absolute;
        padding: 2px 4px;
        background-color: rgba(252, 252, 252, 0.67);
        color: $blue-dark;
        font-weight: 700;
        border-radius: 4px;
      }
    }
  }

  .re-select {
    button {
      margin: 16px 0;
    }
  }
  .answer-diff {
    margin: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .before-start {
      padding: 8px;
      text-align: center;
      font-weight: 500;
      @include text-style(16, $red);
      @media screen and (max-width: 802px) {
        @include text-style(14, $red);
        white-space: pre-wrap;
        text-align: center;
      }
    }
    .single-select,
    .short-answer {
      .title {
        @include text-style(18, $white);
        width: 100%;
        text-align: center;
        background-color: $blue;
        color: $white;
        font-weight: 700;
        padding: 8px;
        margin-bottom: 16px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        @media screen and (max-width: $md-breakpoint) {
          @include text-style(18, $white);
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
      .input-group {
        width: 300px;
        margin: 16px 0;
        @media screen and (max-width: $md-breakpoint) {
          width: 260px;
        }
        @media screen and (max-width: 280px) {
          width: 240px;
        }
      }
    }
    .img-guide {
      background-color: $background;
      margin: 8px 16px;
      padding: 8px 18px;
      border-radius: 8px;
      p {
        @include text-style(14, $primary);
        i {
          color: $blue;
          margin: 4px;
        }
      }
    }
  }
  .single-select {
    img {
      margin: 24px;
      width: 240px;
      @media screen and (max-width: $md-breakpoint) {
        width: 180px;
        margin: 16px;
      }
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
      width: 280px;

      @media screen and (max-width: $md-breakpoint) {
        width: 216px;
      }
    }

    @media screen and (max-width: $md-breakpoint) {
      margin: 16px 40px;
    }
  }
  .selected {
    background-color: $blue-dark;
    color: $white;
  }
  .see-all-btn {
    margin-top: 16px;
  }
}
</style>

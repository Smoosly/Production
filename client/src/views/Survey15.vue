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
        <div class="answer-box">
          <button :disabled="ans.show == 'hidden'" type="button" @click="setAnswer(i)" v-for="(ans, i) in page[0].answer_options" :key="i" :class="{ selected: answer_1[i] == true }" class="btn-border-answer btn-50-ans answer-btn">
            <p style="line-height: 90%">
              {{ ans.content }} <br />
              <span style="font-size: 11px">{{ ans.subContents }}</span>
            </p>
          </button>
        </div>
      </div>

      <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="700" class="input-birthyear">
        <div class="title">Q. {{ page[1].question_txt }}</div>
        <scroll-picker :options="options" v-model="selections" />
      </div>
    </div>
    <div class="button-container">
      <div class="buttons">
        <button type="button" @click="goBack" class="btn-secondary btn-55 prev-btn">이전</button>
        <button type="button" @click="goNext" class="btn-primary btn-55 next-btn">설문완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar.vue";
import { survey, page_info } from "../../Survey";
import axios from "axios";
import ScrollPicker from "vue3-scroll-picker";
// import ScrollPicker from '@/components/ScrollPicker.vue';

export default {
  data() {
    return {
      paging: page_info,
      survey: survey,
      page: survey.page15,
      percentage: 0,
      answer1: null,
      answer_1: [false, false, false, false, false, false],
      birthyear: "2000",
      selections: ['2000'],
      options: [ [{label: 1940, value: "1940"}, {label: 1941, value: "1941"}, {label: 1942, value: "1942"}, {label: 1943, value: "1943"}, {label: 1944, value: "1944"}, {label: 1945, value: "1945"}, {label: 1946, value: "1946"}, {label: 1947, value: "1947"}, {label: 1948, value: "1948"}, {label: 1949, value: "1949"},
                  {label: 1950, value: "1950"}, {label: 1951, value: "1951"}, {label: 1952, value: "1952"}, {label: 1953, value: "1953"}, {label: 1954, value: "1954"}, {label: 1955, value: "1955"}, {label: 1956, value: "1956"}, {label: 1957, value: "1957"}, {label: 1958, value: "1958"}, {label: 1959, value: "1959"}, 
                  {label: 1960, value: "1960"}, {label: 1961, value: "1961"}, {label: 1962, value: "1962"}, {label: 1963, value: "1963"}, {label: 1964, value: "1964"}, {label: 1965, value: "1965"}, {label: 1966, value: "1966"}, {label: 1967, value: "1967"}, {label: 1968, value: "1968"}, {label: 1969, value: "1969"},
                  {label: 1970, value: "1970"}, {label: 1971, value: "1971"}, {label: 1972, value: "1972"}, {label: 1973, value: "1973"}, {label: 1974, value: "1974"}, {label: 1975, value: "1975"}, {label: 1976, value: "1976"}, {label: 1977, value: "1977"}, {label: 1978, value: "1978"}, {label: 1979, value: "1979"},
                  {label: 1980, value: "1980"}, {label: 1981, value: "1981"}, {label: 1982, value: "1982"}, {label: 1983, value: "1983"}, {label: 1984, value: "1984"}, {label: 1985, value: "1985"}, {label: 1986, value: "1986"}, {label: 1987, value: "1987"}, {label: 1988, value: "1988"}, {label: 1989, value: "1989"},
                  {label: 1990, value: "1990"}, {label: 1991, value: "1991"}, {label: 1992, value: "1992"}, {label: 1993, value: "1993"}, {label: 1994, value: "1994"}, {label: 1995, value: "1995"}, {label: 1996, value: "1996"}, {label: 1997, value: "1997"}, {label: 1998, value: "1998"}, {label: 1999, value: "1999"},
                  {label: 2000, value: "2000"}, {label: 2001, value: "2001"}, {label: 2002, value: "2002"}, {label: 2003, value: "2003"}, {label: 2004, value: "2004"}, {label: 2005, value: "2005"}, {label: 2006, value: "2006"}, {label: 2007, value: "2007"}, {label: 2008, value: "2008"}, {label: 2009, value: "2009"},
                  {label: 2010, value: "2010"}, {label: 2011, value: "2011"}, {label: 2012, value: "2012"}, {label: 2013, value: "2013"}, {label: 2014, value: "2014"}, {label: 2015, value: "2015"}, {label: 2016, value: "2016"}, {label: 2017, value: "2017"}, {label: 2018, value: "2018"}, {label: 2019, value: "2019"},                 
      ] ]
    };
  },
  watch: {
    selections(newVal) {
      console.log(newVal[0]);
      this.birthyear = newVal[0];
    },
  },
  components: {
    ProgressBar,
    ScrollPicker,
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
      this.answer1 = this.page[0].answer_options[index].id;
      console.log(this.answer1);
    },
    goBack() {
      const answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer1,
        [this.page[1].column]: this.birthyear,
      };
      axios
        .post("/breastTest/save/15", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/survey/14");
        })
        .catch(console.log);
    },
    goNext() {
      if (this.answer1 === null || this.birthyear === null) {
        return this.emitter.emit("showRedToast", "답변을 입력해주세요");
      }
      const answers = {
        PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: this.answer1,
        [this.page[1].column]: this.birthyear,
      };
      axios
        .post("/breastTest/save/15", answers)
        .then((result) => {
          console.log(result.data);
          this.endModal();
        })
        .catch(console.log);
    },
    fetchAnswerInfo() {
      axios
        .get("/breastTest/getData/15")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            const ans1 = result.data.record[this.page[0].column];
            console.log(ans1);
            if (ans1 === null) return;
            this.page[0].answer_options.forEach((option, idx) => {
              if (option.id === ans1) {
                this.setAnswer(idx);
              }
            });
            const ans2 = result.data.record[this.page[1].column];
            if (ans2 !== null) {
              this.selections[0] = String(ans2);
              this.birthyear = ans2;
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
    endModal() {
      this.emitter.emit("EndupTestModal", true);
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
    /* padding: 100px 16px; */
    // height: 1200px;
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

  .answer-box {
    display: flexbox;
    justify-content: center;
    align-items: center;
    padding: 16px 132px;

    @media screen and (max-width: $md-breakpoint) {
      padding: 16px 24px;
    }

    button {
      p {
        font-weight: 600;
        span {
          font-size: 14px;
        }
      }
    }
  }

  .single-select,
  .input-birthyear {
    /* width: 80%; */
    .title {
      @include text-style(18, $white);
      /* margin-right: 16px; */
      width: 100%;
      text-align: center;
      background-color: $blue;
      color: $white;
      padding: 8px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      /* margin-top: 8px; */
      font-weight: 700;
      @media screen and (max-width: $md-breakpoint) {
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

    .answer-btn {
      margin: 8px;
      width: 324px;

      @media screen and (max-width: $md-breakpoint) {
        margin: 4px;
        height: 56px;
        width: 280px;
      }

      @media screen and (max-width: 280px) {
        width: 216px;
        height: 76px;
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
  /* 
/* 
  /* 
  .scroll-picker-container {
    width: 200px;
  } */
}
</style>

<template>
  <div class="body">
    <div class="progressbar-container">
      <ProgressBar :percentage="percentage" />
    </div>
    <div class="question-title">
      <h3>
        {{ page[0].flow_txt }} <br />
        <strong>이제부터, 브라 착용에 중요한 신체 특성을 알아보아요.</strong>
      </h3>
    </div>
    <div class="question-container">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q0" class="input-set">
        <div class="title">Q. {{ page[0].question_txt }}</div>
        <div class="img-box">
          <img class="img-1" src="@/assets/test_guide/under_dulle.png" alt="" />
          <img class="img-1" src="@/assets/test_guide/under_dulle_chuzim.png" alt="" />
        </div>
        <div class="img-guide">
          <p><i class="far fa-lightbulb"></i> 줄자를 이용하여, 가슴 아래 볼륨이 끝나는 부분을 기준으로 지면과 수평이 되도록 밑둘레를 측정해주세요</p>
        </div>
        <span><i class="fas fa-exclamation-circle"></i> 가슴이 처진 경우 가슴 아랫 부분을 들어올려, 가슴 아래 볼륨 끝 부분에 줄자를 끼워 넣은 후 진행해주세요</span>
        <div class="short-answer">
          <div class="select-group is-active">
            <select v-model="answer_1" class="form-select">
              <option value="60">60cm</option>
              <option value="61">61cm</option>
              <option value="62">62cm</option>
              <option value="63">63cm</option>
              <option value="64">64cm</option>
              <option value="65">65cm</option>
              <option value="66">66cm</option>
              <option value="67">67cm</option>
              <option value="68">68cm</option>
              <option value="69">69cm</option>
              <option value="70">70cm</option>
              <option value="71">71cm</option>
              <option value="72">72cm</option>
              <option value="73">73cm</option>
              <option value="74">74cm</option>
              <option value="75">75cm</option>
              <option value="76">76cm</option>
              <option value="77">77cm</option>
              <option value="78">78cm</option>
              <option value="79">79cm</option>
              <option value="80">80cm</option>
              <option value="81">81cm</option>
              <option value="82">82cm</option>
              <option value="83">83cm</option>
              <option value="84">84cm</option>
              <option value="85">85cm</option>
              <option value="86">86cm</option>
              <option value="87">87cm</option>
              <option value="88">88cm</option>
              <option value="89">89cm</option>
              <option value="90">90cm</option>
              <option value="91">91cm</option>
              <option value="92">92cm</option>
              <option value="93">93cm</option>
              <option value="94">94cm</option>
              <option value="95">95cm</option>
              <option value="96">96cm</option>
              <option value="97">97cm</option>
              <option value="98">98cm</option>
              <option value="99">99cm</option>
              <option value="100">100cm</option>
              <option value="101">101cm</option>
              <option value="102">102cm</option>
              <option value="103">103cm</option>
              <option value="104">104cm</option>
              <option value="105">105cm</option>
              <option value="106">106cm</option>
              <option value="107">107cm</option>
              <option value="108">108cm</option>
              <option value="109">109cm</option>
              <option value="110">110cm</option>
            </select>
            <i class="fas fa-caret-down" aria-hidden></i>
          </div>
        </div>
      </div>
      <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q1" class="input-set">
        <div class="title">Q. {{ page[1].question_txt }}</div>
        <img class="img-2" src="@/assets/test_guide/upper_dulle.png" alt="" />
        <div class="img-guide">
          <p><i class="far fa-lightbulb"></i> 줄자를 이용하여, 상체를 45도 정도 기울여서 유두를 지나도록 윗둘레를 측정해주세요</p>
        </div>
        <div class="short-answer">
          <div class="select-group is-active">
            <select v-model="answer_2" class="form-select">
              <option value="62">62cm</option>
              <option value="62.5">62.5cm</option>
              <option value="63">63cm</option>
              <option value="63.5">63.5cm</option>
              <option value="64">64cm</option>
              <option value="64.5">64.5cm</option>
              <option value="65">65cm</option>
              <option value="65.5">65.5cm</option>
              <option value="66">66cm</option>
              <option value="66.5">66.5cm</option>
              <option value="67">67cm</option>
              <option value="67.5">67.5cm</option>
              <option value="68">68cm</option>
              <option value="68.5">68.5cm</option>
              <option value="69">69cm</option>
              <option value="69.5">69.5cm</option>
              <option value="70">70cm</option>
              <option value="70.5">70.5cm</option>
              <option value="71">71cm</option>
              <option value="71.5">71.5cm</option>
              <option value="72">72cm</option>
              <option value="72.5">72.5cm</option>
              <option value="73">73cm</option>
              <option value="73.5">73.5cm</option>
              <option value="74">74cm</option>
              <option value="74.5">74.5cm</option>
              <option value="75">75cm</option>
              <option value="75.5">75.5cm</option>
              <option value="76">76cm</option>
              <option value="76.5">76.5cm</option>
              <option value="77">77cm</option>
              <option value="77.5">77.5cm</option>
              <option value="78">78cm</option>
              <option value="78.5">78.5cm</option>
              <option value="79">79cm</option>
              <option value="79.5">79.5cm</option>
              <option value="80">80cm</option>
              <option value="80.5">80.5cm</option>
              <option value="81">81cm</option>
              <option value="81.5">81.5cm</option>
              <option value="82">82cm</option>
              <option value="82.5">82.5cm</option>
              <option value="83">83cm</option>
              <option value="83.5">83.5cm</option>
              <option value="84">84cm</option>
              <option value="84.5">84.5cm</option>
              <option value="85">85cm</option>
              <option value="85.5">85.5cm</option>
              <option value="86">86cm</option>
              <option value="86.5">86.5cm</option>
              <option value="87">87cm</option>
              <option value="87.5">87.5cm</option>
              <option value="88">88cm</option>
              <option value="88.5">88.5cm</option>
              <option value="89">89cm</option>
              <option value="89.5">89.5cm</option>
              <option value="90">90cm</option>
              <option value="90.5">90.5cm</option>
              <option value="91">91cm</option>
              <option value="91.5">91.5cm</option>
              <option value="92">92cm</option>
              <option value="92.5">92.5cm</option>
              <option value="93">93cm</option>
              <option value="93.5">93.5cm</option>
              <option value="94">94cm</option>
              <option value="94.5">94.5cm</option>
              <option value="95">95cm</option>
              <option value="95.5">95.5cm</option>
              <option value="96">96cm</option>
              <option value="96.5">96.5cm</option>
              <option value="97">97cm</option>
              <option value="97.5">97.5cm</option>
              <option value="98">98cm</option>
              <option value="98.5">98.5cm</option>
              <option value="99">99cm</option>
              <option value="99.5">99.5cm</option>
              <option value="100">100cm</option>
              <option value="100.5">100.5cm</option>
              <option value="101">101cm</option>
              <option value="101.5">101.5cm</option>
              <option value="102">102cm</option>
              <option value="102.5">102.5cm</option>
              <option value="103">103cm</option>
              <option value="103.5">103.5cm</option>
              <option value="104">104cm</option>
              <option value="104.5">104.5cm</option>
              <option value="105">105cm</option>
              <option value="105.5">105.5cm</option>
              <option value="106">106cm</option>
              <option value="106.5">106.5cm</option>
              <option value="107">107cm</option>
              <option value="107.5">107.5cm</option>
              <option value="108">108cm</option>
              <option value="108.5">108.5cm</option>
              <option value="109">109cm</option>
              <option value="109.5">109.5cm</option>
              <option value="110">110cm</option>
              <option value="110.5">110.5cm</option>
              <option value="111">111cm</option>
              <option value="111.5">111.5cm</option>
              <option value="112">112cm</option>
              <option value="112.5">112.5cm</option>
            </select>
            <i class="fas fa-caret-down" aria-hidden></i>
          </div>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="700" class="input-set">
        <div class="title">Q. {{ page[2].question_txt }}</div>
        <div class="img-box">
          <img class="img-3" src="@/assets/test_guide/youjang_giri.png" alt="" />
          <img class="img-3" src="@/assets/test_guide/youjang_giri_chuzim.png" alt="" />
        </div>
        <div class="img-guide">
          <p><i class="far fa-lightbulb"></i> 한 쪽 어깨를 이등분한 점에서 유두점까지를 측정해 주세요</p>
        </div>
        <span><i class="fas fa-exclamation-circle"></i> 가슴이 처진 경우 브라를 입은 상태에서 측정해 주세요</span>
        <div class="short-answer">
          <div class="select-group is-active">
            <select v-model="answer_3" class="form-select">
              <option value="15">15cm</option>
              <option value="16">16cm</option>
              <option value="17">17cm</option>
              <option value="18">18cm</option>
              <option value="19">19cm</option>
              <option value="20">20cm</option>
              <option value="21">21cm</option>
              <option value="22">22cm</option>
              <option value="23">23cm</option>
              <option value="24">24cm</option>
              <option value="25">25cm</option>
              <option value="26">26cm</option>
              <option value="27">27cm</option>
              <option value="28">28cm</option>
              <option value="29">29cm</option>
              <option value="30">30cm</option>
              <option value="31">31cm</option>
              <option value="32">32cm</option>
              <option value="33">33cm</option>
              <option value="34">34cm</option>
              <option value="35">35cm</option>
              <option value="36">36cm</option>
              <option value="37">37cm</option>
              <option value="38">38cm</option>
              <option value="39">39cm</option>
              <option value="40">40cm</option>
              <option value="41">41cm</option>
              <option value="42">42cm</option>
              <option value="43">43cm</option>
              <option value="44">44cm</option>
              <option value="45">45cm</option>
            </select>
            <i class="fas fa-caret-down" aria-hidden></i>
          </div>
        </div>
      </div>
      <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="700" id="q2" class="input-set">
        <div class="title">Q. {{ page[3].question_txt }}</div>
        <img class="img-4" src="@/assets/test_guide/shoulder_neobi.png" alt="" />
        <div class="img-guide">
          <p><i class="far fa-lightbulb"></i> 팔을 위로 들어 올리면 움푹 들어가는 부분을 시작점으로 하여 반대편 지점까지 측정해주세요</p>
        </div>
        <div class="short-answer">
          <div class="select-group is-active">
            <select v-model="answer_4" class="form-select">
              <option value="25">25cm</option>
              <option value="26">26cm</option>
              <option value="27">27cm</option>
              <option value="28">28cm</option>
              <option value="29">29cm</option>
              <option value="30">30cm</option>
              <option value="31">31cm</option>
              <option value="32">32cm</option>
              <option value="33">33cm</option>
              <option value="34">34cm</option>
              <option value="35">35cm</option>
              <option value="36">36cm</option>
              <option value="37">37cm</option>
              <option value="38">38cm</option>
              <option value="39">39cm</option>
              <option value="40">40cm</option>
              <option value="41">41cm</option>
              <option value="42">42cm</option>
              <option value="43">43cm</option>
              <option value="44">44cm</option>
              <option value="45">45cm</option>
            </select>
            <i class="fas fa-caret-down" aria-hidden></i>
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
// import TestResultVue from '../components/TestResult.vue';

export default {
  data() {
    return {
      paging: page_info,
      survey: survey,
      page: survey.page2,
      answer_1: null,
      answer_2: null,
      answer_3: null,
      answer_4: null,
      percentage: 0,
    };
  },
  components: {
    ProgressBar,
  },
  methods: {
    goBack() {
      const answers = {
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: parseFloat(this.answer_1),
        [this.page[1].column]: parseFloat(this.answer_2),
        [this.page[2].column]: parseFloat(this.answer_3),
        [this.page[3].column]: parseFloat(this.answer_4),
      };
      axios
        .post("/breastTest/save/2?back=yes", answers)
        .then((result) => {
          console.log(result.data);
          this.$router.push("/Test");
        })
        .catch(console.log);
    },
    goNext() {
      if (this.answer_1 === null || this.answer_2 === null || this.answer_4 === null) {
        const questions = [this.answer_1, this.answer_2, this.answer_4]
        for (let i=0; i<questions.length; i++) {
          if (questions[i] === null) {
            document.getElementById(`q${i}`).scrollIntoView(false);
            break;
          }
        }
        return this.emitter.emit("showRedToast", "답변을 입력해주세요.");
      }
      if (this.answer_1 > this.answer_2){
        return this.emitter.emit("showRedToast", "윗가슴 둘레를 밑가슴 둘레보다 작지 않게 입력해주세요.");
      }
      const answers = {
        // PK_ID: this.$store.state.PK_ID,
        [this.page[0].column]: parseFloat(this.answer_1),
        [this.page[1].column]: parseFloat(this.answer_2),
        [this.page[2].column]: parseFloat(this.answer_3),
        [this.page[3].column]: parseFloat(this.answer_4),
      };
      console.log(answers);
      axios
        .post("/breastTest/save/2", answers)
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            console.log(result.data.message);
          }
        })
        .catch(console.log);
      this.$router.push("/survey/3");
    },
    fetchAnswerInfo() {
      // 이전에 저장된 답변 정보 불러오기
      axios
        .get("/breastTest/getData/2")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            const ans1 = result.data.record[this.page[0].column] && result.data.record[this.page[0].column];
            const ans2 = result.data.record[this.page[1].column] && result.data.record[this.page[1].column];
            const ans3 = result.data.record[this.page[2].column] && result.data.record[this.page[2].column];
            const ans4 = result.data.record[this.page[3].column] && result.data.record[this.page[3].column];
            ans1 && (this.answer_1 = ans1);
            ans2 && (this.answer_2 = ans2);
            ans3 && (this.answer_3 = ans3);
            ans4 && (this.answer_4 = ans4);
          }
        })
        .catch(console.log);
    },
    fetchProgress() {
      axios
        .get("/breastTest/getProgress")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.percentage = result.data.Progress;
          }
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
/* *:not(i):not(button) {
  font-family: $font-main, sans-serif !important;
} */

.body {
  /* height: 300vh; */
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 100px;

  @media screen and (max-width: $md-breakpoint) {
    padding: 90px 55px;
    /* height: 1700px; */
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

      strong {
        @include text-style(14, $secondary);
        font-weight: 400;
        text-align: center;

        @media screen and (max-width: $md-breakpoint) {
          @include text-style(13, $secondary);
        }
      }
    }
  }

  .input-set {
    margin: 32px;
    /* width: 90%; */
    .title {
      @include text-style(18, $white);
      /* margin-right: 16px; */
      width: 100%;
      text-align: center;
      background-color: $blue;
      font-weight: 700;
      color: $white;
      padding: 8px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      /* margin-top: 8px; */
      @media screen and (max-width: $md-breakpoint) {
        @include text-style(18, $white);
      }

      @media screen and (max-width: 280px) {
        @include text-style(16, $white);
      }
    }
    background-color: $white;
    flex-direction: column;
    display: flex;
    width: 700px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    box-shadow: 1px 4px 4px 1px $border;

    @media screen and (max-width: $md-breakpoint) {
      flex-direction: column;
      width: 330px;
      margin: 16px 8px;
      @include text-style(14, $primary);
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

  .img-1 {
    margin: 16px 8px;
    width: 180px;

    @media screen and (max-width: $md-breakpoint) {
      width: 108px;
      margin: 12px 4px;
    }
  }

  .img-2 {
    margin: 24px;
    width: 300px;
    /* height: 400px; */

    @media screen and (max-width: $md-breakpoint) {
      width: 144px;
      margin: 16px;
      /* height: 200px; */
    }
  }

  .img-3 {
    margin: 16px 8px;
    width: 200px;
    /* height: 350px; */

    @media screen and (max-width: $md-breakpoint) {
      width: 120px;
      margin: 8px 4px;
      /* height: 200px; */
    }
  }

  .img-box {
    display: flex;
  }

  .img-4 {
    margin: 16px;
    width: 216px;
    /* height: 200px; */

    @media screen and (max-width: $md-breakpoint) {
      width: 144px;
      /* height: 120px; */
    }
  }

  .img-guide {
    background-color: $background;
    margin: 8px 16px;
    padding: 8px 18px;
    border-radius: 8px;
    /* text-align: center; */
    p {
      @include text-style(14, $primary);
      i {
        color: $blue;

        /* font-size: 18px; */
        margin: 4px;
      }
    }
  }

  span {
    /* margin-top: 4px; */
    color: $red;
    padding: 2px 64px;

    @media screen and (max-width: $md-breakpoint) {
      @include text-style(13, $red);
      padding: 0px 28px;
      line-height: 160%;
    }

    i {
      color: $red;
    }
  }

  .short-answer {
    margin: 8px;

    input {
      /* width: 300px; */
      margin-bottom: 16px;
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

  .select-group {
    width: 200px;
    margin: 4px;
  }
}
</style>

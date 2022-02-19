<template>
  <div class="body">
    <div class="progressbar-container">
      <ProgressBar :percentage="percentage" />
    </div>
    <div class="question-title">
      <!-- <h4>설문이 완료되었습니다.</h4> -->
    </div>

    <div class="spinner-box">
      <FadeLoader :loading="isLoading" :color="color" :size="size"></FadeLoader>
      <p>
        스무슬리가 결과를 분석하고 있습니다. <br />
        잠시만 기다려 주세요..
      </p>
    </div>
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar.vue";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";
import { survey, page_info } from "../../Survey";
import axios from "axios";

export default {
  data() {
    return {
      isLoading: true,
      color: "#FFD07F",
      size: "5em",
      paging: page_info,
      survey: survey,
      page: survey.page16,
      percentage: 100,
    };
  },
  components: {
    ProgressBar,
    FadeLoader,
  },
  mounted() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.$router.push("/survey/result");
    }, 5000);
  },
  methods: {
    async goResultPage() {
      this.$router.push("/survey/result");
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
    this.fetchProgress();
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button):not(input[type="password"]) {
  font-family: $font-main, sans-serif !important;
}

.body {
  // height: 140vh;
  height: auto;
  background-color: $white;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 100px;

  @media screen and (max-width: $md-breakpoint) {
    padding: 90px 55px;
    // height: 1000px;
    height: auto;
  }

  .question-title {
    @include text-style(14, $blue-dark);
    margin-top: 8px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: $md-breakpoint) {
      @include text-style(14, $blue-dark);
      margin-top: 8px;
    }

    p {
      text-align: center;
    }
  }
  .spinner-box {
    display: flex;
    margin-top: 196px;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      padding: 64px 0;
      text-align: center;
      @include text-style(14, $blue-dark);
      font-weight: bold;
    }
  }
}
</style>

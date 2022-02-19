<template>
  <div class="body">
    <div class="progressbar-container">
      <ProgressBar :percentage="percentage" :step="step" :testSize="testSize" :currentStep="currentStep" />
    </div>
    <!-- step 1 : kit upload -->
    <div class="spinner-box" v-if="isLoading">
      <PulseLoader style="padding: 80px;" :loading="isLoading" :color="color" :size="size"></PulseLoader>
    </div>

    <div v-if="!isLoading" class="item kit-upload">
      <div class="status-bar">
        <h3>키트 업로드</h3>
      </div>
      <div class="description">
        키트를 통해 가슴을 측정해 보시고
        <br />
        사진을 찍어 업로드 해주세요.
        <br />
        <span>양쪽 가슴의 유선이나 부피가 많이 다르다면 양쪽 모두 측정해주시는 것을 권합니다!</span>
      </div>
      <!-- 업로드 가이드 모달 버튼 추가  -->
      <div class="button-box">
        <button type="button" @click="this.emitter.emit('KitGuideModal', true)" class="btn-outlined btn-40">키트 사용 가이드 보기</button>
      </div>
      <div class="upload-container">
        <div class="image-upload1 btn-container">
          <img class="btn-img" src="@/assets/leftkit.png" @click="$refs.file1.click" />

          <input v-if="uploadLeftReady" type="file" accept="image/*" ref="file1" style="display: none" @change="changeFile1" />

          <img v-if="yesLeft" src="/kits/getImg/left" alt="" class="preview-img" />
          <img v-if="newLeft" :src="preImageLeft" alt="" class="preview-img" />
          <i
            @click="
              if (yesLeft) yesLeft = false;
              if (newLeft) newLeft = false;
              leftObj = {};
              preImageLeft = null;
              uploadLeftReady = true;
            "
            v-if="newLeft || yesLeft"
            class="fas fa-times-circle cancel-icon"
          ></i>
        </div>
        <div class="image-upload2 btn-container">
          <img class="btn-img" src="@/assets/rightkit.png" @click="$refs.file2.click" />

          <input v-if="uploadRightReady" type="file" accept="image/*" ref="file2" style="display: none" @change="changeFile2" />

          <img v-if="yesRight" src="/kits/getImg/right" alt="" class="preview-img" />
          <img v-if="newRight" :src="preImageRight" alt="" class="preview-img" />
          <i
            @click="
              if (yesRight) yesRight = false;
              if (newRight) newRight = false;
              rightObj = {};
              preImageRight = null;
              uploadRightReady = true;
            "
            v-if="newRight || yesRight"
            class="fas fa-times-circle cancel-icon"
          ></i>
        </div>
      </div>
      <button @click="submitKit" type="button" class="btn-primary btn-55 btn-upload">키트 업로드</button>
    </div>
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import axios from "axios";
import path from "path";

export default {
  name: "Test",
  data() {
    return {
      step: 1,
      isLoading: false,
      color: "#FFD07F",
      size: "1em",
      image: "",
      preImageLeft: "",
      preImageRight: "",
      yesLeft: false,
      yesRight: false,
      newLeft: false,
      newRight: false,
      leftObj: {},
      rightObj: {},
      uploadLeftReady: true,
      uploadRightReady: true,
      testSize: 20,
      currentStep: 0,
      percentage: 0,
    };
  },
  components: {
    ProgressBar,
    PulseLoader,
  },
  mounted() {
    window.scrollTo(0, 0);
    this.emitter.emit("KitGuideModal", true);
  },
  methods: {
    add() {
      this.currentStep++;
    },
    minus() {
      this.currentStep--;
    },
    changeFile1(e) {
      let input = e.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target);
          this.preImageLeft = e.target.result;
          // console.log(e.target.result);
          this.yesLeft = false;
          this.newLeft = true;
        };
        reader.readAsDataURL(input.files[0]);
        this.leftObj = input.files[0];
        // console.log(input.files[0]);
        this.uploadLeftReady = false;
      }
    },
    changeFile2(e) {
      let input = e.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target);
          this.preImageRight = e.target.result;
          // console.log(e.target.result);
          this.yesRight = false;
          this.newRight = true;
        };
        reader.readAsDataURL(input.files[0]);
        // console.log(input.files[0]);
        this.rightObj = input.files[0];
      }
      this.uploadRightReady = false;
    },
    submitKit() {
      this.isLoading = true;
      if (!this.newLeft && !this.newRight && !this.yesLeft && !this.yesRight) {
        this.isLoading = false;
        this.emitter.emit("showRedToast", "사진을 업로드해주세요");
        return;
      }
      let fd = new FormData();
      let data = {
        PK_ID: this.$store.state.PK_ID,
        yesLeft: this.yesLeft,
        yesRight: this.yesRight,
      };
      let dataString = JSON.stringify(data);
      console.log(dataString);
      if (this.newLeft) {
        fd.append("left", this.leftObj, `${data.PK_ID}_left${path.extname(this.leftObj.name)}`);
      }
      if (this.newRight) {
        fd.append("right", this.rightObj, `${data.PK_ID}_right${path.extname(this.rightObj.name)}`);
      }
      fd.append("data", dataString);
      axios.post("/kits/img/upload", fd, { headers: { "Content-Type": "multipart/form-data" } })
        .then((result) => {
          console.log(result.data);
          //이미지 업로드 결과 : 정상 -> 다음 단계로 (로딩페이지 거쳐서) , 비정상 -> 재업로드 요청
          this.isLoading = false;
          if (result.data.success) {
            //state 저장 로직 추가
            console.log(result.data.message);
            // 해당 유저가 이전에 마무리한 설문 페이지받아서 이동
            // const lastPage = result.data.lastPage
            // this.$router.push(`/survey/${lastPage}`)
            this.emitter.emit("showToast", result.data.message);
            return this.$router.push("/survey/2");
          }
          return this.emitter.emit("showRedToast", result.data.message);
        })
        .catch((err) => console.log(err));
    },
    async fetchKitInfo() {
      await axios.get("/kits/checkImg")
        .then((result) => {
          console.log(result.data);
          // result.data.success여부 체크
          if (result.data.success) {
            if (result.data.where === 0) {
              this.yesLeft = true;
              console.log(this.yesLeft, this.yesRight);
            }
            if (result.data.where === 1) {
              this.yesRight = true;
              console.log(this.yesLeft, this.yesRight);
            }
            if (result.data.where === 2) {
              this.yesLeft = true;
              this.yesRight = true;
              console.log(this.yesLeft, this.yesRight);
            }
          }
        })
        .catch(console.log);
    },
  },
  watch: {
    $route(to, from) {
      console.log(from);
      if (to.name !== "Test") {
        this.emitter.emit("KitGuideModal", false)
      }
    },
  },
  created() {
    this.fetchKitInfo();
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button):not(input[type="password"]) {
  font-family: $font-main, sans-serif !important;
}

.body {
  /* height: 140vh; */
  height: auto;
  background-color: $white;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 100px;

  @media (max-width: 768px) {
    padding: 90px 36px;
    /* height: 1400px; */
    height: auto;
  }

  @media screen and (max-width: 414px) {
    padding: 90px 16px;
  }

  .button-box {
    margin-bottom: 32px;
  }

  .upload-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .image-upload1 {
      margin-right: 16px;

      @media screen and (max-width: 280px) {
        margin-right: 8px;
      }
    }
  }

  .btn-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border-radius: 15px;
    background-color: $background;
    margin-bottom: 32px;
    overflow: hidden;
    box-shadow: 0px 3px 7px 0px $tertiary;

    @media screen and (max-width: 768px) {
      width: 150px;
      height: 150px;
    }

    @media screen and (max-width: 320px) {
      width: 142px;
      height: 142px;
    }

    .preview-img {
      position: absolute;
      top: 1px;
      left: 1px;
      right: 1px;
      display: block;
      height: 100%;
      width: 100%;
      border-radius: 15px;

      &:hover {
        opacity: 0.5;
      }
    }

    i {
      position: absolute;
      right: 5%;
      top: 5%;
      /* left: 50%;
			bottom: 50%; */
      z-index: 50;
      font-size: 2rem;
      color: $secondary;
      cursor: pointer;
      z-index: 3;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .description {
    @include text-style(16, $primary);
    text-align: center;
    margin: 32px 50px;

    span {
      @include text-style(14, $secondary);
    }

    @media (max-width: 768px) {
      margin: 16px;
    }

    @media screen and (max-width: 280px) {
      margin: 8px;
    }
  }

  /* imaged preview */
  .filebox .upload-display {
    /* 이미지가 표시될 지역 */
    margin-bottom: 5px;
  }

  @media (min-width: 768px) {
    .filebox .upload-display {
      display: inline-block;
      margin-right: 5px;
      margin-bottom: 0;
    }
  }
  .filebox .upload-thumb-wrap {
    /* 추가될 이미지를 감싸는 요소 */
    display: inline-block;
    width: 54px;
    padding: 2px;
    vertical-align: middle;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
  }

  .filebox .upload-display img {
    /* 추가될 이미지 */
    display: block;
    max-width: 100%;
    width: 100% \9;
    height: auto;
  }

  .file-left label {
    @include text-style(16);
    display: inline-flexbox;
    justify-content: center;
    align-items: center;

    padding: 16px 8px;
    color: #fff;
    font-weight: 700;
    /* line-height: normal; */
    /* vertical-align: middle; */
    background-color: $blue;
    cursor: pointer;
    /* border: 1px solid #4cae4c; */
    border-radius: 4px;
    -webkit-transition: background-color 0.2s;
    transition: background-color 0.2s ease-in-out;
  }

  .file-left label:not(:disabled):hover {
    background-color: $blue-dark;
  }

  .file-left input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .preview-img {
    width: 80px;
    height: 80px;
  }

  .btn-img {
    &:hover {
      opacity: 0.7;
    }

    @media (max-width: 768px) {
      width: 75px;
      height: 75px;
    }
  }

  .btn-upload {
    margin-top: 32px;
    width: 150px;
  }

  .spinner-box {
    display: flex;
    /* margin-top: 200px; */
    padding: 200px 0;
    align-items: center;
    justify-content: center;
  }

  .status-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;

    h3 {
      @include text-style(18, $primary);
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>

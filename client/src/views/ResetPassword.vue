<template>
  <div class="body">
    <h3>비밀번호 재설정</h3>
    <div class="input-group">
      <div data-aos="fade-left" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <label for="password">비밀번호&nbsp;<span>*</span></label>
        <div class="pw-input">
          <input :type="passwordType" class="form-input" placeholder="비밀번호(6자 이상)" v-model="password" />
          <i v-if="passwordType === 'text'" @click="isHidden" class="fas fa-eye"></i>
          <i v-if="passwordType === 'password'" @click="isHidden" class="fas fa-eye-slash"></i>
        </div>
        <p class="pw-valid" v-if="!isPasswordValid">&nbsp;비밀번호는 숫자, 영문을 사용해 6자이상 입력해주세요.</p>
      </div>

      <div data-aos="fade-right" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="input-group">
        <label for="password">비밀번호 확인</label>
        <div class="pw-input">
          <input :type="passwordType2" class="form-input" placeholder="" v-model="passwordCheck" />
          <i v-if="passwordType2 === 'text'" @click="isHidden2" class="fas fa-eye"></i>
          <i v-if="passwordType2 === 'password'" @click="isHidden2" class="fas fa-eye-slash"></i>
        </div>
        <p class="pw-valid" v-if="passwordCheck && passwordCheck !== password">비밀번호가 일치하지 않습니다.</p>
      </div>
    </div>

    <div class="container-button">
      <button v-bind:disabled="passwordCheck !== password" @click="setPassword" type="submit" class="btn-primary btn-48">비밀번호 변경</button>
    </div>
  </div>
</template>

<script>
import { validatePW } from "@/utils/validation";
import axios from "axios";

export default {
  data() {
    return {
      passwordType: "password",
      passwordType2: "password",

      password: "",
      passwordCheck: "",
    };
  },
  computed: {
    isPasswordValid() {
      return validatePW(this.password);
    },
  },
  methods: {
    async setPassword() {
      let data = {
        token: this.$route.query.token,
        newPassword: this.password,
      };
      console.log(data);
      axios.post("/resetPwd/setNew", data)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            console.log(res.data.message);
            this.emitter.emit("showToast", res.data.message);
            this.$router.push("/");
            this.emitter.emit("loginModal", true);

          } else {
            console.log(res.data.message);
            this.emitter.emit("showRedToast", res.data.message);
          }
        })
        .catch(console.log);
    },
    isHidden() {
      this.passwordType = this.passwordType === "password" ? "text" : "password";
    },
    isHidden2() {
      this.passwordType2 = this.passwordType2 === "password" ? "text" : "password";
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  /* z-index: 110; */
  /* margin: 20px; */
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    @include text-style(18, $primary);
    margin-bottom: 8px;
  }

  .input-group {
    margin: 8px 0;
    width: 300px;
  }

  .pw-input {
    position: relative;
    i {
      cursor: pointer;
      position: absolute;
      @include pos-center-y;
      margin-left: auto;
      left: 90%;
      font-size: 18px;
      color: $secondary;
    }
  }

  button {
    margin-top: 8px;
    width: 300px;
  }

  p {
    @include text-style(12, $red);
  }
}
</style>

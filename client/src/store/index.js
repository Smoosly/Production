import { createStore } from "vuex";
import { getAuthFromCookie, getUserFromCookie, saveAuthToCookie, saveUserToCookie } from "@/utils/cookies";
import { loginUser } from "@/api/auth";

export default createStore({
  state() {
    return {
      mailCheck: false,
      // mailCheckMsg:'',
      PK_ID: getUserFromCookie() || "",
      token: getAuthFromCookie() || "",
    };
  },
  actions: {
    // 로그인 business logic
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      if (data.success) {
        // console.log(data.message);
        console.log(data.userData);
        this.state.mailCheck = true;
        commit("setToken", data.userData.token);
        commit("setCode", data.userData.PK_ID); // data.user.email 인지 check 필요
        saveAuthToCookie(data.userData.token);
        saveUserToCookie(data.userData.PK_ID); // email -> PK_ID
      } else {
        alert("입력된 정보가 올바르지 않습니다.");
      }
      console.log(data);
      return data;
    },
  },
  getters: {
    isLogin(state) {
      return state.PK_ID !== "";
    },
  },
  mutations: {
    setUser(state, userData) {
      state.user = { ...state.user, ...userData };
    },
    setCode(state, PK_ID) {
      state.PK_ID = PK_ID;
    },
    clearCode(state) {
      state.PK_ID = "";
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    },
  },
});

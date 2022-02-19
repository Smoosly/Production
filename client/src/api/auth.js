// 로그인, 회원가입, 회원 탈퇴 등 계정 관련 api
import { instance } from "./index";

// 회원가입 API
function registerUser(userData) {
  return instance.post("/users/signup", userData);
}

// 로그인 API
function loginUser(userData) {
  return instance.post("/users/login", userData);
}

export { registerUser, loginUser };

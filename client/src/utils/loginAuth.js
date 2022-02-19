import { deleteCookie } from "@/utils/cookies";
function checkAuth(data) {
  if (Object.keys(data).includes("isAuth") && data.isAuth === false) {
    this.$store.commit("clearCode");
    this.$store.commit("clearToken");
    deleteCookie("auth");
    deleteCookie("user");
    console.log("여기 로직 리팩토링");
    this.$router.push("/");
    this.emitter.emit("loginModal", true);
    this.emitter.emit("showRedToast", "로그인 후 이용해주세요.");
    return;
  }
  console.log(data.message);  
}

export default checkAuth;
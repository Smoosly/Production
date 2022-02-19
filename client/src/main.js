import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import mitt from "mitt";
import store from "@/store/index";

// aos
import AOS from "aos";
import "aos/dist/aos.css";

//fort-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

let emitter = mitt();
let app = createApp(App);

library.add(faUserSecret);

app.config.globalProperties.emitter = emitter;
app.component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).use(AOS.init).mount("#app");

import { createApp } from "vue";
import "./styles/index.css";
import router from "@/router/index";
import App from "@/App.vue";

const app = createApp(App);
app.use(router);

app.mount("#app")
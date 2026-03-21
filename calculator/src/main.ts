import { createApp } from "vue";
import "./css/index.css";
import { bindShortcutKey } from "./utils/bindShortcutKey";
import { createPinia } from "pinia";
import App from "@/App.vue";

const app = createApp(App);
app.use(createPinia());
bindShortcutKey();

app.mount("#app");

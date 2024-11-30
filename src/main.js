import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/global.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "vuetify/styles";
import "primeicons/primeicons.css"; // PrimeIcons (필요한 경우)
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const vuetify = createVuetify({
  components,
  directives,
  iconfont: "md",
  typography: {
    font: "Noto Sans KR, Noto Sans", // 폰트 변경
  },
});

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});
app.use(ElementPlus);
app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");

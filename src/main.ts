import { createApp } from "vue";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";
import trTR from "element-plus/lib/locale/lang/tr";
import { Calendar, DatePicker } from "v-calendar";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import VueElementLoading from "vue-element-loading";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "@/core/plugins/prismjs";
import "bootstrap";
import "v-calendar/dist/style.css";

const app = createApp(App);

app.component("VueElementLoading", VueElementLoading);
app.component("Datepicker", Datepicker);
app.use(store);
app.use(router);
app.use(ElementPlus, {
  locale: trTR,
});

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);
app.component("Calendar", Calendar);
app.component("DatePicker", DatePicker);
app.mount("#app");

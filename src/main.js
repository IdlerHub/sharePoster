import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/axios";
import wx from "jweixin-module";
import utils from "@/utils/utils.js";
Vue.prototype.$wx = wx;
Vue.prototype.$utils = utils;

import { picker, Toast, Popup } from "vant";
Vue.use(picker)
  .use(Toast)
  .use(Popup);

Vue.config.productionTip = false;
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.config.productionTip = false;
Vue.prototype.$toast = Toast;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

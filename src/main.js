import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/axios";
import wx from "jweixin-module";
import utils from "@/utils/utils.js";
Vue.prototype.wx = wx;
Vue.prototype.utils = utils;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

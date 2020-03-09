/*
 * @Date: 2020-03-06 17:49:00
 * @LastEditors: hxz
 * @LastEditTime: 2020-03-09 10:47:12
 */
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
Vue.prototype.$toast = Toast;

/* 手机查看console */
if (process.env.NODE_ENV !== "development") {
  var VConsole = require("vconsole/dist/vconsole.min.js");
  new VConsole();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

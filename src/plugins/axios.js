/*
 * @Date: 2020-01-10 09:48:14
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-15 19:40:57
 */
"use strict";

import Vue from "vue";
import axios from "axios";
import qs from "qs";
import store from "@/store";

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

let config = {
  baseURL: process.env.VUE_APP_baseURL,
  timeout: 10000 // Timeout
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    /* post请求参数序列化 */
    Object.assign(config.headers, { uid: store.state.uid });
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (response.status == 200 && response.data.code == 1) {
      return response.data.data;
    } else {
      return Promise.reject(response.data);
    }
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;

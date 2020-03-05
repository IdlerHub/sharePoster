import Vue from "vue";

export default {
  //获取用户code
  getUserCode(params) {
    return Vue.axios.post("", params);
  }
};

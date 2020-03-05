import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: null
  },
  mutations: {
    setUid(state, val) {
      state.uid = val;
    }
  },
  actions: {}
});

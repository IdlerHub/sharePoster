import Vue from "vue";

export default {
  /**
   * @description: 提交用户信息
   * @param { uid province_id city_id university share_qrcode user_image user_createtime name}
   * @return: promise
   */
  putUserInfo(params) {
    return Vue.axios.post("/Studyreport/putUserInfo", params);
  },
  //POST Studyreport/uploadImage 上传图片
  uploadImage(params) {
    return Vue.axios.post("/Studyreport/uploadImage", params);
  },

  //POST /Studyreport/getAllUniversity 获取用户信息  uid
  getUserInfo(params) {
    return Vue.axios.post("/Studyreport/getUserInfo", params);
  },
  //POST /Studyreport/getAllProvince 获取省份信息
  getAllProvince() {
    return Vue.axios.post("/Studyreport/getAllProvince");
  },
  //POST /Studyreport/getCity 市信息 province_id
  getCity(params) {
    return Vue.axios.post("/Studyreport/getCity", params);
  },
  //POST /Studyreport/getAllUniversity 学校信息  city_id
  getAllUniversity(params) {
    return Vue.axios.post("/Studyreport/getAllUniversity", params);
  },
  //POST /Studyreport/getJsConfig 获取签名  url
  getJsConfig(params) {
    return Vue.axios.post("/Studyreport/getJsConfig", params);
  }
};

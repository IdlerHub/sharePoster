<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return {};
  },
  beforeMount() {
    this.wx.miniProgram.getEnv(res => {
      console.log(res)
      if (res.miniprogram) {
        /* 用户id */
        // const uid = this.utils.getQueryString("uid");
        // /* 商品id */
        // const goodsId = this.utils.getQueryString("goodsId");
        // console.log(uid, goodsId);
        // this.$store.commit("setAuth", { uid, goodsId });
      }
    });
  },
  methods: {
    // redirectToAuthPage() { //初始化
    //   const redirectURI = encodeURIComponent(`http://192.168.1.105:8080/`);  //网址
    //   const state = encodeURIComponent('');
    //   const APPID = 'wx756d04f5d669cef0';
    //   const wxURI = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${redirectURI}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    //   window.location.href = wxURI;
    // }
  },
  created(){
    // this.redirectToAuthPage()
  }
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>

<template>
  <div id="app">
    <div class="audio">
      <img class="music" src="@/images/music.png" alt />
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return {};
  },
  mounted(){
    if (process.env.NODE_ENV == "development") {
      this.init();
    } else {
      this.$wx.miniProgram.getEnv(res => {
        console.log("mini")
        if (res.miniprogram) {
          this.init();
        }
      });
    }
  },
  methods: {
    init() {
      /* 用户id */
      const uid = this.$utils.getQueryString("uid");
      console.log(11111,uid);
      this.$store.commit("setUid", { uid });
    }
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
  position: relative;
}
.audio{
  margin-top: .9275rem;
  width: 100%;
  height: 2.1875rem;
  position: absolute;
  right: 3.36%;
  top: 0;
  z-index: 99;
  .music{
    width: 9.68%;
    height: 100%;
    position: absolute;
    right: .6925rem;
    top: -0.125rem;
    // animation: run 3s infinite;
  }
}
@keyframes run {
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>

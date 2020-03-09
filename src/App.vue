<template>
  <div id="app">
    <div class="audio">
      <audio src="@/assets/music.mp3" loop="loop" id="bg-music" ref="MusicPlay" preload="auto"></audio>
      <img v-show="musicFlag" class="music" src="@/images/music.png" alt @click="setMusic"/>
      <img v-show="!musicFlag" class="music stop" src="@/images/stop-music.png" alt @click="setMusic"/>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return {
      musicFlag: true //true: 当前正在播放
    };
  },
  created(){
    this.init();
    // if (process.env.NODE_ENV == "development") {
    //   this.init();
    // } else {
    //   this.$wx.miniProgram.getEnv(res => {
    //     console.log("mini")
    //     if (res.miniprogram) {
    //       this.init();
    //     }
    //   });
    // }
  },
  mounted(){
    this.$refs.MusicPlay.play();
    this.musicFlag = true;
  },
  beforeDestroy(){
    //销毁前关掉音乐
    this.$refs.MusicPlay.stop();
    this.musicFlag = false;
  },
  methods: {
    init() {
      /* 用户id */
      const uid = this.$utils.getQueryString("uid");
      console.log(11111,uid);
      this.$store.commit("setUid", { uid });
    },
    setMusic(){
      this.musicFlag = !this.musicFlag;
      if(!this.musicFlag){//点击暂停
        this.$refs.MusicPlay.pause();
      }else{
        this.$refs.MusicPlay.play();
      }
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
  width: 100%;
  height: 35px;
  position: absolute;
  top: 12px;
  right: 26.5px;
  // top: 12px;
  // right: 12.5px;
}
.music{
  width: 35px;
  height: 35px;
  position: absolute;
  right: 0;
  top: 0;
  animation: run 2s linear infinite;
  z-index: 99;
}
.stop{
  animation: none;
}
@keyframes run {
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
@media screen and (min-width: 414px){
  .audio{
    right: 32.5px ;
  }
}
@media screen and (max-width: 320px){
  .audio{
    // top: 28px;
    right: 21px;
  }
}
@media screen and (min-height: 1000px) {
  .audio{
    top: 28px;
  }
}
</style>

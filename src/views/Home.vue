<template>
  <div class="home">
    <div class="content">
      <!--img class="books-img" src="@/images/books.png" alt /-->
      <img class="audio-img" src="@/images/music.png" alt />
      <div class="title">
        <img class="title-img" src="@/images/title.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data(){
    return {};
  },
  methods: {
    next(){
      console.log("下一步");
      this.$router.replace({name: 'share'});
    }
  }
};
</script>
<style scoped lang="scss">
  .home{
    width: 100%;
    height: 100%;
    background: url('../assets/poster-bg.png') no-repeat;
    .content{
      width: calc(100% - 1.125rem /* 18/16 */);
      height: calc(100% - 2.0625rem /* 33/16 */);
      // height: 100%;
      overflow: hidden;
      position: absolute;
      top: 1.0625rem;
      bottom: .9375rem;
      background: url('../images/books.png') no-repeat;
      background-size: 100% 100%;
      .audio-img{
          position: absolute;
          right: 0.9125rem;
          top: 0.5125rem;
          width: 2.1875rem;
          height: 2.1875rem;
        }
      .audio{
        height: 2.1875rem /* 35/16 */;
        margin-top: 0.8rem;
        margin-right: .8125rem /* 13/16 */;
        position: relative;
        .audio-img{
          position: absolute;
          right: 0;
          top: 0;
          width: 2.1875rem /* 35/16 */;
          height: 2.1875rem;
        }
      }
      .title{
        margin-top: 2.1875rem;
        height: 2.125rem /* 34/16 */;
        margin-left: 2.765rem /* 49/16 */;
        .title-img{
          width: 15.875rem /* 254/16 */;
          height: 2.125rem;
        }
      }
    }
  }
</style>
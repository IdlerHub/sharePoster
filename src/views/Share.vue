<template>
  <div class="share">
    <div class="imageWrapper" ref="imageWrapper">
      <!-- <img class="real_pic" :src="dataURL" /> -->
      <!-- 需要转化为图片的DOM元素 -->
      <slot>
        <div class="canvas-bg">
          <img class="canvas-title" src="@/images/canvas-title.png" alt />
          <div class="canvas-info">
            <div class="info-content">
              <span>我叫</span>
              <span>古月</span>
            </div>
            <div class="info-content">
              <span>来自</span>
              <span>山西老年大学</span>
            </div>
            <div class="info-content">在网上老年大学</div>
            <div class="info-content">
              <span>学习</span>
              <span>999</span>
              <span>天啦</span>
            </div>
          </div>
          <div class="canvas-er">
            <img src="@/images/ercode.png" alt />
            <div class="text">长按识别二维码</div>
            <div class="text">和好友一起学习</div>
          </div>
          <div class="canvas-footer">
            <div class="canvas-user">
              <!-- img src="" alt /-->
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  name: "share",
  data(){ 
    return {
      dataURL: '',
      ercode: ''
    };
  },
  created(){
    let params = this.$route.params;
    console.log(params)
  },
  methods: {
    toImage() {
      let params = {
        backgroundColor: null, //解决生成会有白边的可能
        allowTaint: true  //是否允许跨域图片(官方文档,代试验)
      }
      html2canvas(this.$refs.imageWrapper,params).then((canvas) => {
        console.log(canvas)
        let dataURL = canvas.toDataURL("image/png");
        this.dataURL = dataURL;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .canvas-bg{
    min-height: 100vh;
    padding-top: 3.40625rem /* 54.5/16 */;
    padding-left: 1.875rem;
    background: url('../images/canvas-bg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .canvas-title{
      width: 13.35rem;
      height: 8.35rem;
      // margin-left: 1.875rem /* 30/16 */;
      margin-bottom: 2.15625rem;
    }
    .canvas-info{
      // margin-left: 1.875rem /* 30/16 */;
      font-size:1.1875rem;
      font-family:Source Han Sans CN;
      font-weight:400;
      color:rgba(255,255,255,1);
      margin-bottom: 2.8125rem;
      .info-content{
        margin-bottom: .8125rem;
        & span:nth-child(2){
          font-size:1.1875rem;
          font-family:Source Han Sans CN;
          font-weight:bold;
          color:rgba(254,207,84,1);
        }
      }
    }
    .canvas-er{
      padding-bottom: 5.90625rem /* 94.5/16 */;
      img{
        width: 32%;
        height: 32%;
        margin-bottom: 1.0625rem /* 17/16 */;
      }
      .text{
        font-size: 15px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
    .canvas-footer{
      width: 58.1%;
      height: 42.4%;
      position: absolute;
      bottom: 0;
      right: 0;
      background: url('../images/canvas-people.png') no-repeat;
      background-size: 100% 100%;
      .canvas-user{
        position: absolute;
        top: -2.67% /* 5/16 */;
        right: 8% /* 26/16 */;
        background: black;
        width: 4.5875rem /* 94.2/16 */;
        height: 4.5875rem;
        border: 2px solid rgba(255,255,255,1);
        border-radius: 100%;
      }
    }
  }
</style>

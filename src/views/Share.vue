<template>
  <div class="share">
    <div class="imageWrapper" ref="imageWrapper">
      <img class="real_pic" :src="dataURL" />
      <!-- 需要转化为图片的DOM元素 -->
      <slot>
        <div class="canvas-bg">
          <img class="canvas-title" src="@/images/canvas-title.png" alt />
          <div class="canvas-info">
            <div class="info-content">
              <span>我叫</span>
              <span>{{ userInfo.name }}</span>
            </div>
            <div class="info-content">
              <span>来自</span>
              <span>{{ userInfo.userSchool }}</span>
            </div>
            <div class="info-content">在网上老年大学</div>
            <div class="info-content">
              <span>学习</span>
              <span>{{ userInfo.study_day }}</span>
              <span>天啦</span>
            </div>
          </div>
          <div class="canvas-footer">
            <div class="canvas-user">
              <img :src="userInfo.user_image" alt />
            </div>
          </div>
          <div class="canvas-er">
            <img :src="userInfo.share_qrcode" alt />
            <div class="text">长按识别二维码</div>
            <div class="text">和好友一起学习</div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  name: "share",
  data() {
    return {
      userInfo: {},
      dataURL: "",
      ercode: ""
    };
  },
  mounted() {
    // localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$toast("长按海报发送给好友")
    console.log(this.userInfo);
    setTimeout(()=>{
      this.toImage();
    },1000)
  },
  methods: {
    toImage() {
      // let config = {
      //   backgroundColor: null, //解决生成会有白边的可能
      //   allowTaint: true,  //是否允许跨域图片(官方文档,代试验)
      //   useCORS: true
      // }
      if (this.userInfo.share_qrcode) {
        this.getUrlBase64(this.userInfo.share_qrcode, res => {
          this.userInfo.share_qrcode = res;
          // setTimeout(()=>{
            html2canvas(this.$refs.imageWrapper, {
              backgroundColor: null, //解决生成会有白边的可能
              allowTaint: true, //是否允许跨域图片(官方文档,代试验)
              useCORS: true,
              taintTest: true
            }).then(canvas => {
              console.log("生成", canvas);
              // this.$refs.imageWrapper.appendChild(canvas)
              let dataURL = canvas.toDataURL("image/png");
              this.dataURL = dataURL;
            });
          // },100)
        });
      }
    },
    getUrlBase64(url, callback) {
      //网络资源图片转成base64
      var canvas = document.createElement("canvas"); //创建canvas DOM元素
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      img.onload = function() {
        canvas.height = 108; //指定画板的高度,自定义
        canvas.width = 108; //指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0, 108, 108); //参数可自定义
        var dataURL = canvas.toDataURL("image/");
        callback.call(this, dataURL); //回掉函数获取Base64编码
        canvas = null;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.share {
  .imageWrapper {
    min-height: 100vh;
    background: url("../images/canvas-bg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .real_pic {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 88;
      opacity: 0;
    }
  }
}
.canvas-bg {
  min-height: 100%;
  padding-top: 3.40625rem /* 54.5/16 */;
  padding-left: 1.875rem;
  // background: url("../images/canvas-bg.png") no-repeat;
  // background-size: 100% 100%;
  // position: relative;
  .canvas-title {
    width: 13.35rem;
    height: 8.35rem;
    // margin-left: 1.875rem /* 30/16 */;
    margin-bottom: 2.15625rem;
  }
  .canvas-info {
    // margin-left: 1.875rem /* 30/16 */;
    font-size: 1.1875rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 45.5px;
    .info-content {
      margin-bottom: 0.8125rem;
      & span:nth-child(2) {
        font-size: 1.1875rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(254, 207, 84, 1);
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }
  .canvas-er {
    max-width: 6.75rem /* 108/16 */;
    padding-bottom: 5.90625rem /* 94.5/16 */;
    z-index: 99;
    img {
      width: 100%;
      height: 100%;
      margin-bottom: 1.0625rem /* 17/16 */;
      background: white;
      border-radius: 5px;
      overflow: hidden;
    }
    .text {
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-align: center;
    }
  }
  .canvas-footer {
    // width: 58.1%;
    // height: 42.4%;
    width: 13.625rem /* 218/16 */;
    height: 21.8438rem /* 349.5/16 */;
    position: absolute;
    bottom: 0;
    right: 0;
    background: url("../images/canvas-people.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    .canvas-user {
      position: absolute;
      top: -4.5px /* 5/16 */;
      right: 1.625rem /* 26/16 */;
      width: 5.8875rem /* 94.2/16 */;
      height: 5.8875rem /* 94.2/16 */;
      border: 2px solid rgba(255, 255, 255, 1);
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

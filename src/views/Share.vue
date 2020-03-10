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
              <span class="study-day">{{ userInfo.study_day }}</span>
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
            <div class="text">长按保存图片</div>
            <div class="text">扫码一起学习</div>
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
    this.$toast("长按海报发送给好友");
    this.toImage();
  },
  methods: {
    toImage() {
      let that = this;
      Promise.all([that.getUrlBase64_pro(108,this.userInfo.share_qrcode),
        that.getUrlBase64_pro(94.2,this.userInfo.user_image)])
          .then(res=>{
            console.log("海报",res);
            this.userInfo.share_qrcode = res[0];
            this.userInfo.user_image = res[1];
            setTimeout(() => {
              html2canvas(this.$refs.imageWrapper, {
                backgroundColor: null, //解决生成会有白边的可能
                allowTaint: true, //是否允许跨域图片(官方文档,代试验)
                useCORS: true,
                taintTest: true
              })
                .then(canvas => {
                  // this.$refs.imageWrapper.appendChild(canvas)
                  let dataURL = canvas.toDataURL("image/png");
                  this.dataURL = dataURL;
                  this.ready(dataURL);
                })
            }, 1000);
        })
        .catch(err=>{
          console.log('生成catch', err);
        })
    },
    getUrlBase64_pro(len,url) {
      //网络资源图片转成base64
      var canvas = document.createElement("canvas"); //创建canvas DOM元素
      var ctx = canvas.getContext("2d");
      return new Promise(reslove => {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function() {
          canvas.height = len; //指定画板的高度,自定义
          canvas.width = len; //指定画板的宽度，自定义
          ctx.drawImage(img, 0, 0, len, len); //参数可自定义
          var dataURL = canvas.toDataURL("image/");
          canvas = null;
          reslove(dataURL);
        };
        img.src = url;
      });
    },
    ready(dataURL) {
      let that = this;
      that.$wx.ready(() => {
        that.$wx.updateAppMessageShareData({
          title: "网上老年大学", // 分享标题
          desc: "快来加入老年大学,一起学习吧", // 分享描述
          link: "https://studyreport.jinlingkeji.cn/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: dataURL, // 分享图标
          success: function() {
            // 设置成功
            console.log("success");
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.share {
  font-family: Source Han Sans CN;
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
  .canvas-title {
    // width: 13.35rem;
    // height: 8.35rem;
    width: 16.6875rem /* 267/16 */;
    height: 10.3125rem /* 165/16 */;
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
      margin-bottom: 0.5125rem; /* 30/16 */
      & span:nth-child(2) {
        font-size: 1.1875rem /* 19/16 */;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(254, 207, 84, 1);
        margin-left: 5px;
        margin-right: 5px;
      }
      .study-day{
        font-size: 1.5rem !important;
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
      margin-bottom: 0.625rem /* 17/16 */;
      background: white;
      border-radius: 0.625rem /* 10/16 */;
      overflow: hidden;
    }
    .text {
      font-size: 0.9375rem /* 15/16 */;
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
    height: 22.8438rem;
    position: absolute;
    bottom: 0;
    right: 0;
    background: url("../images/canvas-people.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    .canvas-user {
      position: absolute;
      top: -0.3125rem /* 5/16 */;
      right: 1.425rem;
      width: 5.8875rem /* 94.2/16 */;
      height: 5.8875rem /* 94.2/16 */;
      border: 2px solid rgba(255, 255, 255, 1);
      border-radius: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

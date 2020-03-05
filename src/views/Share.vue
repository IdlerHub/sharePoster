<template>
  <div>
    <div class="imageWrapper" ref="imageWrapper">
      <img class="real_pic" :src="dataURL" />
      <!-- 需要转化为图片的DOM元素 -->
      <slot></slot>
    </div>
    <div>
    <!-- 两个按钮?? -->
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  name: "share",
  data(){ 
    return {
      dataURL: ''
    };
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
    },
    shareUser(){
      console.log("分享给好友");
    },
    sharePoster(){
      console.log("分享海报");
    }
  }
};
</script>

<template>
  <div class="home">
    <img class="poster-bg" src="@/assets/poster-bg.png" alt />
    <div class="content">
      <div class="title">
        <img class="title-bg" src="@/images/title.png" alt />
      </div>
      <div class="number">
        <div class="number-first">
          您是第<span>{{ number }}</span
          >位
        </div>
        <div>加入网上老年大学的学员</div>
        <img class="number-img" src="@/images/star.png" alt />
      </div>
      <div class="container">
        <div class="user-info">
          <div class="info">姓名</div>
          <input type="text" placeholder="请输入本人姓名" v-model="userName" />
        </div>
        <div class="user-info">
          <div class="info">学校</div>
          <div class="info-school" @click="showSchool">
            <span>{{ userSchool }}</span>
            <img class="info-right" src="@/images/right.png" alt />
          </div>
          <van-popup
            v-model="showFlag"
            position="bottom"
            custom-style="height: 20%;"
          >
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="confirmSc"
              @cancel="cancelSc"
              @change="changeSc"
            />
          </van-popup>
        </div>
        <div class="user-info">
          <div class="info">照片</div>
          <div class="upload" @click="chooseImg" v-show="!user_image">
            <img class="upload-add" src="@/images/add-img.png" alt />
            <div>点击上传</div>
            <div>本人照片</div>
          </div>
          <div class="preview" @click="preview" v-if="user_image">
            <img :src="user_image" alt="" />
            <img class="del" src="@/images/del-img.png" alt @click="delImg" />
          </div>
          <div v-show="preFlag" class="watch-img" @click="unpreview" @touchmove.prevent.stop>
            <img :src="user_image" alt="" />
          </div>
        </div>
        <div class="submit-img" @click="next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/homeApi.js";
export default {
  name: "home",
  data() {
    return {
      number: "999",
      preFlag: false, //图片预览
      showFlag: false,
      user_image: "", //用户头像地址
      userName: "",
      user_createtime: 0,
      study_day: 0, //创建天数
      share_qrcode: "",
      userSchool: "请选择",
      province_id: 0, //当前省份id
      city_id: 0, //当前城市id
      university_id: 0, //当前学校id
      columns: [
        {
          values: Array, // 设置的页面初始值
          id: Array,
          className: "province_list",
          defaultIndex: 0
        },
        {
          values: Array,
          id: Array,
          className: "city_list",
          defaultIndex: 0
        },
        {
          values: Array,
          id: Array,
          className: "school_list",
          defaultIndex: 0
        }
      ]
    };
  },
  methods: {
    init() {
      console.log(window.location.href.split("#")[0]);
      window.location.href.split("#")[0];
      let url = encodeURIComponent(window.location.href.split("#")[0]);
      console.log(url);
      this.getJsConfig(url);
    },
    getJsConfig(url) {
      let params = { url };
      http.getJsConfig(params).then(res => {
        console.log(res);
        this.$wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "wxbd85dc45a5a84cd8", // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: [
            "updateAppMessageShareData",
            "chooseImage",
            "getLocalImgData",
            "previewImage",
            "uploadImage"
          ] // 必填，需要使用的JS接口列表
        });
      });
    },
    confirmSc(val) {
      console.log("点击确定,confirmFn", val[2]);
      this.userSchool = val[2];
      this.showFlag = false;
    },
    cancelSc() {
      console.log("点击取消");
      this.showFlag = false;
      //如果取消要重置,需要将id设置为初始位置
    },
    changeSc(picker) {
      let provinceIndex = picker.getColumnIndex(0);
      let cityIndex = picker.getColumnIndex(1);
      let schoolIndex = picker.getColumnIndex(2);
      if (this.province_id !== this.columns[0].id[provinceIndex]) {
        //省份变更
        this.province_id = this.columns[0].id[provinceIndex];
        this.getCity(this.province_id);
      } else if (this.city_id !== this.columns[1].id[cityIndex]) {
        console.log("市区变化");
        this.city_id = this.columns[1].id[cityIndex];
        this.getAllUniversity(this.city_id);
      } else {
        this.university_id = this.columns[2].id[schoolIndex];
        console.log("校区变更", this.university_id);
      }
    },
    showSchool() {
      this.showFlag = true;
    },
    getAllProvince() {
      //获取省份
      http.getAllProvince().then(res => {
        let name = [];
        let id = [];
        res.map(item => {
          name.push(item["name"]);
          id.push(item["id"]);
        });
        this.columns[0].values = name;
        this.columns[0].id = id;
        this.province_id = this.columns[0].id[0];
        this.getCity(this.province_id);
      });
    },
    getCity(province_id) {
      //获取市区
      let params = { province_id };
      http.getCity(params).then(res => {
        console.log("获取校区");
        let name = [];
        let id = [];
        res.map(item => {
          name.push(item["name"]);
          id.push(item["id"]);
        });
        this.columns[1].values = name;
        this.columns[1].id = id;
        this.city_id = this.columns[1].id[0];
        this.getAllUniversity(this.city_id);
      });
    },
    getAllUniversity(city_id) {
      //获取学校
      let params = { city_id };
      http.getAllUniversity(params).then(res => {
        let name = [];
        let id = [];
        res.map(item => {
          name.push(item["name"]);
          id.push(item["id"]);
        });
        this.columns[2].values = name;
        this.columns[2].id = id;
        this.university_id = this.columns[2].id[0];
      });
    },
    putUserInfo(params) {
      http.putUserInfo(params).then(res => {
        console.log(res);
      });
    },
    getUserInfo() {
      let uid = this.number;
      let params = { uid };
      console.log(uid)
      http.getUserInfo(params).then(res => {
        this.userName = res.name;
        this.userSchool = res.university_name;
        this.share_qrcode = res.share_qrcode;
        this.province_id = res.province_id;
        this.city_id = res.city_id;
        this.university_id = res.university;
        this.user_createtime = res.user_createtime;
        this.study_day = res.study_day;
        this.user_image = res.user_image;
      });
    },
    next() {
      console.log("下一步");
      this.userName = this.userName.trim();
      if (!this.userName) {
        this.$toast("请输入姓名");
      } else if (this.userSchool == "请选择") {
        this.$toast("请选择学校");
      } else if (this.user_image == "") {
        this.$toast("请上传图片");
      } else {
        console.log(this.province_id, this.city_id, this.university_id);
        let params = {
          uid: this.$store.state.uid,
          // uid: '1087',
          user_image: this.user_image,
          name: this.userName,
          share_qrcode: this.share_qrcode,
          userSchool: this.userSchool,
          number: this.number,
          study_day: this.study_day,
          province_id: this.province_id,
          city_id: this.city_id,
          university: this.university_id,
          user_createtime: this.user_createtime,

        };
        this.putUserInfo(params);
        localStorage.setItem("userInfo", JSON.stringify(params));
        this.$router.replace({ path: "/share" });
      }
    },
    previewImg(event) {
      let reader = new FileReader();
      let img = event.target.files[0]; //图片属性
      console.log("选择图片", event);
      reader.readAsDataURL(img);
      reader.onload = () => {
        console.log("file 转 base64结果：" + reader.result);
        this.user_image = reader.result;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
      // this.$wx.previewImage({
      //   current: '',
      //   urls:
      // })
    },
    delImg() {
      //删除图片
      this.user_image = "";
    },
    preview() {
      if (this.user_image) {
        //有图片,显示预览
        this.preFlag = true;
      }
    },
    unpreview() {
      this.preFlag = false; //取消预览
    },
    chooseImg() {
      let that = this;
      console.log("上传图片");
      that.$wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          let localIds = res.localIds;
          console.log("localId", localIds);
          // that.$wx.getLocalImgData({
          //   localId: localIds[0], // 图片的localID
          //   success: function(res) {
          //     var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
          //     if(localData.substr(0,4) == 'data'){
          //       that.user_image = localData;
          //     }else{
          //       that.user_image = 'data:image/png;base64,' + localData;
          //     }
          //     console.log("本地base64",res)
          //   }
          // });
          setTimeout(() => {
            that.$wx.uploadImage({
              localId: localIds[0],
              isShowProgressTips: 1,
              success: function(res) {
                console.log("上传图片回调", res);
                // let mediaId = res.serverId;
                let params = { serverId: res.serverId };
                console.log("上传图片传参", params);
                http.uploadImage(params).then(res => {
                  console.log("上传回调", res);
                  that.user_image = res.image;
                });
              },
              fail: function(err) {
                console.log("上传失败回调", err);
              }
            });
          }, 100);
        },
        fail(err) {
          console.log("错误", err);
        }
      });
    }
  },
  created() {
    this.init();
  },
  mounted() {
    console.log(this.number);
    let uid = this.$store.state.uid;
    this.number = uid;
    this.getUserInfo(this.number);
    this.getAllProvince();
  }
};
</script>
<style scoped lang="scss">
.home {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  .poster-bg {
    width: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  .content {
    width: 96.4%;
    height: 100%;
    margin-top: 0.9375rem;
    margin-bottom: 0.9375rem;
    // position: fixed;
    // top: 2.47%;
    // bottom: 2.32%;
    // left: 0;
    // right: 3.6%;
    display: flex;
    align-items: center;
    flex-flow: column;
    background: url("../images/books.png") no-repeat;
    background-size: 100% 100%;
    .title {
      width: 70.62%;
      height: 5.35%;
      margin-top: 3.0938rem /* 49.5/16 */;
      .title-bg {
        width: 100%;
        height: 100%;
      }
    }
    .number {
      text-align: center;
      font-size: 1.1875rem /* 19/16 */;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(212, 34, 32, 1);
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-top: 2.62%;
      .number-first span {
        font-weight: bold;
        color: rgba(229, 119, 0, 1);
        margin: 0 0.3125rem;
      }
      .number-img {
        margin-top: 1.2%;
        width: 43.98%;
      }
    }
    .container {
      margin-top: 1.125rem /* 18/16 */;
      width: 100%;
      .user-info {
        margin-bottom: 1.25rem /* 20/16 */;
        margin-left: 2.9688rem /* 47.5/16 */;
        .info {
          margin-bottom: .625rem /* 10/16 */;
          font-size: 1.1875rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: rgba(212, 34, 32, 1);
        }
        .info-school {
          width: 76.82%;
          height: 2.5rem;
          line-height: 2.5rem;
          border: 1px solid #d42220;
          border-radius: 0.3125rem;
          color: #d42220;
          font-size: 1.125rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(212, 34, 32, 1);
          padding-left: 4.12%;
          position: relative;
          display: flex;
          align-items: center;
          span {
            max-width: 76%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .info-right {
            width: 0.5625rem;
            height: 0.9375rem;
            margin-right: 0.625rem;
            position: absolute;
            right: 0;
          }
        }
        input {
          width: 76.82%;
          height: 2.5rem;
          background: none;
          border: 1px solid #d42220;
          border-radius: 0.3125rem;
          color: #d42220;
          font-size: 1.125rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(212, 34, 32, 1);
          padding-left: 4.12%;
          &::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            color: #d42220;
            font-size: 1.125rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(212, 34, 32, 1);
          }
          &::-moz-placeholder {
            /* Firefox 19+ */
            color: #d42220;
            font-size: 1.125rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(212, 34, 32, 1);
          }
        }
        .upload {
          width: 95px;
          height: 95px; //5.0625rem
          border: 1px solid #d00000;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          // padding-top: .875rem 0;
          flex-flow: column;
          align-items: center;
          // padding-bottom: .875rem;
          position: relative;
          .upload-btn {
            //文件选择框
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top: 0;
            right: 0;
          }
          .upload-add {
            width: 25.26%;
            margin-bottom: 8px;
          }
          div {
            font-size: 1rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(212, 34, 32, 1);
          }
        }
        .preview {
          width: 5.9375rem /* 95/16 */;
          height: 5.9375rem /* 95/16 */;
          border: 1px solid #d00000;
          border-radius: 5px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .del {
            width: 24px;
            height: 24px;
            position: absolute;
            top: -9.5px;
            right: -10px;
            z-index: 2;
          }
        }
        .watch-img {
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 1);
          img {
            width: 100%;
          }
        }
      }
      .submit-img {
        // width: 16rem /* 256/16 */;
        width: 70.82%;
        height: 3.125rem /* 50/16 */;
        margin-left: 2.9375rem /* 47/16 */;
        // margin-top: 1.25rem /* 20/16 */;
        // margin-bottom: 4.75rem; /* 76/16 */
        background: url("../images/submit.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

@media screen and (max-height: 667px) {
  .home .content .title{
    margin-top: 2.5rem /* 40/16 */;
  }
  .home .content .container{
    margin-top: .625rem /* 10/16 */;
  }
  .home .content .container .user-info{
    margin-bottom: .5rem;
  }
}
@media screen and (max-height: 568px){
  .home .content .title{
    margin-top: 3.0938rem /* 49.5/16 */;
  }
  .home .content .container{
    margin-top: 1.25rem /* 20/16 */;;
  }
  .home .content .container .user-info{
    margin-bottom: 1rem;
  }
}
@media screen and (min-height: 812px){
  .home .content .title{
    margin-top: 3.2188rem /* 51.5/16 */;
  }
}
// @media screen and (max-height: 667px) {
//   .home .content {
//     position: relative;
//     top: 0;
//     right: 0;
//   }
//   .home .content .container .user-info input {
//     width: 76.82%;
//   }
// }
// @media screen and (min-width: 375px) {
//   .home .content {
//     position: relative;
//     top: 0;
//     right: 0;
//   }
// }
</style>

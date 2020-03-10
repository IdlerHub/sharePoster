import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Share from "../views/Share.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/share",
    name: "share",
    component: Share,
    meta: {
      title: "海报分享"
    }
  },
  {
    path: "/client",
    name: "client",
    component: () => import("../views/Client.vue"),
    meta: {
      title: "终端错误"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * 判断是否是微信环境
 */
function getIsWxClient() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  }
  return false;
}

router.beforeEach((to, from, next) => {
  if (!getIsWxClient()) {
    next({ path: "/client" });
  }
  next();
});

export default router;

/*
 * @Date: 2020-01-13 09:21:16
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-18 16:50:02
 */
module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "@red": "#F01818"
        }
      }
    }
  }
};

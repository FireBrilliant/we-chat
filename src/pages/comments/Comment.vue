<template>
  <div class="me-page">
    comment页面
  </div>
</template>

<script>
  export default {
    name: "Comment",
    created () {
      console.log("comment");
    },
    methods: {
      doLogin() {
        // 登录
        let that = this;
        wx.login({
          success: res => {
            app.globalData.code = res.code
            // 取出本地存储用户信息，解决需要每次进入小程序弹框获取用户信息
            app.globalData.userInfo = wx.getStorageSync("userInfo")
            // wx.getuserinfo接口不再支持
            wx.getSetting({
              success: (res) => {
                // 判断用户已经授权。不需要弹框
                if (!res.authSetting["scope.userInfo"]) {
                  that.setData({ showModel: true });
                } else {
                  // 没有授权需要弹框
                  that.setData({ showModel: false });
                  wx.showLoading({ title: "加载中..." })
                  that.getOP(app.globalData.userInfo)
                }
              },
              fail() {
                wx.showToast({ title: "系统提示:网络错误", icon: "warn", duration: 1500 });
              }
            });
          },
          fail() {
            wx.showToast({ title: "系统提示:网络错误", icon: "warn", duration: 1500 });
          }
        });
      },
      // 获取用户信息新接口
      agreeGetUser (e) {
      // 设置用户信息本地存储
        try {
          wx.setStorageSync("userInfo", e.detail.userInfo)
        } catch (e) {
          wx.showToast({ title: "系统提示:网络错误", icon: "warn", duration: 1500 });
        }
        wx.showLoading({ title: "加载中..." })
        let that = this;
        that.setData({ showModel: false })
        that.getOP(e.detail.userInfo)
      },
      getOP (res) {
        // 提交用户信息 获取用户id
        let that = this;
        let userInfo = res;
        app.globalData.userInfo = userInfo;
        wx.request({
          url: "https://xcx.xiancaijun.cn/tigerlogin/tgLogin",
          method: "post",
          data: { "code": app.globalData.code, "userInfo": userInfo },
          success: function(res) {
            if (res.data.respcode === "0") {
              app.globalData.userId = res.data.uid;
              app.globalData.keys = res.data.keys;
              app.globalData.access = res.data.access;
              that.getBook();
              that.shareInfo();
              if (that.data.cid) {
                wx.navigateTo({ url: "/pages/course/course?cid=" + that.data.cid });
              }
            } else if (res.data.respcode === "15") {
              wx.hideLoading();
              wx.showToast({ title: "没有授权，不能进入小程序", icon: "none", duration: 2000 });
            }
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>

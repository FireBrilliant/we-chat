<template>
    <div class="me-page">
      <div class="userifnfo" @click='login'>
        <img :src="userinfo.avatarUrl" alt="">
        <p>{{userinfo.nickName}}</p>
      </div>
      <year-progress></year-progress>
      <button v-if="userinfo.openId" @click="scanBook" class="btn">添加图书</button>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
        获取用户信息
      </button>
    </div>
</template>

<script>
  import qcloud from 'wafer2-client-sdk'
  import config from '../../config'
  import {showSuccess, showModel} from '../../util.js'
  import YearProgress from '@/components/YearProgress'
  export default {
    name: 'Me',
    components: {
      YearProgress
    },
    data () {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: '点击登录'
        }
      }
    },
    created () {
      this.doLogin();
    },
    methods: {
      doLogin () {
        console.log('触发')
        qcloud.setLoginUrl(config.loginUrl)
        const session = qcloud.Session.get()
        console.log(session)
        if (session) {
          // 第二次登录
          // 或者本地已经有登录态
          // 可使用本函数更新登录态
          qcloud.loginWithCode({
            success: res => {
              this.setData({ userInfo: res, logged: true })
              console.log(res)
            },
            fail: err => {
              console.error('222', err)
            }
          })
        } else {
          // 首次登录
          qcloud.login({
            success: res => {
              this.setData({ userInfo: res, logged: true })
            },
            fail: err => {
              console.log(err)
            }
          })
        }
      },
      getUserInfo (e) {
        console.log('111', e.mp.detail.userInfo)
        wx.getSetting({
          success: (res) => {
            console.log(res)
            // 判断用户已经授权。不需要弹框
            if (!res.authSetting["scope.userInfo"]) {
              // that.setData({ showModel: true });
            } else {
              // 没有授权需要弹框
              // that.setData({ showModel: false });
              wx.showLoading({ title: "加载中..." }
              // that.getOP(app.globalData.userInfo)
            }
          },
          fail() {
            wx.showToast({ title: "系统提示:网络错误", icon: "warn", duration: 1500 });
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .me-page {
    padding: 0 30rpx;
  }
  .userinfo{
    margin-top: 100rpx;
    text-align: center;
    img{
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }

</style>

<template>
    <div class="me-page">
      <div class="userinfo" @click='login'>
        <img :src="userinfo.avatarUrl" alt="">
        <p v-if="loginStatus">{{userinfo.nickName}}</p>
        <button v-else open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">登录</button>
      </div>
      <year-progress></year-progress>
      <button v-if="sessionData.openid" @click="scanBook" class="btn">添加图书</button>

    </div>
</template>

<script>
  import qcloud from 'wafer2-client-sdk'
  import config from '../../config'
  import {showSuccess, showModel, getSessionKey} from '../../util.js'
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
        },
        sessionData:{},
        loginStatus:false
      }
    },
    created () {
      this.getLoginStatus();
    },
    methods: {
      getLoginStatus(){
        let user = wx.getStorageSync('userinfo')
        if(!user){
          this.loginStatus = false;
        }else{
          this.userinfo = wx.getStorageSync('userinfo');
          this.sessionData = wx.getStorageSync('sessionData');
          this.loginStatus = true;
        }
      },
      getUserInfo (e) {
        if (e.mp.detail.userInfo) {
          wx.setStorageSync('userinfo', e.mp.detail.userInfo);
          this.userinfo = e.mp.detail.userInfo;
          this.loginStatus = true;
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.login({
            success: res => {
              showSuccess('登录成功')
              getSessionKey(res.code)
                .then((res)=>{
                  wx.setStorageSync('sessionData', res);
                })
                .catch((err)=>{
                  showModel('请求失败',err)
                })
            },
            fail: err =>{
              showSuccess(err)
            }
          })
        } else {
          console.log(333,'执行到这里，说明拒绝了授权')
          wx.showToast({
            title: "为了您更好的体验,请先同意授权",
            icon: 'none',
            duration: 2000
          });
        }
      },
      scanBook(){

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
    button{
      width:150rpx;
      height:60rpx;
      background:#EA5149;
      color:#fff;
      line-height:60rpx;
    }
  }

</style>

// 工具函数库
import config from './config'

// 获取登录验证信息
export function getSessionKey (code){
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxbd613e1776bdb186&secret=40889ba66d272fc94936eedd10fd2e60&js_code=${code}&grant_type=authorization_code`;
  return new Promise((resolve, reject)=>{
    wx.request({
      url:url,
      success: function(res){
        if(res.data){
          resolve(res.data);
        }else{
          reject(res.data);
        }
      }
    })
  })
}
// get请求
export function get (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
// post请求
export function post (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
// 信息弹窗 成功
export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
}
// 信息弹窗 失败
export function showModel (title, content) {
  wx.showModal({
    title: title,
    content: content,
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
// 测试一下

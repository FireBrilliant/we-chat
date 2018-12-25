<script>
  import { get } from './util'
  import qcloud from 'wafer2-client-sdk'
  import config from './config'
  export default {
    async created () {
      // 调用API从本地缓存中获取数据
      // const logs = wx.getStorageSync('logs') || []
      // logs.unshift(Date.now())
      // wx.setStorageSync('logs', logs)
      const res = await get('/weapp/demo')
      console.log(123, res)
    }
  }
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200 rpx 0;
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>

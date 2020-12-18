// //app.js
// var api = require('api/api.js')
// var AppId = "wx4c8aeb8e19fdfb1e"
// var AppSecret = "dc22fc8827d3aae4b84c04b99371502d"

// // XREBZ-46LL6-ZRZSM-ET5CN-OICXO-DUF6F
// App({
//   onLaunch: function () {
//     var that = this
//     //调用登录接口，获取 code
//     wx.login({
//       success: function (res) {
//         //发起网络请求
//         wx.request({
//           url: api.mobileIn,
//           data: {
//             appid: AppId,
//             secret: AppSecret,
//             code: res.code,
//             grant_type: 'authorization_code'
//           },
//           header: {
//             method: 'GET_OPENID'
//           },
//           method: 'GET',
//           success: function (res) {
//             // 将openId设成全局
//             that.globalData.openId = res.data.openid
//             console.log('res.data.openid', res.data.openid)
//             that.globalData.flag = res.data.flag
//           },
//           fail: function (res) { },
//           complete: function (res) {
//           }
//         });
//       }
//     })
//   },
//   globalData: {
//     userInfo: null,
//     openId: null,
//     user: null,
//     flag: null,
//     hostUserId:null,
//     isOfficial: true,
//     isCreate: true,
//     isShowAd:null
//   }
// })
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    Flag:'false',
  }
})
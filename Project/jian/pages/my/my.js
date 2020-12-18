// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    userList:[],
    inputImage:'',
    inputUid:'',
    uname:'',

  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../message/message'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // var that = this;
    // wx.getStorage({
    //   key: 'username',
    //   success: function(res) {
    //     that.setData({
    //       uname:res.data
    //     })
    //     console.log(that.data.uname)
    //   }
    // })  


   
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(this.data.uname)
    // if(this.data.uname){
    //   console.log(1)
    // }else{
    //   wx.showModal({
    //     title: '未登录',
    //     content: '请前往登录',
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //         wx.navigateTo({
    //           url: '/pages/login/login',
    //         })
    //       }else{
    //         wx.switchTab({
    //           url: '/pages/index/index',
    //         })
    //       }
     
    //     }
    //   })
    // }
    
    var that = this;
    let thedata = decodeURIComponent(wx.getStorageSync('thedata'));
    let lastdata = wx.getStorageSync('lastdata')
    console.log(lastdata);
    this.setData({
      connect:thedata,
      fardata:lastdata
    }),
    
    wx.request({
      url: 'http://www.lllh.club:2292/users/intro',
      method: 'GET',
      success: res => {
        that.setData({
          userList: res.data,
        })
        wx.getStorage({
          key: 'username',  
          success:function(res){
            that.setData({
              inputValue:res.data
            })
            for(var i=0;i<that.data.userList.length;i++){
              if(that.data.userList[i].uname == that.data.inputValue){
                that.setData({
                  inputImage :that.data.userList[i].uimage
                })
              }
            }
          }
      })
        console.log(that.data.userList)
      }
      
    })
   
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
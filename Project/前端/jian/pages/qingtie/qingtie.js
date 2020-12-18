// pages/qingtie/qingtie.js
var api = require('../../api/api.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    // help_status: false,
    // userid_focus: false,
    // passwd_focus: false,
    
    angle: 0,
    logo: 'http://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/ruAMsa53pVQWN7FLK88i5lw.tdM2SkGoETevDiRno25BYOYR4zIgcPR56jn5IwMAQ*Gdb7pdfIUjLtdndU8MV97moEeWAJaL22VInZjdFvQ!/b&bo=6APoA.gD6AMBCS4!&rf=viewer_4',
    appName: "礼同掌判 合二姓以嘉姻",
    appName1:"诗咏宜家 敦百年之静好",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // console.log('onLoad')
    var that = this
    that.setData({
      //图片地址
      wave: api.splashWave,
      loading: api.splashLoading
    })
  },
  onReady: function() {
    var _this = this;
    setTimeout(function() {
      _this.setData({
        remind: ''
      });
    }, 1000);
    // 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 wx.stopAccelerometer 停止监听。 
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },


   
  btnEnter: function() {
    // this.copyFile();
    wx.navigateTo({
      url: '/pages/first/first',
    });
  },
  
  //进入主页面

  
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
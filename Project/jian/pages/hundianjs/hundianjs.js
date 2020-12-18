// pages/hundianjs/hundianjs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sp:[],
    spid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  diTu:function(e){
    var data = e.currentTarget.dataset;
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude:Number(data.weidu),//要去的纬度-地址
          longitude:Number(data.jingdu),//要去的经度-地址
          name:data.shopname,
          address:data.shopaddress
        })
      }
    })
  },

  readDetail:function(e){
    var $data = e.currentTarget.dataset;//打印可以看到，此处已经获取到了包含id ... 的对象
    wx.navigateTo({
      url: '/pages/hundetail/hundetail?id='+$data.id+"&styleid="+$data.styleid+"&shopid="+$data.shopid //传参跳转即可
    })
  },
  
  onLoad: function (options) {
    var that = this;
    this.setData({
      spid:options.shopid,
    });
    wx.request({
      url:'http://49.234.222.174:2292/photos/intro',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res=>{
        console.log(res);
        that.setData({
          // sp:res.data
          sp:res.data.filter(item => item.shopid == options.shopid),
          
        })
        // console.log(JSON.stringify(res.data));
      }
    })
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
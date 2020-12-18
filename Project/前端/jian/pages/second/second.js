// pages/second/second.js
var QQMapWX = require('../../api/qqmap-wx-jssdk.min.js')
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      location: "",
      latitude: "",
      longitude: "",
      // 图标定位
      markers: [],
      dress:[],
      userList:[],
      userid:'',
      uname:'',

      mtel:'',
      wtel:'',
      addr:'',

  },

  freeTell: function(e){
   
    this.setData({
      mtel:this.data.dress[0].groomtel
    })
    // console.log(this.data.mtel)
    wx.makePhoneCall({
      phoneNumber:this.data.mtel,
    })
  },
 
  freeTell1: function(){

    this.setData({
      wtel:this.data.dress[0].bridetel
    })
    wx.makePhoneCall({
      phoneNumber: this.data.wtel,
    })

  },

  next: function(){
    wx.navigateTo({
      url: '/pages/third/third',
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    qqmapsdk=new QQMapWX({
      key:'XREBZ-46LL6-ZRZSM-ET5CN-OICXO-DUF6F'
    })
    var that = this

    wx.getStorage({
      key: 'username',
      success: function(res) {
        that.setData({
          uname:res.data
        })
        console.log(res.data)
        wx.request({
          url: 'http://www.lllh.club:2292/users/intro',
    
          method: 'GET',
          success: res => {
            // console.log(res);
            that.setData({
              userList: res.data.filter(item => item.uname == that.data.uname),
              userid:res.data.filter(item => item.uname == that.data.uname)[0].uid
            })
            console.log(that.data.userList)


            wx.request({
              url:'http://49.234.222.174:2292/card/intro/'+that.data.userid, 
             
              method: 'GET',
              success: function (res) {
                console.log(res.data);  
                that.setData({
                  dress:res.data
                })
  
                that.setData({
                  addr:res.data[0].address
                })

                qqmapsdk.geocoder({
                  // address: that.data.addr,
                  address: that.data.addr,
                  success: function (res) {
                    // var local = res.result.location;
                    console.log(res.result.location)
                    that.setData({
                      // 地址+经纬度
                      location:that.data.addr,
                      latitude: res.result.location.lat,
                      longitude: res.result.location.lng,
                      // 定位标志的经纬度
                      markers: [{
                        latitude: res.result.location.lat,
                        longitude:res.result.location.lng,
                        width:"50rpx",
                        height:"65rpx",
                      }]
                    })
                  
                  }
                    
                })
                
              }
            })
          }
        })
      } 
    }) 

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
  },

  getLoc:function(e){
    
    var that = this;
    console.log(that.data.latitude)
    console.log(that.data.longitude)
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //使用微信内置地图查看位置接口
        wx.openLocation({
          latitude: parseFloat(that.data.latitude),  // 要去的地址经度，浮点数
          longitude: parseFloat(that.data.longitude),  // 要去的地址纬度，浮点数
          name: '终点位置',  // 位置名
          address: that.data.location,  // 要去的地址详情说明
          scale: 18,   // 地图缩放级别,整形值,范围从1~28。默认为最大
        });
      },
  
    })

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
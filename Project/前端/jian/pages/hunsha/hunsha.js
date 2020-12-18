// pages/hunsha/hunsha.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   zhuye:[],
   zyList1:[],
   zyList2:[],
   zyList3:[],
   zyList4:[]
  },

  hunDian : function(e){
    var $data = e.currentTarget.dataset;//打印可以看到，此处已经获取到了包含id ... 的对象
    // this.setData({
    //   buttonValue:e.detail.value
    // })
    wx.navigateTo({
      url: '/pages/photos/photos?location='+$data.stylename,
    })
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url:'http://49.234.222.174:2292/styles/intro',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res=>{
        console.log(res);
        that.setData({
          list:res.data.filter(item => item.typeid == 1),
        })
      }
    })

    wx.request({
      url:'http://49.234.222.174:2292/photos/intro',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      
      success:res=>{
        console.log(res);
        that.setData({
          zhuye:res.data,
          zyList1:res.data.filter(item => item.styleid =='1'),
          zyList2:res.data.filter(item => item.styleid =='2'),
          zyList3:res.data.filter(item => item.styleid =='3'),
          zyList4:res.data.filter(item => item.styleid =='4')
        })
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
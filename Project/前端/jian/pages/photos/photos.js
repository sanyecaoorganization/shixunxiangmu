// pages/photos/photos.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    location:'',
    cityList:[],
    nowCityId:'',
    List:[],
    Listp:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.Flag = true;
   
    var that = this;
    //点击地点显示
    that.setData({
      location:that.options.location,
    });


    wx.getStorage({
      key: 'nowCity',
      success: function (res) {
        that.setData({
          city: res.data
        })

        console.log(that.data.city)
        
        wx.request({
          url:'http://49.234.222.174:2292/shops/intro',
          method:'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success:res=>{
            console.log(res.data)
            that.setData({
              cityList:res.data,
            })
            for(var i =0;i<that.data.cityList.length;i++){
              console.log(that.data.cityList[i].cityname)
              if(that.data.cityList[i].cityname == that.data.city){
                that.setData({
                  nowCityId:that.data.cityList[i].cityid
                })
                console.log(that.data.nowCityId)
                return;
              }       
            }
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
              List:res.data.filter(item => item.cityid == that.data.nowCityId),
              Listp:res.data.filter(item => item.cityid == that.data.nowCityId).filter(item => item.stylename == that.data.location),
            })
            // console.log(that.data.List)
          }
         
        })
      }
    })
    // wx.request({
    //   url:'http://49.234.222.174:2292/photos/intro',
    //   method:'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success:res=>{
    //     console.log(res);
    //     that.setData({
    //       List:res.data,
    //       Listp:res.data.filter(item => item.stylename == this.data.location),
    //     })
    //   }
     
    // })

  },

  readDetail:function(e){
    var $data = e.currentTarget.dataset;//打印可以看到，此处已经获取到了包含id ... 的对象
    wx.navigateTo({
      url: '/pages/hundetail/hundetail?id='+$data.id+"&styleid="+$data.styleid+"&shopid="+$data.shopid+"&current="+$data.current //传参跳转即可
    })
  },

  // now(e){
  //   var cur = e.currentTarget.dataset.current; 
  //   this.setData({
  //     swiperCurrent:cur,
  //   });
  //   console.log(cur);

  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // that.onLoad()
    if (app.globalData.Flag) {
      app.globalData.Flag = false;
      that.onLoad(); //调用接口获取数据
    }
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
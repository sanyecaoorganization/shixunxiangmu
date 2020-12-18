const app = getApp()

Page({

  /**
   * 页面的初始数据
   */

  data: {
    navData1: [{
      "typename": "全部",
      "typeid": 0
    }, {
      "typename": "婚纱摄影",
      "typeid": 1
    }, {
      "typename": "婚礼策划",
      "typeid": 2
    }, {
      "typename": "婚纱礼服",
      "typeid": 3
    }],
    city: '',
    curr:[],
    navData: [],
    spall: [],
    spallp: [],
    spallpp:[],
    name: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab: 0,
    navScrollLeft: 0,
    nowname:'',
    uname:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    app.globalData.Flag = true
    var that=this;
    wx.removeStorage({
      key: 'nowName',
    })

    wx.getStorage({
      key: 'username',
      success: function(res) {
        that.setData({
          uname:res.data
        })
        console.log(that.data.uname)
      }
    })  

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })

  },

  choose: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/location/location',
    })
    // wx.reLaunch({
    //   url: '/pages/index/index',
    // })

  },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
  
    wx.setStorage({
      data: event.currentTarget.dataset.typename,
      key: 'nowName',
    })
    console.log(event.currentTarget.dataset.typename)
    var sname = event.currentTarget.dataset.typename;
    var spallpy = this.data.spall;
  
    
    if (event.currentTarget.dataset.typename !== '全部') {
      this.setData({
        spallp: spallpy.filter(item => item.typename == event.currentTarget.dataset.typename)
      })
    } else if (event.currentTarget.dataset.typename == '全部') {
      this.setData({
        spallp: spallpy
      })
    }
    // console.log(event.currentTarget.dataset.typename)
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中 
    this.setData({
      name: sname
    })
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

  readDetail: function (e) {
    var $data = e.currentTarget.dataset; //打印可以看到，此处已经获取到了包含id ... 的对象
    if($data.typeid == 1){
      wx.navigateTo({
        url: '/pages/hundianjs/hundianjs?shopid='+$data.shopid+"&shopname="+$data.shopname+"&shopaddress="+$data.shopaddress+"&weidu="+$data.weidu+"&jingdu="+$data.jingdu //传参跳转即可
      })
    }else if($data.typeid == 2){
      wx.navigateTo({
        url: '/pages/cehuajs/cehuajs?shopid='+$data.shopid+"&shopname="+$data.shopname+"&shopaddress="+$data.shopaddress+"&weidu="+$data.weidu+"&jingdu="+$data.jingdu //传参跳转即可
      })
    }else if($data.typeid == 3){
      wx.navigateTo({
        url: '/pages/lifujs/lifujs?shopid='+$data.shopid+"&shopname="+$data.shopname+"&shopaddress="+$data.shopaddress+"&weidu="+$data.weidu+"&jingdu="+$data.jingdu //传参跳转即可
      })
    }
  },
  dianzi:function(e){
    if(this.data.uname){
      wx.navigateTo({
        url: '/pages/content/content',
      })
    }else{
      wx.showModal({
        title: '未登录',
        content: '请前往登录',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }
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
    // var that = this;
    // // that.onLoad()
    // if (app.globalData.Flag) {
    //   app.globalData.Flag = false;
    //   that.onLoad(); //调用接口获取数据
    //   // that.switchNav();
    // }
    var that = this;

    wx.getStorage({
      key: 'nowCity',
      success: function (res) {
        that.setData({
          city: res.data
        })
        console.log(that.data.city)

        wx.request({
          url: 'http://49.234.222.174:2292/shops/intro',
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },

          success: res => {
            that.setData({
              spall: res.data.filter(item => item.cityname == that.data.city),
              spallp: res.data.filter(item => item.cityname == that.data.city),
            })
            // console.log(that.data.spallp)
            wx.getStorage({
              key: 'nowName',
              success: function(res) {
                  that.setData({
                    nowname:res.data
                  })
                  console.log(that.data.nowname)
                  if(that.data.nowname){
                    if(that.data.nowname=="全部"){
                      that.setData({
                        spallp: that.data.spall,
                      })
                    }else{
                      that.setData({
                        spallp: that.data.spall.filter(item => item.typename == that.data.nowname),
                      })
                    }                 
                  }
                  console.log(that.data.spallp)
              } 
            });

          }
        })
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
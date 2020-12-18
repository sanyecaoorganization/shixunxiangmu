// pages/clothes/clothes.js
const app = getApp()
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
    type:[{"dname":"全部","did":1},],
    navData1:[{"styleid":22,"dname":"全部","typeid":1},],
    navData:[],
    spall:[],
    spallp:[],
    name:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab:0,
    navScrollLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.Flag = true
    var that = this;
    //点击地点显示
    this.setData({
      location:that.options.location,
    });
    // console.log(location);
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
          url:'http://49.234.222.174:2292/dress/intro',
          method:'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success:res=>{
            console.log(res);
            that.setData({
              List:res.data.filter(item => item.cityid == that.data.nowCityId),
              Listp:res.data.filter(item => item.cityid == that.data.nowCityId).filter(item => item.stylename == that.data.location),
              navData:res.data.filter(item => item.cityid == that.data.nowCityId).filter(item => item.stylename == that.data.location),
              navData1:that.data.navData1.concat(res.data.filter(item => item.cityid == that.data.nowCityId).filter(item => item.stylename == that.data.location))
            })
            // console.log(that.data.List)
          }
         
        })

        wx.request({
          url:'http://49.234.222.174:2292/dress/intro',
          method:'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          
          success:res=>{
            // console.log(res);
            that.setData({
              spall:res.data.filter(item => item.cityid == that.data.nowCityId).filter(item => item.stylename == that.data.location),
              spallp:res.data.filter(item => item.cityid == that.data.nowCityId).filter(item => item.stylename == that.data.location),
            })
        
          }
        })
      }
    })



    wx.request({
      url:'http://49.234.222.174:2292/dress/style',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      
      success:res=>{
        that.setData({   
          type:this.data.type.concat(res.data) 
        })
    
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

  switchNav(event){
    var cur = event.currentTarget.dataset.current; 
    var sname = event.currentTarget.dataset.dname; 
    // console.log(event.currentTarget.dataset.dname)
    var spallpy = this.data.spall;
    if(event.currentTarget.dataset.dname!=='全部'){
      this.setData({
        spallp:spallpy.filter(item => item.dname == event.currentTarget.dataset.dname)
      })

    }else if(event.currentTarget.dataset.dname=='全部'){
      this.setData({
        spallp:spallpy
      })
    }
    // console.log(this.data.spallp)
    // console.log(event.currentTarget.dataset.dname)
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中 
    this.setData({
      name:sname
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
  switchTab(event){
      var cur = event.detail.current;
      var singleNavWidth = this.data.windowWidth / 5;
      this.setData({
          currentTab: cur,
          navScrollLeft: (cur - 2) * singleNavWidth
      });
  },



  

  readDetail:function(e){
    var $data = e.currentTarget.dataset;//打印可以看到，此处已经获取到了包含id ... 的对象
    wx.navigateTo({
      url: '/pages/lidetail/lidetail?id='+$data.id+"&styleid="+$data.styleid+"&shopid="+$data.shopid+"&current="+$data.current //传参跳转即可
    })

    // console.log($data.id)
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
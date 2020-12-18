// pages/gengduo/gengduo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    city: '',

    cityList:[],
    nowCityId:'',

    navData1:[{"styleid":1,"stylename":"全部","typeid":1},],
    navData:[],
    spall:[],
    spallp:[],
    name:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab:0,
    navScrollLeft: 0,

    nowlocationname:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //请求另一个接口，获取对应的styleid场地名字
    //shopid 是用来区分店铺和店铺，styleid用来区分类型

    wx.removeStorage({
      key: 'nowLocationName',
    })

    wx.request({
      url:'http://49.234.222.174:2292/styles/intro',
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res=>{
        console.log(res);
        that.setData({
          navData:res.data.filter(item => item.typeid == '1'),
          navData1:this.data.navData1.concat(res.data.filter(item => item.typeid == '1'))
        })  

        console.log(that.data.navData1)
      }
    });
    

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

    wx.setStorage({
      data: event.currentTarget.dataset.stylename,
      key: 'nowLocationName',
    })

    var sname = event.currentTarget.dataset.stylename; 
    var spallpy = this.data.spall;
    if(event.currentTarget.dataset.stylename!=='全部'){
      this.setData({
        spallp:spallpy.filter(item => item.stylename == event.currentTarget.dataset.stylename)
      })
    }else if(event.currentTarget.dataset.stylename=='全部'){
      this.setData({
        spallp:spallpy
      })
    }
    console.log(event.currentTarget.dataset.stylename)
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
      url: '/pages/hundetail/hundetail?id='+$data.id+"&styleid="+$data.styleid+"&shopid="+$data.shopid //传参跳转即可
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
    // var that = this;
    // // that.onLoad()
    // if (app.globalData.Flag) {
    //   app.globalData.Flag = false;
    //   that.onLoad(); //调用接口获取数据
    // }
    var that = this;
    //请求另一个接口，获取对应的styleid场地名字
    //shopid 是用来区分店铺和店铺，styleid用来区分类型
   
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
              spall:res.data.filter(item => item.cityid == that.data.nowCityId),
              spallp:res.data.filter(item => item.cityid == that.data.nowCityId),
            })

            wx.getStorage({
              key: 'nowLocationName',
              success: function(res) {
                  that.setData({
                    nowlocationname:res.data
                  })
                  console.log(that.data.nowlocationname)
                  if(that.data.nowlocationname){
                    if(that.data.nowlocationname=="全部"){
                      that.setData({
                        spallp: that.data.spall,
                      })
                    }else{
                      that.setData({
                        spallp: that.data.spall.filter(item => item.stylename == that.data.nowlocationname),
                      })
                    }                 
                  }
                  console.log(that.data.spallp)
              } 
            });

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
        //       spall:res.data.filter(item => item.cityid == that.data.nowCityId),
        //       spallp:res.data.filter(item => item.cityid == that.data.nowCityId),
        //     })

        //     wx.getStorage({
        //       key: 'nowLocationName',
        //       success: function(res) {
        //           that.setData({
        //             nowlocationname:res.data
        //           })
        //           console.log(that.data.nowlocationname)
        //           if(that.data.nowlocationname){
        //             if(that.data.nowlocationname=="全部"){
        //               that.setData({
        //                 spallp: that.data.spall,
        //               })
        //             }else{
        //               that.setData({
        //                 spallp: that.data.spall.filter(item => item.stylename == that.data.nowlocationname),
        //               })
        //             }                 
        //           }
        //           // console.log(that.data.spallp)
        //       } 
        //     });

        //   }
        // })

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
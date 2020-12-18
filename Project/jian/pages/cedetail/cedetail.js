// pages/cedetail/cedetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperCurrent: 0,
    background:[],
    now:[],
    images:[],
    current:'',
    imageWidth:'',
    imgheight:'',
    imgwidth1:'',
    imgheight1:'',
    shid:'',
    stid:'',
    nownum:'',

    userList:[],
    uname:'',
    isClick: false,
    collect:{image:'',id:3,typeid:1,uid:1,uname:'',name:'',click:'true'},
  
  
  },


  //轮播图的切换事件
  swiperChange: function(e){
    this.setData({
      swiperCurrent:e.detail.current
    })
    // console.log(this.data.swiperCurrent)
  },
  dianEvent: function(e){
    this.setData({
      swiperCurrent:e.currentTarget.id
    })
  },
  hunDian:function(e){
     var $data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/cehuajs/cehuajs?shopid='+$data.shopid+"&shopname="+$data.shopname+"&shopaddress="+$data.shopaddress+"&weidu="+$data.weidu+"&jingdu="+$data.jingdu
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  ////前一个页面传递的url中的title，在此处运用，就可以得到店铺的名字了。
  ////依旧运用此方法，向下传递店铺名。
  // onLoad: function (options) {
  //   var title = options.title;
  // },

  onLoad: function (options) {

    this.setData({
      shid: options.shopid,
      stid:options.styleid
    })
    // var current = options.current;
    // this.setData({
    //   current: options.current
    // })
    // console.log(options.id);
    
    var that = this;
    that.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    })
    console.log(this.data.imageWidth)
    wx.request({
      url:'http://49.234.222.174:2292/plans/intro',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      
      success:res=>{
        // console.log(res);
        that.setData({
          background:res.data.filter(item => item.shopid == options.shopid && item.styleid == options.styleid),
          now:res.data.filter(item => item.shopid == options.shopid && item.styleid == options.styleid),   
          // 如果那个点击上一级的位置等于谁谁，我们传递  拿上一级传递过来的idx去和那个这一级now中的一个pimage1去对比
          //如果相等，就重新赋值，让current等于那个now中对应的id
        });
      
        
        for(var i=0;i<res.data.filter(item => item.shopid == options.shopid && item.styleid == options.styleid).length;i++){
          if(options.id==res.data.filter(item => item.shopid == options.shopid && item.styleid == options.styleid)[i].pid){
            this.setData({
              current:i,
              swiperCurrent:i,
            })
            console.log(this.data.swiperCurrent)
          }
          // console.log(options.id)
          // console.log(res.data.filter(item => item.shopid == options.shopid && item.styleid == options.styleid)[i])
        };   

      }
    });

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
            })
            console.log(that.data.userList)
    
          }
        })
      } 
    }) 
  
  },

  sc:function(e){

    var that = this
    console.log(e.currentTarget.dataset)
    // $data = e.currentTarget.dataset;
    if(that.data.uname){
      wx.request({
        url:'http://49.234.222.174:2292/plans/intro',
        method:'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        
        success:res=>{
          that.setData({
            nownum:res.data.filter(item => item.shopid == that.data.shid && item.styleid == that.data.stid)[e.currentTarget.dataset.nowid].pid
          })
          console.log(that.data.nownum)  
          // console.log(res.data.filter(item => item.pid == that.data.nownum)[0].pimage1)
          var img = "collect.image"
          that.setData({
            [img]:res.data.filter(item => item.pid == that.data.nownum)[0].pimage1
          });
          var idd = "collect.id"
          that.setData({
            [idd]:that.data.nownum
          });
          var typeidd = "collect.typeid"
          that.setData({
            [typeidd]:res.data.filter(item => item.pid == that.data.nownum)[0].typeid
          });
          var mn = "collect.name"
          that.setData({
            [mn]:res.data.filter(item => item.pid == that.data.nownum)[0].name
          });
          var userid = "collect.uid"
          that.setData({
            [userid]:that.data.userList[0].uid
          });
          var username = "collect.uname"
          that.setData({
            [username]:that.data.userList[0].uname
          });

          // console.log(that.data.collect)

          if (!this.data.isClick == true) {
    
            wx.showToast({
            title: '已收藏',
            });
            console.log(that.data.collect)
            wx.request({
              url:'http://49.234.222.174:2292/collects/createcollect', 
              header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
              data: that.data.collect,
              method: 'post',
              success: function (res) {
                console.log("成功");
                console.log(res);
              }
            })
          } else {
            wx.showToast({
            title: '已取消收藏',
            });
        
          }
          this.setData({
            isClick: !this.data.isClick
          })
        }
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
// pages/talk/talk.js
const app = getApp()

Page({


  data: {
    inputShowed: false,
    inputVal: "",
    yourage:'none',
    list:["领证","拍照","彩礼","嫁妆","婚嫁习俗","大婚当天","三金","礼服","清单","情感"],
    ishidden:0,
    isPopping: false,//是否已经弹出
        animPlus: {},//旋转动画
        onShareAppMessage: {},//item位移,透明度
        animInput: {},//item位移,透明度
},
//  //点击弹出
//  plus: function () {
//   if (this.data.isPopping) {
//       //缩回动画
//       this.popp();
//       this.setData({
//           isPopping: false
//       })
//   } else if (!this.data.isPopping) {
//       //弹出动画
//       this.takeback();
//       this.setData({
//           isPopping: true
//       })
//   }
// },
// input: function () {
//   console.log("input")
// },
// // transpond: function () {
// //   console.log("transpond")
// // },

// //弹出动画
// popp: function () {
//   //plus顺时针旋转
//   var animationPlus = wx.createAnimation({
//       duration: 400,
//       timingFunction: 'ease-out'
//   })
//   var onShareAppMessage = wx.createAnimation({
//       duration: 400,
//       timingFunction: 'ease-out'
//   })
//   var animationInput = wx.createAnimation({
//       duration: 400,
//       timingFunction: 'ease-out'
//   })
//   animationPlus.rotateZ(180).step();
//   onShareAppMessage.translate(-60, -50).rotateZ(360).opacity(1).step();
//   animationInput.translate(-70, 45).rotateZ(360).opacity(1).step();
//   this.setData({
//       animPlus: animationPlus.export(),
//       onShareAppMessage: onShareAppMessage.export(),
//       animInput: animationInput.export(),
//   })
// },
// //收回动画
// takeback: function () {
//   //plus逆时针旋转
//   var animationPlus = wx.createAnimation({
//       duration: 500,
//       timingFunction: 'ease-out'
//   })
//   var onShareAppMessage = wx.createAnimation({
//       duration: 500,
//       timingFunction: 'ease-out'
//   })
//   var animationInput = wx.createAnimation({
//       duration: 500,
//       timingFunction: 'ease-out'
//   })
//   animationPlus.rotateZ(0).step();
//   onShareAppMessage.translate(0, 0).rotateZ(0).opacity(0).step();
//   animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
//   this.setData({
//       animPlus: animationPlus.export(),
//       onShareAppMessage: onShareAppMessage.export(),
//       animInput: animationInput.export(),
//   })
// },

onShareAppMessage: function () {
  // 用户点击右上角分享
  let url = encodeURIComponent('pages/talk/talk?news_id=' + this.data.news_id);
  return {
    title: "热点详情",
    path:`/pages/index/index?url=${url}` 
  }
},





//showto
showTo:function(e){
  console.log(e);
  let myindex = e.currentTarget.dataset.myindex;
  let myvalue = e.currentTarget.dataset.value;
  let length = e.currentTarget.dataset.value.length;
  console.log(myindex,myvalue);
  wx.request({
    url: "http://49.234.222.174:2292/ques/problem",
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    success:res=>{
      console.log(res);
      console.log(this.data)
      // this.setData({
      //   listone:res.data.filter(item=> item.postcontent.indexOf(myvalue)>=0)
      // })
      if(res.statusCode==200){
        for (var i = 0; i < length;i++){
          // console.log(myvalue[i])
          let a =res.data.filter(item=>this.data.list[item.poststyleid].indexOf(myvalue[i])>=0);
          res.data.postcontent_ = a;
        }
        var arr = res.data;
      for(let i=0;i<arr.length;i++){
        var temp=arr[i].posttime;
        var times = new Date(temp).toJSON();
        var date=new Date(times)
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
         d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h< 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let time = y + '-' + m + '-' + d+' '+h+':'+minute;
        arr[i].posttime=time
      }
        this.setData({
          listone:res.data.postcontent_,   
        })
      }
    }
  });
},

//detailTo
detailTo:function(e){
  console.log(e);
  let mytitle = e.currentTarget.dataset.title;
  let myinput = e.currentTarget.dataset.postid;
  console.log(mytitle,myinput); 
  wx.navigateTo({
    url: '../../page/answer/answer?mytitle='+mytitle +"&myinput="+myinput,
  })
},

onShow: function () {
  wx.request({
    url: "http://49.234.222.174:2292/ques/problem",
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    success:res=>{
      let length = res.data.length;
      console.log(res.data);  
      var arr = res.data;
      for(let i=0;i<arr.length;i++){
        var temp=arr[i].posttime;
        var times = new Date(temp).toJSON();
        var date=new Date(times)
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
         d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h< 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let time = y + '-' + m + '-' + d+' '+h+':'+minute;
        arr[i].posttime=time
      }
      console.log(arr)   
      this.setData({
        listone:res.data,   

      })

    }
  });
},



// 清除搜索框值
clearInput: function () {
  this.setData({
    inputVal: ""
  });
},
// 键盘抬起事件
inputTyping: function (e) {
  console.log(e.detail.value)
  console.log(e.detail.value.length)
  var that = this;
  if (e.detail.value == '') {
    return;
  }
 let myvalue = e.detail.value;
 let length = e.detail.value.length;
  wx.request({
    url: "http://49.234.222.174:2292/ques/problem",
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    success:res=>{
      console.log(res);
      console.log(this.data)     
      if(res.statusCode==200){
        for (var i = 0; i < length;i++){
          // console.log(myvalue[i])
          let a =res.data.filter(item=> item.postcontent.indexOf(myvalue[i])>=0);
          res.data.postcontent_ = a;
        }
        console.log(res.data)
        var arr = res.data;
      for(let i=0;i<arr.length;i++){
        var temp=arr[i].posttime;
        var times = new Date(temp).toJSON();
        var date=new Date(times)
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
         d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h< 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let time = y + '-' + m + '-' + d+' '+h+':'+minute;
        arr[i].posttime=time
      }
        this.setData({
          viewShowed: false,
          inputVal: e.detail.value,
          listone:res.data.postcontent_,
          // search:  this.search.bind(this)
        })
      }
    }
  });
},


//提问
jumptest:function(){
  wx.navigateTo({
   url:"/page/que/que"
  })
},

//全部
jumpall:function(){
  this.onShow()
},


// 下拉刷新
onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    wx.request({
      url: "http://49.234.222.174:2292/ques/problem",
      method: 'GET',
      header: {
        'Content-type': 'application/json'
      },
      success:res=>{
        var arr = res.data;
        for(let i=0;i<arr.length;i++){
          var temp=arr[i].posttime;
          var times = new Date(temp).toJSON();
          var date=new Date(times)
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
           d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          h = h< 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          minute = minute < 10 ? ('0' + minute) : minute;
          let time = y + '-' + m + '-' + d+' '+h+':'+minute;
          arr[i].posttime=time
        }
        console.log(res);
        this.setData({
          listone:res.data,
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
 

  /**
   * 页面的初始数据
   */
 

  /**
   * 生命周期函数--监听页面加载
   *  onLoad: function (options) {

  },
   */
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */


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
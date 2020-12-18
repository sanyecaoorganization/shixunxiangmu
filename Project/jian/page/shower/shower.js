// pages/shower/shower.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      ishidden: 0,
      curIndex: 0,
      scrollLefts: 0,
      duration:300,
      list:["已提问","已回答"],
      showView: true,
      showIndex:-1
  },

  showButton:function(e){
    console.log(e)
    let index = e.currentTarget.dataset.index;
    var that = this;
    that.setData({
      showIndex :index,
      showView: (!that.data.showView)
    })
  },

  delPost:function(e){
    console.log(e)
    var that =this
    var n = e.currentTarget.dataset.postid;
    wx.request({
      url:'http://49.234.222.174:2292/ques/deleteproblem/'+ n, 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'delete',
      success: function (res) {
        that.onShow()
        wx.navigateTo({
          url: '../../pages/shower/shower',
        })
            console.log("成功");
            console.log(res);
            
       }
    })
    // this.onShow()
    
  },
  delReply:function(e){
    var that =this
    var m = e.currentTarget.dataset.replyid;
    wx.request({
      url:'http://49.234.222.174:2292/ques/deletereply/'+m, 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'delete',
      success: function (res) {
        that.onShow()
        // wx.navigateTo({
        //   url: '../../pages/shower/shower',
        // })
            console.log("成功");
            console.log(res);
            
       }
       
    })
    
  },
  tabNav(e) {
    let index = e.target.dataset.index;
    this.setData({
     curIndex: index,
     scrollLefts: (index - 2) * 65
    })
   },
   // 内容滑动
   changeScroll(e) {
    let index = e.detail.current;
    this.setData({
     curIndex: index,
     scrollLefts: (index - 2) * 65
    })
  },

  detailTo:function(e){
    console.log(e);
    let mytitle = e.currentTarget.dataset.title;
    let myinput = e.currentTarget.dataset.postid;
    console.log(mytitle,myinput);
    wx.navigateTo({
      url: '../../page/answer/answer?mytitle='+mytitle +"&myinput="+myinput,
    })
  },

proshowTo:function(e){ 
  let index = e.target.dataset.index;
  this.setData({
   curIndex: index,
   scrollLefts: (index - 2) * 65
  })
  console.log(e);
  console.log(this.data)
  this.onShow();

  },

  aftershowTo:function(e){
    let index = e.target.dataset.index;
    this.setData({
     curIndex: index,
     scrollLefts: (index - 2) * 65
    })
    console.log(e)
    console.log(this.data)
    this.onShow()

   
  },

  onShow: function () {
    var that = this;
    wx.getSystemInfo({
        success: function (res) {
          that.setData({
            clientHeight: res.windowHeight
          });
        }
      });
    wx.getStorage({
      key: 'username',  
      success:function(res){
        console.log(res);
        that.setData({
          inputValue:res.data
        })
      }
  })
  wx.request({
    url: "http://49.234.222.174:2292/ques/reply",
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    success:res=>{   
      console.log(res.data)    
      this.setData({
        prolist:res.data.filter(item=> item.uname==this.data.inputValue),
        num1:res.data.filter(item=> item.uname==this.data.inputValue).length
      })
    }
  });
  wx.request({
    url: "http://49.234.222.174:2292/ques/problem",
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    success:res=>{   
      console.log(this.data) 
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
      var a=[];
      var brr = this.data.prolist;       
      if(brr){
      for(var i=0;i<brr.length;i++){
        let b = res.data.filter(item=> item.postid==this.data.prolist[i].postid)[0];
        a.push(b)               
      }
      for(var i=0;i<brr.length;i++){
        // console.log(a[i])
        let m = brr[i].postcontent;
        let n = brr[i].upimage;
        m= a[i].postcontent;
        n = a[i].uimage;
        brr[i].postcontent=m; 
        brr[i].upimage = n;
      }
    }
      console.log(brr)
      this.setData({
        prolist2:res.data.filter(item=> item.uname==this.data.inputValue),      
        num2:res.data.filter(item=> item.uname==this.data.inputValue).length,
        prolist:brr
      })
      
    }
  });
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

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
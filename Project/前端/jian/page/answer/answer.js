// page/answer/answer.js
const app = getApp()
Page({

  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    animate: 'myfirst',
    yesorno: 'none',
    flag: true,
    test:'test1',
    dialogShow: false,
    realPath:'',
  isHidePlaceholder: false,
},
// textarea 输入时触发
getTextareaInput: function (e) {
  var that = this;
  if (e.detail.cursor > 0) {
    that.setData({
      isHidePlaceholder: true
    })
  } else {
    that.setData({
      isHidePlaceholder: false
    })
  }
},
  fabiao: function () {
    this.setData({
      yesorno: 'block'
    })
    this.setData({
      test: 'test1'
    })
    this.setData({
      flag: false,
      dialogShow: false,
    })
  },
  laqi: function () {
    // this.setData({
    //   test: 'test2',
    //   flag: true,
    // })
    this.setData({  
      dialogShow: true
    })

  },
  tapDialogButton(e) {
    console.log(e);
    var that = this;
    let con = e.detail.item.text ;
    if(con =='确认'){
      console.log(this.data)  
     console.log(new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8))
      wx.request({
        url:'http://49.234.222.174:2292/ques/createreply', 
        header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: {
          "postid":this.data.ansinput,
          "replycontent": this.data.inputCon,
          "replyimage":this.data.realPath,
         "uid":this.data.userList[0].uid,
         "replytime":new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8),          
         },
         method: 'post',
         success: function (res) {
              console.log("成功");
              // console.log(res);           
              that.onShow();
             
              that.setData({
                test: 'test2',
                flag: true,                
              })
              // wx.switchTab({
              //   url: '../../pages/talk/talk',
              // })
         }
         
    })
    }else{
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
    })
    }
   
},
  laq:function(){
    this.setData({
      yesorno: 'none',
      flag: true,
      test:'test1',
      dialogShow: false
    })
  },

  //输入
  contentInput:function(e){
    console.log(e);
    let fav = e.detail.value;
    this.setData({
      inputCon:fav
    })
  },



  insertImage : function(){
    wx.chooseImage({
      count: 1,
      sizeType:['original'],
        success : res=>{      
          this.setData({         
            imagePath:res.tempFilePaths[0]
          }) 
          wx.uploadFile({
            url: 'http://www.lllh.club:2292/upload',
            filePath:res.tempFilePaths[0],
            name: 'media', 
            method:'post',
            success: res => { // 上传成功后的代码
              if(res.data==''){
                this.setData({      
                  realPath:res.data 
                  
                })
              }else{
                this.setData({       
                  realPath:'http://49.234.222.174:2292/static/images/'+ res.data
                })
              }           
               console.log(res.data)
            },
            fail:res=>{
              console.log(res)
            } 
          })
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e);
    this.setData({
      // ansContent:this.option.content
      ansinput:e.myinput,
      ansContent:e.mytitle
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
  onShow: function (e) {
    console.log(e) 
    wx.request({
      url: "http://49.234.222.174:2292/ques/reply",
      method: 'GET',
      header: {
        'Content-type': 'application/json'
      },
      success:res=>{
        console.log(res);
        console.log(this.data);
        var arr = res.data;
      for(let i=0;i<arr.length;i++){
        var temp=arr[i].replytime;
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
        arr[i].replytime=time
      }
        this.setData({
          replyList:res.data.filter(item=> item.postid==this.data.ansinput)
        })
      }
    })
    var that = this;
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
      url: 'http://www.lllh.club:2292/users/intro',
      method: 'GET',
      success: res => {
        that.setData({
          userList: res.data.filter(item=>item.uname===this.data.inputValue),
          // uid:res.data.filter(item=>item.uname===this.data.inputValue)[0].uid
        })
        // console.log(that.data.userList[0].uname)
      }     
    })
   
  },
  
  onPullDownRefresh: function (e) {
    console.log(e)
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    // this.onShow()
    wx.request({
      url: "http://49.234.222.174:2292/ques/reply",
      method: 'GET',
      header: {
        'Content-type': 'application/json'
      },
      success:res=>{
        this.onShow()
        console.log(res);
        this.setData({
          replyList:res.data.filter(item=> item.postid==this.data.ansinput)
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
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
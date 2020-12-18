// pages/first/first.js
var api = require('../../api/api.js')
var app = getApp()

// var inputName = ''
var imgUrlsDefault = []

var musicUrl = 'http://win.web.nf01.sycdn.kuwo.cn/6bb45c19641b5f03a7bafceb4c7552ca/5fdc0e00/resource/n1/77/47/585635255.mp3'

// var musicUrl = 'http://music.163.com/song/media/outer/url?id=1447509197.mp3'

Page({
  data: {
    ani:{},

    
    imgUrls: imgUrlsDefault,
    indicatorDots: true,
    autoplay: true,
    interval: 2600,
    duration: 1200,
    isPlayingMusic: true,
    music_url: musicUrl,
    isOfficial: app.globalData.isOfficial,
    icAdd: api.image + "ic_add_round.png",
    title_hint:'添加图片标题',
    editImg: api.image + "ic_edit.png",

    dress:[],
    userList:[],
    uname:'',
    userid:'',
    
    colle:0,
  },
  chudong:function(e){
    this.setData({
      colle:1,
    })
    console.log(this.data.colle)
  },

  chudong1:function(e){
    this.setData({
      colle:2,
    })
    console.log(this.data.colle)
  },
  chudong2:function(e){
    this.setData({
      colle:0,
    })
    console.log(this.data.colle)
  },
  //生命周期函数--监听页面加载
  onLoad: function(data) {
    var that = this
    wx.playBackgroundAudio({
      dataUrl: musicUrl,
        title: '',
        coverImgUrl: ''
      })

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
                  
                }
              })
            }
          })
        } 
      }) 
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


    var animation = wx.createAnimation({
        duration: 5000,
      timingFunction: 'ease',
  
    })
    this.animation = animation
    var next = true;
    //连续动画关键步骤
    setInterval(function () {
      if (next) {
        this.animation.scale(0.93).step()   
        next = !next;
      } else {
        this.animation.scale(1).step()
        next = !next;
      }
      this.setData({
        ani: animation.export()
      })
    }.bind(this), 5000)

  },
  nowMap:function(e){
    wx.navigateTo({
      url: '/pages/second/second',
    })
  },


})






  














  


  /**#e2211c;
   * 选择图片
   */
//   chooseImage: function() {
//     var that = this;
//     wx.chooseImage({
//       // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
//       count: 1,
//       sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
//       sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
//       success: function(res) {
//         // 获取成功,将获取到的地址赋值给临时变量
//         var tempFilePaths = res.tempFilePaths;

//         console.log(res)
//         var itemId = (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5)
//         imgUrlsDefault[imgUrlsDefault.length] = {
//           imgUrl: `${tempFilePaths[0]}`,
//           title: inputName,
//           userId: app.globalData.hostUserId,
//           id: itemId
//         }
//         console.log('imgUrlsDefault',imgUrlsDefault)
//         /**
//          * 上传图片
//          */
//         wx.uploadFile({
//           url: api.mobileIn, //此处换上你的接口地址
//           filePath: tempFilePaths[0],
//           name: 'file',
//           header: {
//             "Content-Type": "multipart/form-data",
//             'accept': 'application/json',
//             'Authorization': 'Bearer ..', //若有token，此处换上你的token，没有的话省略
//             'method': 'SAVE_IMAGE_HOME'
//           },
//           formData: {
//             'id': itemId,
//             'title': inputName,
//             'userId': app.globalData.hostUserId,
//             'host': api.host
//           },
//           success: function(res) {
//             wx.hideLoading()
//             that.downLoadHomeImgs()
//             // that.setData({
//             //   //将临时变量赋值给已经在data中定义好的变量
//             //   imgUrls: imgUrlsDefault,
//             //   swiperCurrentIndex:0
//             // })
//           },
//           fail: function(res) {
//             console.log('fail');
//             wx.hideLoading()

//           },
//         })

//       },
//       fail: function(res) {
//         // fail
//       },
//       complete: function(res) {
//         // complete
//       }
//     })
//   },
//   /**
//    * 弹出框蒙层截断touchmove事件
//    */
//   preventTouchMove: function() {},
//   /**
//    * 隐藏模态对话框
//    */
//   hideModal: function() {
//     this.setData({
//       showModal: false
//     });
//   },
//   /**
//    * 对话框取消按钮点击事件
//    */
//   onCancel: function() {

//   },
//   /**
//    * 对话框确认按钮点击事件
//    */
//   onConfirm: function() {
//     var that = this
//     console.log('inputName', inputName)
//     if (inputName == '') {
//       that.setData({
//         title_hint:'标题必填'
//       })
//     } else {
//       that.hideModal();
//       that.chooseImage();
//     }
//   },
//   /**
//    * input输入框内容
//    */
//   inputChange: function(e) {
//     inputName = e.detail.value

//   },
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function() {

//   },
//   //保存用户信息
//   saveUser: function() {
//     wx.request({
//       url: api.mobileIn,
//       method: 'GET',
//       header: {
//         method: 'SAVE_USER',
//       },
//       data: {
//         openId: app.globalData.openId,
//         userInfo: app.globalData.userInfo

//       }
//     })
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function() {

//   },

//   play: function(event) {
//     if (this.data.isPlayingMusic) {
//       wx.pauseBackgroundAudio();
//       this.setData({
//         isPlayingMusic: false
//       })
//     } else {
//       console.log('this.data.music_url', this.data.music_url)
//       wx.playBackgroundAudio({
//         dataUrl: this.data.music_url,
//         title: '',
//         coverImgUrl: ''
//       })
//       this.setData({
//         isPlayingMusic: true
//       })
//     }
//   }

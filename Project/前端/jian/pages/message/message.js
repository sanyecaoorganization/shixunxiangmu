// pages/message/message.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    userList:[],
    img:'',
      inputImage:'',
      inputPhone:'',
      inputUid:0,
      inputPasswd:'',
      inputAddress:'',
      inputSex:'',
      inputAge:'',
      loadingHidden: true,
      itemLists:['男','女'],
      hiddenmodalput:true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
      getInput: null,
      hiddenmodalputads:true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
      getInputads: null,
      inputAds:null,
      inputAges:null,
      loadingHidden: true,
      

  },

  //修改头像
  setPhotoInfo:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:function(res){
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          inputImage:tempFilePaths
        })
        wx.uploadFile({ 
          url: 'http://www.lllh.club:2292/upload',
          filePath:res.tempFilePaths[0],
          name: 'media', 
          method:'post',
          // formData: {
          //   temp:'user',
          //   uid:that.data.inputUid
          // },
          success: res => { // 上传成功后的代码
             that.setData({
               img:res.data
             })
             console.log(that.data.img)
             console.log(res.data)
          },
          fail:res=>{
            console.log(res)
          }
  
        })
      }
    }) 
  },
  //修改性别
  actioncnt:function(){
    var that = this;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function(res) {
        console.log(res.tapIndex)
        that.setData({
          inputSex:that.data.itemLists[res.tapIndex],
        })
      },
    fail: function(res) {
     console.log(res.errMsg)
    }
    })
    },

  //修改年龄
  //点击按钮痰喘指定的hiddenmodalput弹出框
	modalinput:function(){
		this.setData({
		   hiddenmodalput: !this.data.hiddenmodalput
		})
	},
	//取消按钮
	cancel: function(){
        this.setData({
            hiddenmodalput: true,
            inputAges:''
        });
    },
    //确认
    confirm: function(e){
      var that = this;
        that.setData({
          hiddenmodalput: true,  
          inputAge:that.data.getInput,
          inputAges:''
	    })
    },
    getInput:function(e){
      this.data.getInput = e.detail.value;
      console.log(this.data.getInput);
    },

  //修改地址
    //点击按钮痰喘指定的hiddenmodalput弹出框
	modalinputads:function(){
		this.setData({
		   hiddenmodalputads: !this.data.hiddenmodalputads
		})
	},
	//取消按钮
	cancelads: function(){
        this.setData({
            hiddenmodalputads: true,
            'inputAds': ''
        });
    },
    //确认
    confirmads: function(e){
      var that = this;
        that.setData({
          hiddenmodalputads: true,  
          inputAddress:that.data.getInputads,
          'inputAds': ''
	    })
    },
    getInputads:function(e){
      this.data.getInputads = e.detail.value;
      console.log(this.data.getInputads);
    },
    modal:function(){
      var that = this;
      wx.showModal({  
        title: '提示',  
        content: '确定注销用户',  
        success: function(res) {  
            if (res.confirm) {  
              console.log('用户点击确定')  
              
              wx.request({
                url:'http://49.234.222.174:2292/users/deleteuser/'+that.data.inputUid, 
                header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                method: 'delete',
                success: function (res) {
                      console.log("注销成功");
                      console.log(res);
                      wx.navigateTo({
                        url: '../../pages/login/login',
                      })
                }
              })
            } else if (res.cancel) {  
            console.log('用户点击取消')  
            }  
        }  
      })  
    },


  //保存按钮
  baocun:function(e){
   
    console.log(e)
    this.setData({
      loadingHidden: false
     });
     var that=this;
     setTimeout(function(){
      that.setData({
        loadingHidden: true
      });
      // that.update();
     }, 8000);
  
    wx.setStorage({
      data: e.currentTarget.dataset.photo[0],
      inputImage:that.data.inputImage,
      key: 'key',
    }),
    wx.request({
      url:'http://49.234.222.174:2292/users/updateuser', 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      // data: this.data.user,
      data:{
        'uid':that.data.inputUid,
        'upasswd':that.data.inputPasswd,
        'uaddress':that.data.inputAddress,
        'uimage':'http://49.234.222.174:2292/static/images/'+ that.data.img,
        'sex':that.data.inputSex,
        'age':that.data.inputAge
      },
      method: 'put',
      success: function (res) {
            console.log("成功");
            console.log(res);
            // wx.switchTab({
            //   url: '/pages/my/my',
            // })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://www.lllh.club:2292/users/intro',
      method: 'GET',
      success: res => {
        that.setData({
          userList: res.data,
        })
        console.log(that.data.userList)
      }
    })
  
    wx.getStorage({
        key: 'username',  
        success:function(res){
          that.setData({
            inputValue:res.data
          })
          for(var i=0;i<that.data.userList.length;i++){
            if(that.data.userList[i].uname == that.data.inputValue){
              that.setData({
                inputImage :that.data.userList[i].uimage,
                inputPhone :that.data.userList[i].uphone,
                inputUid:that.data.userList[i].uid,
                inputPasswd:that.data.userList[i].upasswd,
                inputAddress:that.data.userList[i].uaddress,
                inputSex:that.data.userList[i].sex,
                inputAge:that.data.userList[i].age
              })
            }
          }
          console.log(that.data.inputUid)
        }
    })


  },

//   changeAvatar:function (){
//     var that=this;
//     wx.chooseImage({
//         count: 1, // 默认9
//         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//         success: function (res) {     
//             // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//             var avatarSrc = res.tempFilePaths
//             wx.uploadFile({
//                 url: 'http://49.234.222.174:2292/users/updateuser',
//                 filePath: res.tempFilePaths[0],
//                 name: 'avatar',
//                 formData: { avatar: avatarSrc}, // HTTP 请求中其他额外的 form data
//                 header: {
//                     // 'content-type': 'application/x-www-form-urlencoded', // 默认值
//                     'skey': wx.getStorageSync('getstoreskey')
//                 },
//                 success: function (info) {
//                     console.log(info,'info')
//                     if (JSON.parse(info.statusCode)=="200"){
//                         that.setData({
//                             'UserInfodata.image': JSON.parse(info.data).data.image,
//                             'Headimg': JSON.parse(info.data).data.image
//                         });
//                     }
//                 }
//             })
//         }
//     })
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
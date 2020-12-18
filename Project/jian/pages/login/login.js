// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */

  //声明变量 用来存储输入框的值
  data: {
    loginBtnTxt:'登录',//登录按钮上的文字
    loginBtnBgBgColor:'rgba(255,255,255,0.4)',//初始时背景颜色，点击后变为灰色
    btnLoading:false,//控制登录按钮点击后是否显示loading效果
    disabled:false,//登录中，按钮不能点击

    userList: [],
    inputValue: '',
    inputValue1: ''
  },

  bindTextInput: function (e) {
    //获取输入框的值，将其传递给inputValue
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindContentInput: function (e) {
    //获取输入框的值，将其传递给inputValue1
    this.setData({
      inputValue1: e.detail.value
    })
  },

  forgot:function(e){
    
    wx.navigateTo({
      url: '/pages/login1/login1'
    })
  },

  zhuce:function(e){
    
    wx.navigateTo({
      url: '/pages/login2/login2'
    })
  },

  sb:function(e){
    wx.navigateTo({
      url: '/pages/index1/index1'
    })
  },
  // //如果输入框不为空
    // if (this.data.inputValue && this.data.inputValue1) {
    //   //将数据存储在本地
    //   wx.setStorage({
    //     key: "addTitle",
    //     data: this.data.inputValue
    //   });
    //   wx.setStorage({
    //     key: "addContent",
    //     data: this.data.inputValue1
    //   })
    // }

  previewData: function (e) { 
    if (this.data.inputValue) {
      if (this.data.userList.filter(item => item.uname == this.data.inputValue).length !== 0) {   
        for (var i = 0; i < this.data.userList.length; i++) {
          if (this.data.inputValue == this.data.userList[i].uname) {
            if (this.data.inputValue1 == this.data.userList[i].upasswd) {
              // console.log(this.data.userList[i].upasswd)
              wx.setStorage({
                data: this.data.inputValue,
                key: 'username',
              })
              wx.switchTab({
                url: '/pages/index/index'
              })
            } else {
              if (this.data.inputValue1 !== '') {
                wx.showModal({
                  title: '密码输入错误',
                  content: '请重新输入',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                })
              } else {
                wx.showModal({
                  title: '密码为空',
                  content: '请输入',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                })
              }
            }
          }
        }
      } else {
        wx.showModal({
          title: '用户名不存在',
          content: '请重新输入',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    }else {
      wx.showModal({
        title: '用户名为空',
        content: '请输入',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://www.lllh.club:2292/users/intro',

      method: 'GET',
      success: res => {
        // console.log(res);
        this.setData({
          userList: res.data,
        })
        console.log(res.data)
      }
    });

///00000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    // wx.removeStorage({
    //   key: 'username',
    //   success: function(res) {
    //     console.log('成功')
    //   },
    // })


    // if (this.data.inputValue && this.data.userList.filter(item => item.uname == this.data.inputValue).length !== 0) {
    //   //将数据存储在本地
    //   wx.setStorage({
    //     key: "addTitle",
    //     data: this.data.inputValue
    //   });
    // }

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
    wx.request({
      url: 'http://www.lllh.club:2292/users/intro',

      method: 'GET',
      success: res => {
        // console.log(res);
        this.setData({
          userList: res.data,
        })
        console.log(res.data)
      }
    });
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
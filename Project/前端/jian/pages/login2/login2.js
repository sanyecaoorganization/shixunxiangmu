// pages/login2/login2.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    inputValue: '',
    inputValue1: '',
    inputValue2: '',
    inputValue3: '',
    user:{uname:'',upasswd:'',uphone:'',uaddress:'河北省石家庄市',uday:'2020-12-07',uimage:'https://c-ssl.duitang.com/uploads/blog/202011/12/20201112105442_acc37.thumb.1000_0.jpeg'},
  },

  bindtel: function (e) {
    //获取输入框的值，将其传递给inputValue
    var name = 'user.uname'
    this.setData({
      inputValue: e.detail.value,
      [name]:e.detail.value
    })
  },
  binduser: function (e) {
    //获取输入框的值，将其传递给inputValue
    var phone = 'user.uphone'
    this.setData({
      inputValue1: e.detail.value,
      [phone]:e.detail.value
    })
  },
  bindnewpa: function (e) {
    var passwd = 'user.upasswd'
    //获取输入框的值，将其传递给inputValue
    this.setData({
      inputValue2: e.detail.value,
      [passwd]:e.detail.value
    })
    
  },
  bindsure: function (e) {
    //获取输入框的值，将其传递给inputValue
    this.setData({
      inputValue3: e.detail.value
    })
  },

 
  preData: function (e) {
    if (this.data.inputValue && this.data.inputValue1 && this.data.inputValue2 && this.data.inputValue3) {
      if (this.data.userList.filter(item => item.uname == this.data.inputValue).length == 0) {
        if (this.data.userList.filter(item => item.uphone == this.data.inputValue1).length == 0) {
          if (this.data.inputValue3 == this.data.inputValue2) {
            console.log(this.data.user)
            wx.request({
              url:'http://49.234.222.174:2292/users/insert', 
              header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
              data: this.data.user,
              method: 'POST',
              success: function (res) {
                    console.log("成功");
                    console.log(res.data);
                    
               }
            })
            wx.showModal({
              title: '注册成功',
              // content: '请重新输入',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                }
              }
            })
            
          } else {
            wx.showModal({
              title: '确认密码输入错误',
              content: '请重新输入',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }

        } else {
          wx.showModal({
            title: '电话号码已注册',
            content: '请重新输入',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }

      } else {
        wx.showModal({
          title: '用户名已存在',
          content: '请重新输入',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    } else {
      wx.showModal({
        title: '输入框请补充完整',
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

      }
    })

    var DATA = util.formatDate(new Date());
    var day = 'user.uday'
  
    this.setData({
      [day]:DATA,
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
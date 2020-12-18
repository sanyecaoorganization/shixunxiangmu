// pages/login1/login1.js
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
    uname:'',
    data:{uid:0,upasswd:''},
    userid:'',
  },

  bindtel: function (e) {
    //获取输入框的值，将其传递给inputValue
    this.setData({
      inputValue: e.detail.value,
    })
  },
  binduser: function (e) {
    //获取输入框的值，将其传递给inputValue
    this.setData({
      inputValue1: e.detail.value
    })
  },
  bindnewpa: function (e) {
    //获取输入框的值，将其传递给inputValue
    this.setData({
      inputValue2: e.detail.value
    })
  },
  bindsure: function (e) {
    //获取输入框的值，将其传递给inputValue
    var pwd = "data.upasswd"

    this.setData({
      inputValue3: e.detail.value,
      [pwd]:e.detail.value,
      userid:this.data.userList.filter(item => item.uname == this.data.inputValue)[0].uid,
    })

    console.log(this.data.userid)
    var uidd = "data.uid"
    this.setData({
      [uidd]:this.data.userid
    });
  },


  preData: function (e) {
    if (this.data.inputValue && this.data.inputValue1 && this.data.inputValue2 && this.data.inputValue3) {
      if (this.data.userList.filter(item => item.uname == this.data.inputValue).length !== 0) {
        for (var i = 0; i < this.data.userList.length; i++) {
          if (this.data.inputValue == this.data.userList[i].uname) {
            if (this.data.inputValue1 == this.data.userList[i].uphone) {
              if (this.data.inputValue3 == this.data.inputValue2) {
                //修改的
                wx.request({
                  url:'http://49.234.222.174:2292/users/updateloginuser', 
                  header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                  data: this.data.data,
                  method: 'PUT',
                  success: function (res) {
                        console.log("成功");
                        console.log(res.data);       
                   }
                })

                console.log(this.data.data)
                wx.showModal({
                  title: '修改成功',
                  // content: '请重新输入',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                })
                wx.navigateTo({
                  url: '/pages/login/login',
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
                title: '电话号码输入错误',
                content: '请重新输入',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
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
    var that = this;
    wx.request({
      url: 'http://www.lllh.club:2292/users/intro',

      method: 'GET',
      success: res => {
        // console.log(res);
        that.setData({
          userList: res.data,
        })
        console.log("lalal")
      
      }
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
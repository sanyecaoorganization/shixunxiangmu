// pages/diary/diary.js
var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    buttonLoading: false, 
    accountData:[],
    accountTotal:0,
    userInfos: {},
    buttonLoadings: false, 
    accountDatas:[],
    accountTotals:0,
    inputValue:'',
    inputUid:0,
    userList:[],
    itemslist:[],
    id:''
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
  onShow: function () {
    console.log('onLoad')
    var that = this;

    wx.getStorage({
      key: 'username',  
      success:function(res){
        that.setData({
          inputValue:res.data
        })
        wx.request({
          url: 'http://www.lllh.club:2292/users/intro',
          method: 'GET',
          success: res => {
            that.setData({
              userList: res.data,
            })
            console.log(that.data.userList)
            for(var i=0;i<that.data.userList.length;i++){
              if(that.data.userList[i].uname == that.data.inputValue){
                that.setData({
                  inputUid:that.data.userList[i].uid,
                })
                console.log(that.data.inputUid)
                wx.request({ 
                  url: 'http://49.234.222.174:2292/consume/intro/'+that.data.inputUid,
                  method: 'GET',
                  success: res => {
                    console.log(res)
                    console.log(res.data)
                    that.setData({
                      accountData: res.data,
                    })
                    let studentsinfo=[];
                    //提取数组的部分元素组成一个新数组
                    that.data.accountData.forEach(item => {
                      let newdata = {};
                      newdata.amount = item.amount;
                      studentsinfo.push(newdata);
                    });
                    console.log(studentsinfo)
                    let sum = 0;
                    studentsinfo.forEach(item =>{
                        sum = sum + item.amount
                    })
                    console.log(sum) 
                    that.setData({
                      accountTotal: sum
                    })
                    console.log(that.data.accountTotal)

                  }
                })

              }
            }
          }
        })      
      }
  })

  wx.getStorage({
    key: 'username',  
    success:function(res){
      that.setData({
        inputValue:res.data
      })
      wx.request({
        url: 'http://www.lllh.club:2292/users/intro',
        method: 'GET',
        success: res => {
          that.setData({
            userList: res.data,
          })
          console.log(that.data.userList)
          for(var i=0;i<that.data.userList.length;i++){
            if(that.data.userList[i].uname == that.data.inputValue){
              that.setData({
                inputUid:that.data.userList[i].uid,
              })
              console.log(that.data.inputUid)
              wx.request({ 
                url: 'http://49.234.222.174:2292/income/intro/'+that.data.inputUid,
                method: 'GET',
                success: res => {
                  console.log(res)
                  console.log(res.data)
                  that.setData({
                    accountDatas: res.data,
                  })
                  let studentsinfos=[];
                  //提取数组的部分元素组成一个新数组
                  that.data.accountDatas.forEach(item => {
                    let newdatas = {};
                    newdatas.amount = item.amount;
                    studentsinfos.push(newdatas);
                  });
                  console.log(studentsinfos)
                  let sums = 0;
                  studentsinfos.forEach(item =>{
                      sums = sums + item.amount
                  })
                  console.log(sums) 
                  that.setData({
                    accountTotals: sums
                  })
                  console.log(that.data.accountTotals)
                }
              })

            }
          }
        }
      })      
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
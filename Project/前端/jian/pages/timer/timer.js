// // pages/my/my.js
const time = require("../../utils/util.js");

Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: "",
    isTodayWeek: false,
    todayIndex: 0,
    theDay: "",
    
   news_id:12,

    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],

  },
//




  //
  onLoad: function () {
    var TIME = time.formatTime(new Date()).split(" ")[0];
    console.log(TIME);
    this.setData({
    getDate: TIME,
    });
  },
  onShow:function(){
    let now = new Date();    
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();  
    // let thedata = decodeURIComponent(wx.getStorageSync('thedata'));
    // console.log(thedata);
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate(),
      theDay: '' + year + month + now.getDate(),
      // connect:thedata
    })
    
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr1 = [];                       //需要遍历的日历数组数据
    let arrLen = 0;                         //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                 //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();                          //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();               //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year +'/'+ (month + 1) +'/'+ num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr1[i] = obj;
      // console.log(obj.isToday);
    }
    this.setData({
      dateArr: dateArr1,
      
    })
    
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    console.log(nowDate.getDate())
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  /**
   * 上月切换
   */
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  do: function (e) {
    let end_date = e.currentTarget.dataset.key;
    console.log(e);
    console.log(e.currentTarget.dataset.key);
    this.setData({
      theDay: e.currentTarget.dataset.key,      
      // fardata:day,
    })   
  },
  lookHuoDong:function(){
      this.setData({
        dialogShow: true,
      })
  },

  //弹窗按钮
  tapDialogButton:function(e) {
    console.log(e);
    let dates = e.currentTarget.dataset.key;
    var just = new Date().getTime();//获取当前时间，单位ms
    var end = new Date(dates).getTime();
    // console.log(end)
    // console.log(just);
    // //转成毫秒数，两个日期相减
    var ms = end - just;
    //转换成天数
    var day = parseInt(ms / (1000 * 60 * 60 * 24));
    let con = e.detail.item.text ;   
    console.log(con)
    if(con =='确定'){
      wx.setStorageSync('lastdata', day)
      wx.setStorageSync('thedata', encodeURIComponent(dates))
      wx.switchTab({
        url: '/pages/my/my',
      })
    }else{
      this.setData({
        dialogShow: false
    })
  }
},
// do: function (e) {
//     let end_date = e.currentTarget.dataset.key;
//     console.log(e);
//     console.log(e.currentTarget.dataset.key);
//     var just = new Date().getTime();//获取当前时间，单位ms
//     var end = new Date(end_date).getTime();
//     // console.log(end)
//     // console.log(just);

//     // //转成毫秒数，两个日期相减
//     var ms = end - just;
//     //转换成天数
//     var day = parseInt(ms / (1000 * 60 * 60 * 24));
//     //do something
//     // console.log("day = ", day);
//     wx.setStorageSync('lastdata', day)
//     this.setData({
//       theDay: e.currentTarget.dataset.key,      
//       fardata:day,
//     })   
//   },
//   lookHuoDong:function(){
//       this.setData({
//         dialogShow: true,
//       })
//   },

//   //弹窗按钮
//   tapDialogButton:function(e) {
//     console.log(e);
//     let dates = e.currentTarget.dataset.key;
//     let con = e.detail.item.text ;   
//     console.log(con)
//     if(con =='确定'){
//       wx.setStorageSync('thedata', encodeURIComponent(dates))
//       wx.switchTab({
//         url: '/pages/my/my',
//       })
//     }else{
//       this.setData({
//         dialogShow: false
//     })
//   }
// },
  
})
// Page({

//   /**
//    * 页面的初始数据
//    */
  
//   data: {
//     guest:[{
//       avatar:'/images/2.jpg',
//       name:'正经人1号'
//     },{
//       avatar:'/images/3.jpg',
//       name:'正经人2号'
//     }],
//     lat:39.90467,
//     lon:116.39403,
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },
// /**
  

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
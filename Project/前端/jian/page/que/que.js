// page/que/que.js
const app = getApp()
const util = require("../../utils/util.js");
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    interestsCategories: [['领证',false,1], ['拍照',false,2],['彩礼',false,3],['嫁妆',false,4],['婚嫁习俗',false,5],['三金',false,6],['礼服',false,7],['清单',false,8],['情感',false,9],['婚检',false,10],],
     
    // 自定义自己喜欢的颜色
    colorArr: ["#EE2C2C", "#EEC900", "#4876FF", "#ff6700",
    "#CCFF66", "#FF3366", "#9F79EE", "#C28F5C", "#32CD32",
      // "#7DC67D", "#E17572", "#CCFF66", "#33FFCC", "#C28F5C",
      "#FF8533", "#7DC67D", "#428BCA", "#FF6700", "#E17572",    
      "#00BFFF", "#DB7093", "#CD3278", "#FF65BA"],
    // colorArr:["#66FF66","#66FF66","#66FF66"],
    // 存储随机颜色
    randomColorArr: [],
    selectCategories:[],
    indexid:'',
    userList:[],
    realPath:''
  },

//添加标签
selectCategories:function(e){
    console.log(e);
    var that = this
    let index = e.currentTarget.dataset.index
    let interestsCategories = that.data.interestsCategories
    let selectCategories = that.data.selectCategories
    if(selectCategories.length <1){
      if (!interestsCategories[index][1]) {
        interestsCategories[index][1] = true
        that.setData({
          interestsCategories: interestsCategories,
          indexid:index
        })
        selectCategories.push(e.currentTarget.dataset.tag)
      } else {
        interestsCategories[index][1] = false
        that.setData({
          interestsCategories: interestsCategories,
        })
        selectCategories.remove(e.currentTarget.dataset.tag)
      }
    }else{
      wx.showToast({
        title: '最多只能选1个哦~',
        icon:false
      })
      interestsCategories[index][1] = false
      that.setData({
        interestsCategories: interestsCategories
      })
      selectCategories.remove(e.currentTarget.dataset.tag)
    }

},

  //取消
  btnTest:function(){
    wx.switchTab({
      url: '../../pages/talk/talk',
    })
  },
  //发布
  btnTest2:function(e){ 
    let ques=e.currentTarget.dataset;
    let times = new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8);
    console.log(times);
    console.log(this.data);
    var that = this;  
    wx.request({    
      url:'http://49.234.222.174:2292/ques/createques', 
      header: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },    
      data: {
        "postcontent":ques.values,
          "posttime":times,
          "postimage":this.data.realPath,
          // "postimage":ques.photos,
          "poststyleid":ques.indexid,
          "uid":this.data.userList[0].uid,
      },        
      method: 'post',     
      success: function () {
            console.log("成功");  
            wx.switchTab({
              url: '../../pages/talk/talk',
            })
       }
      })
  },
  queValue:function(e){
    let value=e.detail.value
    console.log(value);
    this.setData({
      inputVal: value
    })
  },
//照片
selectImage:function(){
  wx.chooseImage({
    count: 1,
    sizeType:['original'],
    success:res=>{
      this.setData({
        imagePath:res.tempFilePaths[0]
      });
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
  onLoad: function (options) {
    console.log(this.data);
    let that = this,   
        labLen = that.data.interestsCategories.length+1,
        colorArr = that.data.colorArr,
    colorLen = colorArr.length,
    randomColorArr = [];
  //判断执行
do{
  let random = colorArr[Math.floor(Math.random() * colorLen)];
  console.log(random)
  randomColorArr.push(random);
  labLen--;
} while (labLen > 0)

that.setData({ 
  randomColorArr: randomColorArr
});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
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
      })
    }
    
  })
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
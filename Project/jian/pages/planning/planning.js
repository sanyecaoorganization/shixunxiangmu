// pages/planning/planning.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
   data: {
    // items: [
    //   {id: '1', name: '选购订婚钻戒及三金',state:'0'},
    //   {id: '2', name: '订婚流程确认',state:'0'},
    //   {id: '3', name: '安排婚前体检',state:'0'},
    //   {id: '4', name: '拍摄登记照',state:'0'},
    //   {id: '5', name: '领取结婚证',state:'0'},
    //   {id: '6', name: '选定结婚日期',state:'0'},
    //   {id: '7', name: '结婚费用预算以及分配',state:'0'},   
    // ],
    // items1: [
    //   {id: '1', name: '搜集拍婚纱照灵感',state:'0'},
    //   {id: '2', name: '挑选婚纱摄影商家',state:'0'},
    //   {id: '3', name: '到店选择服装以及试妆',state:'0'},
    //   {id: '4', name: '准备拍婚纱照必备物品',state:'0'},
    //   {id: '5', name: '进行皮肤保养/剪发造型',state:'0'},
    //   {id: '6', name: '预约选片时间并挑选照片',state:'0'},
    //   {id: '7', name: '定稿后拿取婚纱照',state:'0'},
    // ],
    // items2: [
    //   {id: '1', name: '确定婚礼地点',state:'0'},
    //   {id: '2', name: '确定婚礼形式',state:'0'},
    //   {id: '3', name: '选定婚宴酒店',state:'0'},
    //   {id: '4', name: '拟定宾客名单',state:'0'},
    //   {id: '5', name: '确定婚宴桌数',state:'0'},
    //   {id: '6', name: '安排宾客座位',state:'0'},
    //   {id: '7', name: '确定户内流程',state:'0'},
    // ],
    // items3: [
    //   {id: '1', name: '确定婚礼风格',state:'0'},
    //   {id: '2', name: '确定婚礼策划商家',state:'0'},
    //   {id: '3', name: '确定婚礼现场布置',state:'0'},
    //   {id: '4', name: '确定婚礼当天流程',state:'0'},
    //   {id: '5', name: '确定双方和父母婚礼当天致辞',state:'0'},
    //   {id: '6', name: '确定伴郎伴娘人选及分工',state:'0'},
    //   {id: '7', name: '确定婚车数量及安排',state:'0'},
    // ],
    // items4: [
    //   {id: '1', name: '挑选新娘礼服',state:'0'},
    //   {id: '2', name: '挑选新郎礼服',state:'0'},
    //   {id: '3', name: '为伴郎伴娘选购礼服',state:'0'},
    //   {id: '4', name: '为父母选购礼服',state:'0'},
    //   {id: '5', name: '为花童选购礼服',state:'0'},
    //   {id: '6', name: '试礼服，定造型',state:'0'},
    // ],
    // items5: [
    //   {id: '1', name: '制定采购清单',state:'0'},
    //   {id: '2', name: '新娘嫁妆清单',state:'0'},
    //   {id: '3', name: '婚房布置方案及物品购买',state:'0'},
    //   {id: '4', name: '选购婚庆床品',state:'0'},
    //   {id: '5', name: '选购婚鞋混包',state:'0'},
    //   {id: '6', name: '选接亲游戏道具',state:'0'},
    //   {id: '7', name: '选购婚宴喜酒',state:'0'},
    //   {id: '8', name: '婚礼蛋糕及甜点',state:'0'},
    //   {id: '9', name: '宾客喜糖请柬',state:'0'},
    //   {id: '10', name: '选购红包伴手礼',state:'0'},
    // ],
    // items6: [
    //   {id: '1', name: '与婚礼的所有相关人员沟通',state:'0'},
    //   {id: '2', name: '制作请帖，邀请来宾',state:'0'},
    //   {id: '3', name: '婚宴座位表确定与同步',state:'0'},
    //   {id: '4', name: '美容护肤，与化妆师沟通',state:'0'},
    //   {id: '5', name: '减肥瘦身，再次确定礼服',state:'0'},
    //   {id: '6', name: '最后确定婚礼现场细节',state:'0'},
    //   {id: '7', name: '准备结亲游戏/接亲安排',state:'0'},
    //   {id: '8', name: '选定婚礼音乐、MV',state:'0'},
    //   {id: '9', name: '确定婚礼当天婚车路线及时间',state:'0'},
    //   {id: '10', name: '摄像摄影拍摄安排',state:'0'},
    //   {id: '11', name: '准备好所有出嫁迎娶事宜',state:'0'},
    // ],

     // 展开折叠
     selectedFlag: [false, false, false, false],
     itemlist:[],
     items:[],
     items1:[],
     items2:[],
     items3:[],
     items4:[],
     items5:[],
     items6:[],
     inputValue:'',
     uid:0,
     inputUid:0,
     userList:[]
    
 
},

  checkbtn: function (e) {
    var index = e.currentTarget.dataset.key;
    if (this.data.items[index].state == 1) {
      this.data.items[index].state = 0;
    } else if (this.data.items[index].state == 0) {
      this.data.items[index].state = 1;
    }
    this.setData({
      items: this.data.items,
      id:this.data.items[index].id,
      state:this.data.items[index].state
    });
    console.log(this.data.items);
    // console.log(this.data.id)
    // console.log(this.data.state)

    var that=this;

    wx.request({
      url:'http://49.234.222.174:2292/process/updateprocess', 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      // data: this.data.user,
      data:{
        'uid':that.data.inputUid,
        // 'items':that.data.items,
        'id':that.data.id,
        'state':that.data.state
      },
      method: 'put',
      success: function (res) {
            console.log("成功");
            console.log(res);
            console.log(that.data.inputUid);
      }
    })
  },

  checkbtn1: function (e) {
    var index = e.currentTarget.dataset.key;
    if (this.data.items1[index].state == 1) {
      this.data.items1[index].state = 0;
    } else if (this.data.items1[index].state == 0) {
      this.data.items1[index].state = 1;
    }
    this.setData({
      items1: this.data.items1,
      id:this.data.items1[index].id,
      state:this.data.items1[index].state
    });
    console.log(this.data.items1);
    var that=this;

    wx.request({
      url:'http://49.234.222.174:2292/process/updateprocess', 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      // data: this.data.user,
      data:{
        'uid':that.data.inputUid,
        'id':that.data.id,
        'state':that.data.state
      },
      method: 'put',
      success: function (res) {
            console.log("成功");
            console.log(res);
            
      }
    })
  },

  checkbtn2: function (e) {
    var index = e.currentTarget.dataset.key;
    if (this.data.items2[index].state == 1) {
      this.data.items2[index].state = 0;
    } else if (this.data.items2[index].state == 0) {
      this.data.items2[index].state = 1;
    }
    this.setData({
      items2: this.data.items2,
      id:this.data.items2[index].id,
      state:this.data.items2[index].state
    });
    console.log(this.data.items2);
    var that=this;

    wx.request({
      url:'http://49.234.222.174:2292/process/updateprocess', 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      // data: this.data.user,
      data:{
        'uid':that.data.inputUid,
        'id':that.data.id,
        'state':that.data.state
      },
      method: 'put',
      success: function (res) {
            console.log("成功");
            console.log(res);
      }
    })
  },

  checkbtn3: function (e) {
    var index = e.currentTarget.dataset.key;
    if (this.data.items3[index].state == 1) {
      this.data.items3[index].state = 0;
    } else if (this.data.items3[index].state == 0) {
      this.data.items3[index].state = 1;
    }
    this.setData({
      items3: this.data.items3,
      id:this.data.items3[index].id,
      state:this.data.items3[index].state
    });
    console.log(this.data.items3);
    var that=this;

    wx.request({
      url:'http://49.234.222.174:2292/process/updateprocess', 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      // data: this.data.user,
      data:{
        'uid':that.data.inputUid,
        // 'items':that.data.items,
        'id':that.data.id,
        'state':that.data.state
      },
      method: 'put',
      success: function (res) {
            console.log("成功");
            console.log(res);
      }
    })
  },

  checkbtn4: function (e) {
    var index = e.currentTarget.dataset.key;
    if (this.data.items4[index].state == 1) {
      this.data.items4[index].state = 0;
    } else if (this.data.items4[index].state == 0) {
      this.data.items4[index].state = 1;
    }
    this.setData({
      items4: this.data.items4,
      id:this.data.items4[index].id,
      state:this.data.items4[index].state
    });
    console.log(this.data.items4);
    var that=this;

    wx.request({
      url:'http://49.234.222.174:2292/process/updateprocess', 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      // data: this.data.user,
      data:{
        'uid':that.data.inputUid,
        // 'items':that.data.items,
        'id':that.data.id,
        'state':that.data.state
      },
      method: 'put',
      success: function (res) {
            console.log("成功");
            console.log(res);
      }
    })
  },

  checkbtn5: function (e) {
    var index = e.currentTarget.dataset.key;
    if (this.data.items5[index].state == 1) {
      this.data.items5[index].state = 0;
    } else if (this.data.items5[index].state == 0) {
      this.data.items5[index].state = 1;
    }
    this.setData({
      items5: this.data.items5,
      id:this.data.items5[index].id,
      state:this.data.items5[index].state
    });
    console.log(this.data.items5);
    var that=this;

    wx.request({
      url:'http://49.234.222.174:2292/process/updateprocess', 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      // data: this.data.user,
      data:{
        'uid':that.data.inputUid,
        // 'items':that.data.items,
        'id':that.data.id,
        'state':that.data.state
      },
      method: 'put',
      success: function (res) {
            console.log("成功");
            console.log(res);
      }
    })
  },

  checkbtn6: function (e) {
    var index = e.currentTarget.dataset.key;
    if (this.data.items6[index].state == 1) {
      this.data.items6[index].state = 0;
    } else if (this.data.items6[index].state == 0) {
      this.data.items6[index].state = 1;
    }
    this.setData({
      items6: this.data.items6,
      id:this.data.items6[index].id,
      state:this.data.items6[index].state
    });
    console.log(this.data.items6);
    var that=this;

    wx.request({
      url:'http://49.234.222.174:2292/process/updateprocess', 
      
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      // data: this.data.user,
      data:{
        'uid':that.data.inputUid,
        // 'items':that.data.items,
        'id':that.data.id,
        'state':that.data.state
      },
      method: 'put',
      success: function (res) {
            console.log("成功");
            console.log(res);
      }
    })
  },

  
  // 展开折叠选择 
  changeToggle:function(e){
  var index = e.currentTarget.dataset.index;
  if (this.data.selectedFlag[index]){
  this.data.selectedFlag[index] = false;
  }else{
  this.data.selectedFlag[index] = true;
  }

  this.setData({
  selectedFlag: this.data.selectedFlag
  })

  
    
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      
                  url: 'http://49.234.222.174:2292/process/intro/'+that.data.inputUid,
                  method: 'GET',
                  success: res => {
                    that.setData({
                      itemslist: res.data,
                      items:res.data.filter(item => item.group == 1),
                      items1:res.data.filter(item => item.group == 2),
                      items2:res.data.filter(item => item.group == 3),
                      items3:res.data.filter(item => item.group == 4),
                      items4:res.data.filter(item => item.group == 5),
                      items5:res.data.filter(item => item.group == 6),
                      items6:res.data.filter(item => item.group == 7),
                    })
                    console.log(that.data.items)
                    console.log(that.data.inputUid)
                  }
                })

              }
            }
          }
        })
       
      }
  })
  // wx.setStorage({
  //   // data: data,
  //   key: 'key',
  //   inputUid:that.data.inputUid,
  // })
  
  // console.log(uids)
    

  
    
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
    // var that = this;

    // // 获取记录
    // var itemsData = wx.getStorageSync("items");
    // this.caculateTotals(tempAccountDatas);
    // this.setData({
    //     accountDatas: tempAccountDatas
    // });
 
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
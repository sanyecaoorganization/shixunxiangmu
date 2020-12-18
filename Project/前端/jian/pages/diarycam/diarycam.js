// pages/diarycam/diarycam.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //输入框内容
     add: "", 
     //正在进行列表
     todolist: [], 
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
                  url: 'http://49.234.222.174:2292/camera/intro/'+that.data.inputUid,
                  method: 'GET',
                  success: res => {
                    console.log(res)
                    console.log(res.data)
                    that.setData({
                      todolist: res.data,
                    })
                    console.log(that.data.inputUid)
                    console.log(that.data.todolist)
                  }
                })

              }
            }
          }
        })      
      }
  })
   
  },

  goFront: function() {
    wx.navigateTo({
			url: '/pages/camimg/camimg',
		})
  },
  inputChange: function(e){
    this.setData({
        add: e.detail.value
    })
  },

  /**
   * 点击键盘的回车和【添加】时处理的事件
   */
  addTodoList: function() {
     
    //输入框为空时，点击添加无效
    if(!this.data.add){
      return
    }
    var todos = this.data.todolist
    todos.push({
      //把输入框的值赋给todolist.name,并且设置完成状态为false
      content: this.data.add,
      // state: false,
      frontsrc:this.data.frontsrc
    })
     
    this.setData({
      todolist: todos,
      add: "",
    })
    console.log(this.data.todolist)
    // wx.uploadFile({ 
    //   url: 'http://www.lllh.club:2292/upload',
    //   filePath:frontsrc,
    //   name: 'media', 
    //   method:'post',
    //   success: res => { // 上传成功后的代码
    //      that.setData({
    //        img:res.data
    //      })
    //      console.log(that.data.img)
    //      console.log(res.data)
    //   },
    //   fail:res=>{
    //     console.log(res)
    //   }

    // })
    var that = this;
    wx.request({
      url:'http://49.234.222.174:2292/camera/updatecamera', 
      header: { 
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      // data: this.data.user,
      data:{
        uid:that.data.inputUid,
        list:JSON.stringify(that.data.todolist),
      },
      method: 'put',
      success: function (res) {
            console.log("成功");
            console.log(res);
            console.log(res.data)
            // that.setData({
            //     todolist: res.data,
            // })
            // console.log(that.data.todolist)
            
      }
  
    })

  },

    // save: function(){
    //   wx.setStorageSync('todo_list', this.data.todolist)
    // },

    removeItem: function(e){
      var that = this;
      var index = e.target.dataset.indexKey;
      console.log(index)
      var id1 = that.data.todolist[index].id
      console.log(id1)
     var todolist = that.data.todolist;
     todolist.splice(index,1);
      that.setData({
        todolist: that.data.todolist,
         id:id1
         //id:that.data.id
         // id:that.data.accountData[index].id
      });
      console.log(that.data.id)
      console.log(that.data.todolist)
      wx.request({
       url:'http://49.234.222.174:2292/camera/updatecamera', 
       header: { 
         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
       },
       // data: this.data.user,
       data:{
         uid:that.data.inputUid,
         list:JSON.stringify(that.data.todolist),    
       },
       method: 'put',
       success: function (res) {
             console.log("成功");
             console.log(res);
             // console.log(that.data.list)
             console.log(res.data)
             that.setData({
               todolist: res.data,
             })
       }
     })
    //   var that = this;
    //   var index = e.target.dataset.indexKey;
    //   console.log(index)
    //   var id1 = that.data.todolist[index].id
    //   console.log(id1)
    // //  var tempAccountData = wx.getStorageSync("accountData") || [];
    //   var todolist = that.data.todolist;
    //   todolist.splice(index,1);
    //   that.setData({
    //     todolist: that.data.todolist,
    //     id:id1
    //  });
    // //  console.log(that.data.id)
    //  console.log(that.todolist)
    //  wx.request({
    //   url:'http://49.234.222.174:2292/camera/updatecamera', 
    //   header: { 
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    //   // data: this.data.user,
    //   data:{
    //     uid:that.data.inputUid,
    //     list:JSON.stringify(that.data.todolist),    
    //   },
    //   method: 'put',
    //   success: function (res) {
    //         console.log("成功");
    //         console.log(res);
    //         // console.log(that.data.list)
    //         console.log(res.data)
    //         that.setData({
    //           todolist: res.data,
    //         })
    //   }
    // })




      // var todolist  = this.data.todolist
      // //通过e.currentTarget.dataset.index拿到item的index，并删除1个
      // todolist.splice(e.currentTarget.dataset.index, 1)

      // this.setData({
      //   todolist: todolist,
      // })
      // console.log(this.data.todolist)
      // var that = this;
      // wx.request({
      //   url:'http://49.234.222.174:2292/camera/updatecamera', 
      //   header: { 
      //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      //   },
      //   // data: this.data.user,
      //   data:{
      //     uid:that.data.inputUid,
      //     list:JSON.stringify(that.data.todolist),
      //   },
      //   method: 'put',
      //   success: function (res) {
      //         console.log("成功");
      //         console.log(res);
      //         console.log(res.data)
      //         that.setData({
      //               todolist: res.data,
      //         })
      //         console.log(that.data.todolist)
              
      //   }
    
      // })
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
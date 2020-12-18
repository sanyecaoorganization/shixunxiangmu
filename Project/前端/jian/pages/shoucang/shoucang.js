// pages/shoucang/shoucang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:'',
    userid:'',
    userList:[],
    scList:[],
    List:[],
    List1:[],
    List2:[],
    createList:[],
    $data1:[],
    data:{uid:1,typeid:0,id:0},
    data1:[],
  },

  //删除成功后，需要重新保存，页面的数据才会改变

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.request({
      url:'http://49.234.222.174:2292/photos/intro',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res=>{
        // console.log(res);
        that.setData({
          List:res.data,
        })        
      }                    
    })

    wx.request({
      url:'http://49.234.222.174:2292/plans/intro',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res=>{
        // console.log(res);
        that.setData({
          List1:res.data,
        })        
      }                    
    })

    wx.request({
      url:'http://49.234.222.174:2292/dress/intro',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:res=>{
        // console.log(res);
        that.setData({
          List2:res.data,
        })        
      }                    
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
            console.log(that.data.userid) 

            wx.request({
              url: 'http://49.234.222.174:2292/collects/intro/'+that.data.userid,
              method: 'GET',
              success: res => {
                // console.log(res);
                that.setData({
                  scList: res.data,
                })
                console.log(that.data.scList)
          
                for(var i =0;i<that.data.scList.length;i++){
                  // console.log(that.data.scList.length)
                  if(that.data.scList[i].typeid==1){
                    //此处的console.log会先于success中的执行，所以此处输出的that.data.List为空
                    that.setData({
                      createList:that.data.createList.concat(that.data.List.filter(item => item.pid == that.data.scList[i].id))
                    })
                    // that.data.scList[m].styleid=that.data.List[that.data.scList[m].id].styleid
                    // console.log(that.data.createList)

                  }else if(that.data.scList[i].typeid==2){
                    that.setData({
                      createList:that.data.createList.concat(that.data.List1.filter(item => item.pid == that.data.scList[i].id))
                    })
                    // console.log(that.data.createList)
                  }else if(that.data.scList[i].typeid==3){
                    that.setData({
                      createList:that.data.createList.concat(that.data.List2.filter(item => item.pnum == that.data.scList[i].id))
                    })
                  }
                }
                console.log(that.data.createList)

             
              }
            })


          }
        })
      } 
    })

  
  },

  readDetail:function(e){
    var that = this;
    var $data = e.currentTarget.dataset;//打印可以看到，此处已经获取到了包含id ... 的对象
    that.setData({
      data1:e.currentTarget.dataset,
    })
    var current = Number($data.id)-1
    for(var i=0;i<that.data.createList.length;i++){
      if(that.data.createList[i].typeid == that.data.data1.typeid && that.data.createList[i].pid == that.data.data1.id){
        if(that.data.data1.typeid == 1){
          wx.navigateTo({
            url: '/pages/hundetail/hundetail?id='+$data.id+"&styleid="+that.data.createList[i].styleid+"&shopid="+that.data.createList[i].shopid+"&current="+current//传参跳转即可
          })
        }else if(that.data.data1.typeid == 2){
          wx.navigateTo({
            url: '/pages/cedetail/cedetail?id='+$data.id+"&styleid="+that.data.createList[i].styleid+"&shopid="+that.data.createList[i].shopid+"&current="+current//传参跳转即可
          })
        }
        
      }else if(that.data.createList[i].typeid == that.data.data1.typeid && that.data.createList[i].pnum == that.data.data1.id){
        wx.navigateTo({
          url: '/pages/lidetail/lidetail?id='+$data.id+"&styleid="+that.data.createList[i].styleid+"&shopid="+that.data.createList[i].shopid+"&current="+current//传参跳转即可
        })
      }
    }
    
  },

  dele:function(e){
    var that = this;
    // var $data1 = e.currentTarget.dataset;
    that.setData({
      $data1:e.currentTarget.dataset
    });
    var iddd = "data.id"
    that.setData({
      [iddd]:that.data.$data1.id
    });
    var typeiddd = "data.typeid"
    that.setData({
      [typeiddd]:that.data.$data1.typeid
    });
    var useridd = "data.uid"
    that.setData({
      [useridd]:that.data.$data1.uid
    });

    wx.request({
      url:'http://49.234.222.174:2292/collects/deletecollect', 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: that.data.data,
      method: 'delete',
      success: function (res) {
        console.log("成功");
        console.log(res);
        wx.showToast({
          title: '已取消收藏',
        });
        that.onLoad();
      
      
       },
  
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
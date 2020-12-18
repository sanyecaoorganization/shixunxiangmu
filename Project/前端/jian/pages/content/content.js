// pages/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    userList:[],
    uname:'',
    userid:'',
    inputValue:'',
    inputValue1:'',
    inputValue2:'',
    inputValue3:'',
    inputValue4:'',
    inputValue5:'',
    data:{uid:0,groomname:'',bridename:'',time:'',address:'',groomtel:'',bridetel:'',image1:'',image2:'',image3:''},
    images:[],
  },


  bind1: function (e) {
    //获取输入框的值，将其传递给inputValue
    var groomname = 'data.groomname'
    this.setData({
      inputValue: e.detail.value,
      [groomname]:e.detail.value
    })
    
  },
  bind2: function (e) {
    //获取输入框的值，将其传递给inputValue
    var bridename = 'data.bridename'
    this.setData({
      inputValue1: e.detail.value,
      [bridename]:e.detail.value
    })
  },
  bind3: function (e) {
    var time = 'data.time'
    this.setData({
      inputValue2: e.detail.value,
      [time]:e.detail.value
    })
  },
  bind4: function (e) {
    var address = 'data.address'
    this.setData({
      inputValue3: e.detail.value,
      [address]:e.detail.value
    })
  },
  bind5: function (e) {
    var groomtel = 'data.groomtel'
    this.setData({
      inputValue4: e.detail.value,
      [groomtel]:e.detail.value
    })
  },
  bind6: function (e) {
    var bridetel = 'data.bridetel'
    this.setData({
      inputValue5: e.detail.value,
      [bridetel]:e.detail.value
    })
  },

  next:function(e){
    wx.navigateTo({
      url: '/pages/qingtie/qingtie',
    })
  },
  // bind6: function (e) {
  //   var image1 = 'user.image1'
  //   this.setData({
  //     inputValue5: e.detail.value,
  //     [image1]:e.detail.value
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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

            var uidd = "data.uid"
            that.setData({
              [uidd]:that.data.userid
            });

            wx.request({
              url:'http://49.234.222.174:2292/card/intro/'+that.data.userid, 
             
              method: 'GET',
              success: function (res) {
                console.log("成功");
                console.log(res.data);  
                
                // wx.navigateTo({
                //   url: '/pages/qingtie/qingtie',
                // })
               }
            })


          }
        })
      } 
    }) 
    

  },

  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          //啦啦啦啦啦啦
          wx.uploadFile({
            url: 'http://49.234.222.174:2292/upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'media',
            
            success (res){
              that.setData({
                images:that.data.images.concat('http://49.234.222.174:2292/static/images/'+res.data),
              })
              // images.push('http://49.234.222.174:2292/static/images/'+tempFilePaths[0]);
              // console.log('http://49.234.222.174:2292/static/images/'+that.data.images)
            }
          })
          // console.log(that.data.images)
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });

        // var image1 = "data.image1"
        // that.setData({
        //   [image1]:that.data.images[0]
        // });
        // var image2 = "data.image2"
        // that.setData({
        //   [image2]:that.data.images[1]
        // });
        // var image3 = "data.image3"
        // that.setData({
        //   [image3]:that.data.images[2]
        // });

      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })

  },


  previewData: function (e) {
    console.log(this.data.images);
    var image1 = "data.image1"
    this.setData({
      [image1]:this.data.images[0]
    });
    var image2 = "data.image2"
    this.setData({
      [image2]:this.data.images[1]
    });
    var image3 = "data.image3"
    this.setData({
      [image3]:this.data.images[2]
    });
    if (this.data.inputValue && this.data.inputValue1 && this.data.inputValue2 && this.data.inputValue3 && this.data.inputValue4 && this.data.inputValue5 && this.data.imgs.length) {
      console.log(this.data.data);
       //修改的
       wx.request({
        url:'http://49.234.222.174:2292/card/updatecard', 
        header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: this.data.data,
        method: 'PUT',
        success: function (res) {
          console.log("成功");
          console.log(res.data);  
          
          wx.navigateTo({
            url: '/pages/qingtie/qingtie',
          })
         }
      })

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
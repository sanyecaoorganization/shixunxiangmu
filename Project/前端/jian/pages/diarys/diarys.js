var util = require("../../utils/util.js");
//获取应用实例
var app = getApp();
Page({
  data: {
    userInfo: {},
    buttonLoading: false, 
    accountData:[],
    accountTotal:0,
    inputValue:'',
    inputUid:0,
    userList:[],
    itemslist:[],
    id:''
  },
  onLoad: function () {
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

                    console.log(that.data.inputUid)
                    console.log(that.data.accountData)
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


  },

  //表单提交
  

  formSubmit:function(e){

      this.setData({
        buttonLoading: true
      });

      var that = this;
      setTimeout(function(){
          var inDetail = e.detail.value.inputdetail;
          var inAmount = e.detail.value.inputamount;
          console.log(inAmount)
          inAmount = parseFloat(inAmount)
          console.log(inAmount)
          if(inDetail.toString().length <= 0 || inAmount.toString().length <= 0){
              console.log("can not empty");
              that.setData({
                buttonLoading: false
              });
              return false;
          }
          
          //新增记录

          var tempAccountData =  that.data.accountData
          tempAccountData.unshift({detail:inDetail,amount:inAmount});
          that.setData({
              accountData: tempAccountData,
              buttonLoading: false,
              form_info: '',
          });
          console.log(that.data.accountData)
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
          wx.request({
            url:'http://49.234.222.174:2292/consume/consume', 
            header: { 
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            data:{
              uid:that.data.inputUid,
              consume:JSON.stringify(that.data.accountData),    
            },
            method: 'post',
            success: function (res) {
                  console.log("成功");
                  console.log(res);
                  console.log(res.data)

            }
          })
      },1000);
      console.log(that.data.accountData)
     

  },
  //删除行
  deleteRow: function(e){
     var that = this;
     var index = e.target.dataset.indexKey;
     console.log(index)
     var id1 = that.data.accountData[index].id
     console.log(id1)
    var accountData = that.data.accountData;
    accountData.splice(index,1);
     that.setData({
        accountData: that.data.accountData,
        id:id1
     });
     console.log(that.data.id)
     console.log(that.data.accountData)
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
     wx.request({
      url:'http://49.234.222.174:2292/consume/consume', 
      header: { 
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },

      data:{
        uid:that.data.inputUid,
        consume:JSON.stringify(that.data.accountData),    
      },
      method: 'post',
      success: function (res) {
            console.log("成功");
            console.log(res);
            // console.log(that.data.list)
            console.log(res.data)
            that.setData({
              accountData: res.data,
            })
      }
    })
  },
  onShow: function () {


  },
})


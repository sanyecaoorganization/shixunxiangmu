var util = require("../../utils/util.js");
//获取应用实例
var app = getApp();
Page({
  data: {
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
                    console.log(that.data.inputUid)
                    console.log(that.data.accountDatas)
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
        buttonLoadings: true
      });

      var that = this;
      setTimeout(function(){
          var inDetails = e.detail.value.inputdetail;
          var inAmounts = e.detail.value.inputamount;
          inAmounts = parseFloat(inAmounts)
          if(inDetails.toString().length <= 0 || inAmounts.toString().length <= 0){
              console.log("can not empty");
              that.setData({
                buttonLoadings: false
              });
              return false;
          }
          
          //新增记录

          var tempAccountDatas =  that.data.accountDatas
          tempAccountDatas.unshift({detail:inDetails,amount:inAmounts});
          that.setData({
              accountDatas: tempAccountDatas,
              buttonLoadings: false,
              form_infos: ''
          });
          console.log(that.data.accountDatas)
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
          wx.request({
            url:'http://49.234.222.174:2292/income/income', 
            header: { 
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            // data: this.data.user,
            data:{
              uid:that.data.inputUid,
              income:JSON.stringify(that.data.accountDatas),    
            },
            method: 'post',
            success: function (res) {
                  console.log("成功");
                  console.log(res);
                  console.log(res.data)
            }
          })


      },1000);


  },
  //删除行
  deleteRow: function(e){
    var that = this;
    var index = e.target.dataset.indexKey;
    console.log(index)
    var id2 = that.data.accountDatas[index].id
    console.log(id2)
   var accountDatas = that.data.accountDatas;
   accountDatas.splice(index,1);

    that.setData({
       accountDatas: that.data.accountDatas,
       id:id2

    });
    console.log(that.data.id)
    console.log(that.data.accountDatas)
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
   
   
    wx.request({
     url:'http://49.234.222.174:2292/income/income', 
     header: { 
       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
     },
     // data: this.data.user,
     data:{
       uid:that.data.inputUid,
       income:JSON.stringify(that.data.accountDatas),    
     },
     method: 'post',
     success: function (res) {
           console.log("成功");
           console.log(res);
           // console.log(that.data.list)
           console.log(res.data)
           that.setData({
             accountDatas: res.data,
           })
     }
   })

  },
  onShow: function () {


  },
})



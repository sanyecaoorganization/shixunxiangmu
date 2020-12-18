Page({
  /**
   * 页面的初始数据
   */
  data: {
    //输入框内容
    add: "", 
    //正在进行列表
    todolist: [], 
    //已完成列表
    completedList:[], 
    //未完成数
    leftcount: 0, 
    //已完成数
    completedcount: 0,
    //拼接数组
    list:[],
    inputValue:'',
    inputUid:0,
    userList:[],
    itemslist:[]
  },
  /**
   * 缓存正在进行和已完成的列表数据
   */
  // save: function(){
  //   wx.setStorageSync('todo_list', this.data.todolist)
  //   wx.setStorageSync('completed_list', this.data.completedList)
  // },
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
                  url: 'http://49.234.222.174:2292/myplan/intro/'+that.data.inputUid,
                  method: 'GET',
                  success: res => {
                    console.log(res)
                    console.log(res.data)
                    that.setData({
                      itemslist: res.data,
                      todolist:res.data.filter(item => item.state == false),
                      completedList:res.data.filter(item => item.state == true),
                    })
                    console.log(that.data.inputUid)
                    console.log(that.data.itemslist)
                    console.log(that.data.todolist)
                    console.log(that.data.completedList)

                    var todos = that.data.todolist
                    var completedList = that.data.completedList
                    console.log(todos)
                    if (todos) {
                      that.setData({ 
                        todolist: todos, 
                        leftcount: todos.length 
                      })
                      console.log(that.data.leftcount)
                    }
                    //列表不为空时，赋值
                    if (completedList) {
                      that.setData({ 
                        completedList: completedList, 
                        completedcount: completedList.length 
                      })
                    }
                  }
                })

              }
            }
          }
        })      
      }
  })


  
   //获取缓存的列表数据
    // var todos = wx.getStorageSync('todo_list')
    // var completedList = wx.getStorageSync('completed_list')
    //列表不为空时，赋值
    // var todos = this.data.todolist
    // var completedList = this.data.completedList
    // console.log(todos)
    // if (todos) {
    //   this.setData({ 
    //     todolist: todos, 
    //     leftcount: todos.length 
    //   })
    //   console.log(this.data.leftcount)
    // }
    // //列表不为空时，赋值
    // if (completedList) {
    //   this.setData({ 
    //     completedList: completedList, 
    //     completedcount: completedList.length 
    //   })
    // }
  },


  /**
   * 输入框输入监听
   * @param {*} e 
   */
  inputChangeListen: function(e){
    this.setData({
        add: e.detail.value
    })
  },
  /**
   * 点击键盘的回车和【添加】时处理的事件
   */
  addTodoListListen: function() {
    //输入框为空时，点击添加无效
    if(!this.data.add){
      return
    }
    var todos = this.data.todolist
    todos.push({
      //把输入框的值赋给todolist.name,并且设置完成状态为false
      content: this.data.add,
      state: false
    })
     
    this.setData({
      todolist: todos,
      add: "",
      leftcount: this.data.leftcount + 1
    })
    // this.save()
    console.log(this.data.todolist)
  },
  /**
   * 进行中的列表item点击监听
   * @param  e 
   */
  toggleToDoListen: function(e){
    
    //切换选中item的完成状态
    var todolist  = this.data.todolist
    var  completedList = this.data.completedList
    //获得当前点击的item
    var todoitem = todolist[e.currentTarget.dataset.index]
    //改变完成状态
    todoitem.state = true
    //把item加入到已完成列表
    completedList.push(todoitem)
   //进行的任务-1
    var leftCount = this.data.leftcount -1
    //已完成任务+1
    var completedcount = this.data.completedcount +1
    //在进行列表中删除改item
    todolist.splice(e.currentTarget.dataset.index, 1)[0]
    
    this.setData({
      todolist: todolist,
      completedList: completedList,
      leftcount: leftCount,
      completedcount: completedcount
    })
   
    // this.save()
    console.log(this.data.todolist)
  },
 /**
   * 已完成的列表item点击监听
   * @param  
   */
  completedItemClickListen: function(e){
    //切换当选选中item的完成状态
    var completedList  = this.data.completedList
    var  todolist = this.data.todolist
    //获得当前点击的item
    var completeditem = completedList[e.currentTarget.dataset.index]
    //改变完成状态
    completeditem.state = false
    //把item加入到进行中列表
    todolist.push(completeditem)
    //在已完成列表中删除该item
    completedList.splice(e.currentTarget.dataset.index, 1)[0]
   
    this.setData({
      todolist: todolist,
      completedList: completedList,
      leftcount: this.data.leftcount +1,
      completedcount: this.data.completedcount -1
    })
    this.save()
    console.log(this.data.completedList)
  },
  /**
   * 删除进行中列表item的处理
   * @param {*} e 
   */
  removeItemListen: function(e){
    var todolist  = this.data.todolist
    //通过e.currentTarget.dataset.index拿到item的index，并删除1个
    todolist.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      todolist: todolist,
      leftcount:  this.data.leftcount -1
    })
    this.save()
  },
 /**
   * 删除已完成列表item的处理
   * @param {*} e 
   */
  removecompletedItemListen: function(e){
    var completedList  = this.data.completedList
     //通过e.currentTarget.dataset.index拿到item的index，并删除1个
    completedList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      completedList: completedList,
      completedcount: this.data.completedcount - 1
    })
    // this.save()
  },
  /**
   * 一键全选并且设置成已完成状态
   */
  tpggleAllListen: function(){
    var that = this
    var todolist = this.data.todolist
    var completedList= this.data.completedList
    //遍历todolist，改变状态，并且push到completedList
    todolist.forEach(function (item){
      item.state = true
      completedList.push(item)
   
    })
    this.setData({
      todolist: [],
      leftcount: 0,
      completedList: completedList,
      completedcount: this.data.completedcount + todolist.length
    })
    // this.save()
  },
  /**
   * 清空列表
   */
  clearListen: function() {
    this.setData({
      completedList: [],
      completedcount: 0
    })
    // this.save()
  },

  keep:function(){
    wx.showToast({  
      title: '保存成功',  
      icon: 'success',  
      duration: 2000  
    })  
    var todolist  = this.data.todolist
    var  completedList = this.data.completedList
    this.setData({
      todolist:todolist,
      completedList:completedList
    })
    console.log(todolist)
    console.log(completedList)
    this.data.list = (this.data.todolist).concat(this.data.completedList)
    this.setData({
      list:this.data.list
    })
    console.log(this.data.list)

    var that = this;
    wx.request({
      url:'http://49.234.222.174:2292/myplan/createmyplan', 
      header: { 
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      // data: this.data.user,
      data:{
        uid:that.data.inputUid,
        plan:JSON.stringify(that.data.list),
      },
      method: 'post',
      success: function (res) {
            console.log("成功");
            console.log(res);
            console.log(that.data.list)
            console.log(res.data)
            that.setData({
                  itemslist: res.data,
                  todolist:res.data.filter(item => item.state == false),
                  completedList:res.data.filter(item => item.state == true),
            })
                console.log(that.data.itemslist)
                console.log(that.data.todolist)
                console.log(that.data.completedList)
            
      }
  
    })

  }

})
// pages/declare/declare.js
const linkageList =['新郎誓词','新娘誓词']

const types = [
  {
    id:1,
    type1:(     
      'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcRVS3oolRmXW6Og*SrkQlt4uvd6AXRy0cexz8MUOMjZ01bSnk2Q4zktGfXLySfdrfdI8aM8SoabVNt0q0ZW85YM!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
    //  '亲爱的：\n不管是现在、\n将来、\n还是永远，\n我都会一直陪着你\n一直守护你，\n不离不弃、\n终生相伴。\n我爱你！' 
    ),
    type2:( 
     'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcbhCu1xCHmwJwU4go.24oG8rjv95Cy0gpuL7pC6s0LA1FF*GMKE.AfnWv5RfBgXYXEuj0AdZjj93kqsFcAkiNvM!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
      // '我娶你，做我的妻子。我愿对你承诺，从今天开始，无论是富有或贫穷，健康或疾病，我将永远爱你、珍惜你直到地老天长。我承诺我将对你永远忠实。'
      ),
    type3:(
      'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcRVS3oolRmXW6Og*SrkQlt68MlZtPsi5THhnuZ3KoVuX9ZYun5b6nAk7kJkl4imqR1un62lKA7DxM3CJ5m5hzmw!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
      //  '我们自愿结为夫妻，从今天开始，我们将共同肩负起婚姻赋予我们的责任和义务：上孝父母，下教子女，互敬互爱，互谅互让，相濡以沫，钟爱一生!'
    ),
    type4:( 
      'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcRVS3oolRmXW6Og*SrkQlt5Zuy6xljVEvt2hWCiSki3hDN8KZ39j8fRiOMUpxFcG66kvNlIDQvwNoMOXXhw2k7E!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
      // '在而立之年，我们从不同的城市相会在此， 你从茫茫人海中选择了我，我感到十分幸运。亲爱的，我会尽我所能，在今后的生活中让你成为很幸福的女人!'
      ),
    type5:(
      'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcbhCu1xCHmwJwU4go.24oG9gU4mfRUxOSyK0zgv2lDBqmw8O2uftxLe4OqeIaNESuu7c9d8NgCGe0CdhWUwA2Cw!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
      //  '谢谢你让我走进你的生命，做你的爱人，今天你要嫁给我了，从这一刻起，我将更加珍惜我们的缘分，爱你，呵护你，你永远是我生命中唯一珍爱的伴侣。'
    ),
    type6:(
      'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcbhCu1xCHmwJwU4go.24oG8g8fyKSgJZLwqsavrOA3r1Yel3nDxvTszOvehRRmwjF*ZHphoBdOQkV*4KlKyaVT4!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
      //  '从相识相知到相守，一起走过的日子都历历在目，是那么的美好与温暖。今后，我会更珍惜你，疼爱你，守护你，直至白首，儿孙绕膝，仍携手相依！'
       )
  },
  {
    id:2,
    type1:( 
      'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcbhCu1xCHmwJwU4go.24oG.RFYcbPVCGpIo5Uu3EGzvFbXOMJqCguz4LurX7tMywAfW1EuQBB7vFJXCKW7HH7Kg!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
    //'亲爱的，虽然你没有万贯的家财，没有华丽的语言，但我知道你是真心爱我的，今生今世不管是艳阳满天，还是刮风下雨，我相信我们会一直走下去，永不分离！'
    ),
    type2:( 
      'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcZcRFaEKsWLBVwUYg*kpgkUjlTD8juewLwxOxX6NGeHaAa8JLt14D*TSuIpnsz1FOP8QCdNPkdTfCL.iEK*dbRE!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
     // '谢谢你愿意走进我的生命，做我的爱人。谢谢你这一路走来，太多的包容、安慰、用心与支持，你永远是我生命中最精彩的那个人，我会与你携手同行！'
      ),
      type3:( 
        'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcZcRFaEKsWLBVwUYg*kpgkXuDuGTGDFCZeyp8KHSw.HlY84BY.mx8bspwBeG0Ln490DCzk8Q2pW9aoaKLwk9tLA!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
        //'与你相识的三年，是我一生中度过得最美丽的三年。今天在所有关心、爱护我们的亲朋地见证下，我谨立如下誓言：我愿将自己的一生交付给你，成为你的妻子！'
        ),
      type4:( 
        'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcZcRFaEKsWLBVwUYg*kpgkWW6uUo6yVcnILXMaRKKyGzokws3DBQdWQeKGwFmCIXXTF6Yg4lrKv1jPVnhMY4*ho!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
        //'我(新娘名)接受你(新郎名)成为我的合法丈夫，从今以后永远拥有你，无论环境是好是坏，是富贵是贫贱，是健康是疾病，我都会爱你，尊敬你并且珍惜你！'
        ),  
      type5:( 
       'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcZcRFaEKsWLBVwUYg*kpgkUCAo.5.0HEn6GjKA6pHOzB.En1K*3LHBQzSsC8gUQo*laHfS8MU9Ud7UAu3gl*fM0!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
        //'感谢你成为我生命中的挚爱，成为我的唯一，分享我所有的梦想、渴望、蓝图、冒险，以及更多的一切，感谢你成为我今后生命中的伴侣，爱你，永远!永远!'
        ),  
      type6:( 
        'https://m.qpic.cn/psc?/V51gGRBp3f1Y6e2WYQCi2qIqIj05OBnb/45NBuzDIW489QBoVep5mcROYY2rJYNYlNBERvut3xpeJBIGsWMTFz84P3BbkbFRpyneYsiGwrMTHXGyVVQmaiCdO1jfcazsxeU6PEzm9AiU!/b&bo=gASAB4AEgAcBGT4!&rf=viewer_4'
       // '我一生中从没有过什么誓言，此刻面对着大家，我决定做出最重要的誓言。(新郎名字) ，在以后的漫漫人人生，不论会发生什么,我发誓永远陪伴着你。'
        ),  
  }
   
]


Page({

  /**
   * 页面的初始数据
   */
 
  data: {
    list: linkageList,
    type:types,
    curIndex: 0,
    scrollLefts: 0,
    duration:300
   },
   
   // 导航栏滑动
   tabNav(e) {
    let index = e.target.dataset.index;
    this.setData({
     curIndex: index,
     scrollLefts: (index - 2) * 65
    })
   },
   // 内容滑动
   changeScroll(e) {
    //let index = e.target.dataset.index;
    let index = e.detail.current;
    this.setData({
     curIndex: index,
     scrollLefts: (index - 2) * 65
    })

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
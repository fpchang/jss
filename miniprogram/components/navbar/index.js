// components/navbar/index.js
const App = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    pageName:String,
    // 页面类型，0 非主页，1，首页，2 子页
    pageType:{
      type:Number,
      value:2
    },
    isHome: {
      type: Boolean,
      value: false
    },
    showNav: {
      type: Boolean,
      value: true
    },
    //最底色{一层}
    bottomBgColor:{
      type: String,
      value: '#fff'
    },
    //背景色{二层}
    bgColor:{
      type: String,
      value: 'rgb(188,201,231)'
    },
    iconColor:{
      type: String,
      value: '#000'
    },
    opacity:{
      type:Number,
      value:1
    },
    position:{
      type: String,
      value: 'relative'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: App.globalData.navHeight,
    navTop: App.globalData.navTop
  },
  lifetimes: {
    attached: function () {
  
     },
     ready(){
      App.initNav();
      this.setData({
        navHeight: App.globalData.navHeight,
        navTop: App.globalData.navTop
      })
     }    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //回退
    _navBack: function () {
      if(this.data.opacity<0.3){
        return;
      }
      wx.navigateBack({
        delta: 1
      })      
    },
    //回主页
    _toIndex: function () {
      if(this.data.opacity<0.3){
        return;
      }
      // wx.reLaunch({
      //   url: '/pages/carControl/carControl',
      // })
    },
    _toMine:function(){
      if(this.data.opacity<0.3){
        return;
      }
      // wx.navigateTo({
      //   url: '/pages/mine/mine',
      // })
    }
  }
})

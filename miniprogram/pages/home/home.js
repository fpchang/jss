// pages/home/home.js
const computedBehavior = require("miniprogram-computed").behavior;
const createRecycleContext = require('miniprogram-recycle-view')
let app =getApp();
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    active:1,
    images: ['demo-text-1', 'demo-text-2', 'demo-text-3','demo-text-1', 'demo-text-2']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  computed:{
   
      navbarOpacity(data) {
        app.initNav();
        if (data.scrollTop > app.globalData.navHeight && app.globalData.navHeight > 0) {
          return 0;
        }
        return (1 - data.scrollTop / app.globalData.navHeight);
      },
      navbarAreaHeight(data) {
        let h = app.globalData.navHeight - data.scrollTop;
        return (h > 0 ? h : 0) + 'px';
      },
      navbarHeight(data) {
        let h = app.globalData.navHeight;
        return h + 'px';
      },
  
  },
  getRoom(){
    wx.cloud.database().collection("room").get().then(res=>{
      console.log(res.data)
    })
  },
  scrollEvent(e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    })
  },
  onScrollRefresh(e) {
    if (e.detail.dy < 100 || this.data.loading) {
      this.setData({
        triggered: false
      })
      return;
    }
    this.onPullDownRefresh();
  }
})
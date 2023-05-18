// pages/home/home.js
import DBconnection from '../../api/DB';
import SlideShow from './js/slideShow';
const computedBehavior = require("miniprogram-computed").behavior;
const createRecycleContext = require('miniprogram-recycle-view');
//const DBconnection = new DB();
let app =getApp();
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    active:0,
    slideShowList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getRoom();
    SlideShow.getSlideShow().then(res=>{
      this.setData({slideShowList:res.data})
    })
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
  async getRoom(){
    // wx.cloud.database().collection("room").get().then(res=>{
    //   console.log(res.data)
    // })
   // console.log("2222222222222",DB)
    await DBconnection.getCollection("room").then(res=>{
      console.error("999999999999999999",res);
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
  },
  menuOnChange(e){
    this.setData({ active: e.detail });
  }
})
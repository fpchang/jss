// pages/home/mapLocation/mapLocation.js
import {miniConfig} from '../../../config/miniConfig';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:{
      latitude: 30.554341,
      longitude: 119.872558,
      locationUpdateTime_Zn:"",
      recommend:""
    },
    mapKey:miniConfig.mapKey,
    recommend:"",
    markers: [{
      id:100,
      title:"见山舍",
      label:{
        content:"浙江省湖州市德清县莫干山镇北湖村上下庄一号",
        fontSize:'32rpx',
        color:'#b15a1f',
        anchorX:-170 ,
        
        bgColor:'#b15a1f90',
        borderColor:'#000',
        padding:'8rpx',
        borderRadius:'12rpx'
        
      },
      latitude: 30.554341,
      longitude: 119.872558,
      iconPath: '../../../static/images/location-red.svg'
    }]
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
    return {
      path:"pages/home/home",
      imageUrl:"cloud://cloud1-7gj1lfpl09ab4ceb.636c-cloud1-7gj1lfpl09ab4ceb-1318104045/images/barner/s1.jpg"
    }
  },
  navback(){
    wx.navigateBack();
  }
})
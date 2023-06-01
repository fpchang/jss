// pages/home/homeDetail/homeDetail.js
import DB from '../../../api/DB';
import psEvent from '../../../api/psEvent';
import {
  CF
} from '../../../utils/CF';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room_id:'',
    roominfo:{},
    roomImgsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(9999,options)
    this.setData({room_id:parseInt(options['room_id'])});
    this.data.room_id&&this.getRoomImages();
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
  navback(){
    wx.navigateBack();
  },
  getRoomImages() {
    DB.getCollection("roomType", {
      _id: this.data.room_id
    }).then(res => {
      console.log("dddd", res,[res.data[0].imgs.first,...res.data[0].imgs.normal])
      res.data.length&&this.setData({
        roominfo:res.data[0],
        roomImgsList: [res.data[0].imgs.first,...res.data[0].imgs.normal]
      })
    })
  }
})
// pages/management/createOrder/createOrder.js
const computedBehavior = require("miniprogram-computed").behavior;
import {valid} from '../../../utils/valid';
import { API } from '../orderAPI';
Page({

  /**
   * 页面的初始数据
   */
  behaviors: [computedBehavior],
  data: {
    showSelectDate: false,
    source:"1",
    dateRange: [],
    radio: 0,
    userName:'',
    phone:'',
    roomSelectList:[],
    orderItem:{}
  },
computed:{
  commitButtonDidabled(data){
    return !valid.required(data.userName)|| !valid.required(data.dateRange[0])
  },
  dateRangeFormat(data){
    if(!data.dateRange[0]){
      return '-';
    }
    return`${new Date(data.dateRange[0]).Format("MM/dd")}-${new Date(data.dateRange[1]).Format("MM/dd")}`
  }
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
  onDisplay() {
    this.setData({
      showSelectDate: true
    });
  },
  onClose() {
    this.setData({
      showSelectDate: false
    });
  },
  
  onConfirm(event) {
    console.log(event);
    const [start, end] = event.detail;
    let startTime = new Date(start).getTime();
    let endTime = new Date(end).getTime();

    this.setData({
      showSelectDate: false,
      dateRange:[startTime,endTime]
    });
  },
  onChange(event) {
    console.log(event)
    this.setData({
      source: event.detail,
    });
  },
  userNameChange(event) {
    this.setData({
      userName: event.detail,
    });
  },
  roomChange(event){
    console.log(event)
    this.setData({
      roomSelectList: event.detail,
    });
  },
  onClickLeft() {
    console.error(333);
    wx.navigateBack();
  },
  commitOrder(){
    if(!valid.required(this.data.userName)||!valid.required(this.data.dateRange[0])){
      return;
    }
    let item ={
      createTime: new Date().getTime(),
      romeId: this.data.romeId,
      roomArray:this.data.roomSelectList,
      userName: this.data.userName,
      checkInStartDateTimeStamp: this.data.dateRange[0],
      checkInEndDateTimeStamp:  this.data.dateRange[1],
      checkInStartDate: new Date(this.data.dateRange[0]).Format('yyyy/MM/dd'),
      checkInEndDate: new Date(this.data.dateRange[1]).Format('yyyy/MM/dd'),
      phone: this.data.phone,
      orderSource: this.data.source,
      orderSouce_Zn: API.orderSource[this.data.source],
      orderStatus: 0
    }
    console.log(item);
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

  }
})
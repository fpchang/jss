// pages/management/createOrder/createOrder.js
import DB from '../../../api/DB';
import Notify from '@vant/weapp/notify/notify';
const computedBehavior = require("miniprogram-computed").behavior;
import {
  valid
} from '../../../utils/valid';
import {
  API
} from '../orderAPI';
Page({

  /**
   * 页面的初始数据
   */
  behaviors: [computedBehavior],
  data: {
    roomIdList: ["201", "202", "203", "204", "301", "302", "303"],
    validRoomIdList:[],
    showSelectDate: false,
    source: "1",
    dateRange: [],
    radio: 0,
    userName: '',
    phone: '',
    wxName: '',
    downPayment:0,
    accountSum:0,
    mark:"",
    roomSelectList: [],
    orderItem: {}
   
  },
  computed: {
    commitButtonDidabled(data) {
      return !valid.required(data.userName) || !valid.required(data.dateRange[0])
    },
    dateRangeFormat(data) {
      if (!data.dateRange[0]) {
        return '-';
      }
      return `${new Date(data.dateRange[0]).Format("MM/dd")}-${new Date(data.dateRange[1]).Format("MM/dd")}`
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

  onDateSelectConfirm(event) {
    const [start, end] = event.detail;
    let startTime = new Date(start).getTime();
    let endTime = new Date(end).getTime();

    this.setData({
      showSelectDate: false,
      dateRange: [startTime, endTime]
    });
    this.getValidOrder();
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
  roomChange(event) {
    console.log(event)
    this.setData({
      roomSelectList: event.detail,
    });
  },
  onClickLeft() {
    wx.navigateBack();
  },
  getValidOrder() {
    wx.showLoading({
      title: '查询中',
    });
    
    const _ = wx.cloud.database().command;
    console.error(this.data.dateRange[0],this.data.dateRange[1]);
    // DB.getCollection("order",{
    //   "checkInStartDateTimeStamp": _.lt(this.data.dateRange[1]),
    //   "checkInEndDateTimeStamp": _.gte(this.data.dateRange[1])
    // }).then(res => {
    //      console.log("查询结果", res);
    //     wx.hideLoading();
    //    })
   DB.getCollection("order", _.or([
      //开始日期在区间内
      {
        "orderStatus":0,
        "checkInStartDateTimeStamp": _.lte(this.data.dateRange[0]),
        "checkInEndDateTimeStamp": _.gt(this.data.dateRange[0])

      }
      ,
      //结束日期在区间内
      {
        "orderStatus":0,
        "checkInStartDateTimeStamp": _.lt(this.data.dateRange[1]),
        "checkInEndDateTimeStamp": _.gte(this.data.dateRange[1])
      },
      //日期区间包含已有订单区间
      {
        "orderStatus":0,
        "checkInStartDateTimeStamp": _.gte(this.data.dateRange[0]),
        "checkInEndDateTimeStamp": _.lte(this.data.dateRange[1])
      }
    ])).then(res => {
      let ar = res.data.map(item=>item.roomArray).flat();
      ar=(Array.from(new Set(ar))).sort();
      let validarr = this.data.roomIdList.filter(el=>!ar.includes(el));
      console.log("查询结果",ar,validarr);
      this.setData({
        validRoomIdList:(Array.from(new Set(validarr))).sort()
      });
      wx.hideLoading();
    })
  },
  commitOrder() {
    if (!valid.required(this.data.userName) || !valid.required(this.data.dateRange[0])) {
      return;
    }
    wx.showLoading();
    let item = {
      createTime: new Date().getTime(),
      romeId: this.data.romeId,
      roomArray: this.data.roomSelectList,
      userName: this.data.userName,
      wxName: this.data.wxName,
      checkInStartDateTimeStamp: this.data.dateRange[0],
      checkInEndDateTimeStamp: this.data.dateRange[1],
      checkInStartDate: new Date(this.data.dateRange[0]).Format('yyyy/MM/dd'),
      checkInEndDate: new Date(this.data.dateRange[1]).Format('yyyy/MM/dd'),
      phone: this.data.phone,
      orderSource: this.data.source,
      orderSouce_Zn: API.orderSource[this.data.source],
      orderStatus: 0,
      downPayment:this.data.downPayment,
      accountSum:this.data.accountSum,
      mark:this.data.mark
    }
    DB.insertData("order",item).then(res=>{
      wx.hideLoading();
      Notify({ type: 'success', message: '创建成功' });
      wx.navigateBack();
    }).catch(er=>{
      wx.hideLoading();
      Notify({ type: 'danger', message: '创建失败' });
      
    })
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
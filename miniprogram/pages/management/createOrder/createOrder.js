// pages/management/createOrder/createOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSelectDate: false,
    source:"1",
    date: '',
    radio: 0,
    roomSelectList:[]
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
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    console.log(event);
    const [start, end] = event.detail;
    let startTime = new Date(start).getTime();
    let endTime = new Date(end).getTime();

    this.setData({
      showSelectDate: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },
  onChange(event) {
    console.log(event)
    this.setData({
      source: event.detail,
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
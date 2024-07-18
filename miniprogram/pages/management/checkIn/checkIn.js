// pages/management/checkIn/checkIn.js
import {
  CF
} from '../../../utils/CF';
import DB from '../../../api/DB';
const computedBehavior = require("miniprogram-computed").behavior;
Page({

  /**
   * 页面的初始数据
   */
  behaviors: [computedBehavior],
  data: {
    popuJson:{
      balancePayment:0,
      mark:""
    },
    showPopu:false,
    roomIdList: ["201", "202", "203", "204", "301", "302", "303"],
    checkInOrderList: [],//[{
    //     createTime: 111,
    //     romeId: "201",
    //     roomArray:["201","202"],
    //     userName: "张三",
    //     checkInStartDateTimeStamp: 1720108800000,
    //     checkInEndDateTimeStamp: 1720281600000,
    //     checkInStartDate: "2024-07-05",
    //     checkInEndDate: "2024-07-07",
    //     phone: "13900991112",
    //     orderSource: 1,
    //     orderSouce_Zn: "携程",
    //     orderStatus: 0
    //   },
    //   {
    //     createTime: 222,
    //     romeId: "202",
    //     roomArray:["203","204"],
    //     userName: "sbli",
    //     checkInStartDateTimeStamp: 1720368000000,
    //     checkInEndDateTimeStamp: 1720454400000,
    //     checkInStartDate: "2024-07-08",
    //     checkInEndDate: "2024-07-09",
    //     phone: "13900991112",
    //     orderSource: 1,
    //     orderSouce_Zn: "携程",
    //     orderStatus: 0
    //   },

    // ],
  },
  computed: {
    dateList(data) {
      if (!data.checkInOrderList.length) {
        return [];
      }
      let datelistAll = [];
      for (let i = 0; i < data.checkInOrderList.length; i++) {
        let item = data.checkInOrderList[i];
        let timeDay = item.checkInEndDateTimeStamp - item.checkInStartDateTimeStamp; //时间差
        if (timeDay == 1000*60*60*24) {
          datelistAll.push(item.checkInStartDateTimeStamp);
          continue;
        }

        let dayNum = Math.round(timeDay / (1000 * 60 * 60 * 24));
        for (let j = 0; j < dayNum; j++) {
          datelistAll.push(item.checkInStartDateTimeStamp + j * 1000 * 60 * 60 * 24);
        }
      }
      datelistAll = (Array.from(new Set(datelistAll))).sort();
      return datelistAll;
    },
    dateListFormat(data) {
      let dyStr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      return data.dateList.map((item) =>{
        return {de:new Date(item).Format("MM-dd"),dy:dyStr[new Date(item).getDay()]}
      } )
    },
    getFormatTableList(data) {
      if (!data.dateList.length) {
        return;
      }
      let ar = {};
      //根据房间分类
      for (let i = 0; i < data.roomIdList.length; i++) {
        let key = data.roomIdList[i];
        let fil = data.checkInOrderList.filter(item => item.roomArray.includes(key));
        ar[data.roomIdList[i]] = fillObject(fil);
      }

      function fillObject(filArray) {
        let tempArray = data.dateList;
        let targetArray = [];
        for (let j = 0; j < tempArray.length; j++) {
          let ob = filArray.find(item => item.checkInStartDateTimeStamp <= tempArray[j] && tempArray[j] <item.checkInEndDateTimeStamp);
          let dataObj = ob ? Object.assign({ 
            isBalancePayment:(ob['accountSum']-ob['downPayment'])>0,          
            isContinueCheckIn:(ob.checkInEndDateTimeStamp-ob.checkInStartDateTimeStamp)>1000*60*60*24,//是否连住
          } ,ob): {
            userName: null
          };
          targetArray.push(dataObj);
        }
        return targetArray;
      }
      return ar;
    },
    arr(data) {
     // return JSON.stringify(data.getFormatTableList["201"]);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.getValidOrder();
  },
  getValidOrder() {
    wx.showLoading({
      title: '查询中',
    });
    const _ = wx.cloud.database().command;
   DB.getCollection("order",
      //开始日期在区间内
      // {
      //   "orderStatus":0,
      //   "checkInStartDateTimeStamp": _.gte(new Date().getTime()-1000*60*60*24)

      // }
      `orderStatus==0&&(checkInStartDateTimeStamp>${new Date().getTime()-1000*60*60*24}||checkInEndDateTimeStamp>${new Date().getTime()})`
     ).then(res => {
      this.setData({checkInOrderList:res.data});
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    //this.getFormatTableList();
  },
  formatH(timestamp) {
    return 11 // new Date(timestamp).Format("MM-dd");
  },
  // getFormatTableList(){
  //   if(!this.data.dateList){
  //     return;
  //   }
  //   let ar={};
  //   for(let i =0;i<this.data.roomIdList;i++){
  //       let key =this.data.roomIdList[i];
  //       let array=[];
  //       let fil = this.data.checkInOrderList.filter(item=>item.romeId==key);
  //       array.push(fillObject(fil));
  //       ar[roomIdList[i]]=array;
  //   }

  //   function fillObject(filArray){
  //     let tempArray =this.data.dateList;
  //     let targetArray=[];
  //     for(let j =0 ;j<tempArray.length;j++){
  //       for(let k =0;k<filArray.length;k++){
  //         if(filArray[k].checkInStartDateTimeStamp<=tempArray[j]<=tempArray[k].checkInEndDateTimeStamp){
  //           targetArray.push(filArray[k]);
  //           continue;
  //         }
  //         targetArray.push({roomId:tempArray[j],userName:0});
  //       }
  //     }
  //   }
  //   console.warn("组合数据",ar)
  // },
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
  onClickLeft() {
    wx.navigateBack();
  },
  showDetail(e){
    console.log(e.target.dataset.detail)
    let ob= e.target.dataset.detail;
    if(!ob.isBalancePayment){
      return;
    }
    this.setData({
      showPopu:true,
      popuJson:{
     
      balancePayment:ob['accountSum']-ob['downPayment'],
      mark:ob.mark
    }})
  },
  onClose() {
    this.setData({ showPopu: false });
  }
})
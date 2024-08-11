// pages/management/checkInShowCard/checkInShowCard.js
import DB from '../../../api/DB';
const computedBehavior = require("miniprogram-computed").behavior;
import {CF} from '../../../utils/CF';
Page({

  /**
   * 组件的属性列表
   */
  behaviors: [computedBehavior],
  properties: {

  },

  
  data: {
    checkInOrderList:[]
  },
  computed:{
    curDateStr(data){
      let dyStr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      return `${new Date().Format("yyyy-MM-dd")} ${dyStr[new Date().getDay()]}`
    },
    orderListFormat(data) {
      let dyStr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      let formatList = data.checkInOrderList.map((item) =>{
        let dayx = (item.checkInEndDateTimeStamp-item.checkInStartDateTimeStamp)/(1000*60*60*24);
        let newObj ={
          des:new Date(item.checkInStartDateTimeStamp).Format("MM-dd"),
          dee:new Date(item.checkInEndDateTimeStamp).Format("MM-dd"),
          dayx:dayx,
          dy:dyStr[new Date(item.checkInStartDateTimeStamp).getDay()]
        }
       return  Object.assign(item,newObj); 
      }       
      )
      return formatList;
    },
  },
  onLoad(options) {
    this.getValidOrder();
  },

  
  getValidOrder() {
    wx.showLoading({
      title: '查询中',
    });
    DB.getCollectionGroupBy("order",
      //开始日期在区间()
      `orderStatus==0&&(checkInStartDateTimeStamp>${new Date().getTime()-1000*60*60*24}||checkInEndDateTimeStamp>${new Date().getTime()})`,"checkInStartDateTimeStamp","asc"

    ).then(res => {
      this.setData({
        checkInOrderList: res.data
      });
      wx.hideLoading();
    })
  },
  deleteOrder(e){
    
    let orderitem =e.currentTarget.dataset.item;
    console.log(orderitem)
    wx.showModal({
      title: '是否取消此订单',
      content: '取消后不可恢复',
      success: async (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          console.log("取消")
         
        await  DB.update("order",`${orderitem._id}`,{orderStatus:5});
        console.log("取消成功");
        this.getValidOrder();
        }
      }
    })
  },
  onClickLeft(){
    wx.navigateBack();
  }
})
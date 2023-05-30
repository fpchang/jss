// pages/home/components/roomReservationComponent/roomReservationComponent.js
import DB from '../../../../api/DB';
import psEvent from '../../../../api/psEvent';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    roomTypeList:[]
  },
  created(){
    this.getRoomTypeList()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getRoomTypeList(){
      DB.getCollection("roomType").then(res=>{
        console.warn(res)
        this.setData({roomTypeList:res.data})
      })
    }
  }
})

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
    roomTypeList:[],
    foodList:[
      {name:"kafei",name_Zn:"咖啡",imgs:["foods/kafei.jpg","foods/kafei.jpg","foods/kafei.jpg"]},
      {name:"yinliao",name_Zn:"饮料",imgs:["foods/kele.jpg","foods/xuebi.jpg","foods/kafei.jpg"]}
    ]
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

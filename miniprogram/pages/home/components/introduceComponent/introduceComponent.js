// pages/home/components/introduceComponent.js
import DB from '../../../../api/DB';
import psEvent from '../../../../api/psEvent';
import {CF} from '../../../../utils/CF';
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
    slideShowList: []
  },
  created() {
    this.getSlideShow();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getSlideShow() {
      DB.getCollection("slideShow").then(res => {
        console.warn(res)
        this.setData({
          slideShowList: res.data
        })
      })
    },
 
    toMap:CF.throttle(function (e) {
      console.log(2222);
      wx.navigateTo({
        url:'./homeDetail/homeDetail'
      })
    },3000)
  }
})
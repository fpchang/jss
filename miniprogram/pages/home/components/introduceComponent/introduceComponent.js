// pages/home/components/introduceComponent.js
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
        this.setData({
          slideShowList: res.data
        })
      })
    }
  }
})
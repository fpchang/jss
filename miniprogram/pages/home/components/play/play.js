// pages/home/components/play/play.js
import DB from '../../../../api/DB';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  created(){
    this.getPlayList();
  },
  
  data: {
    cloudImgsrc:getApp().globalData.imgSrc,
    playList:[
    
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPlayList(){
      DB.getCollection('play').then(res=>{
        console.log("playlist",res)
        this.setData({
          playList:res.data
        })
      })
    }
  }
})

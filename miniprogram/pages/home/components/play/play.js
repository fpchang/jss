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
    playList:[
      // {
      //   name:"营火虫基地",
      //   name_En:"fireworm",
      //   name_Zn:"营火虫基地",
      //   distance:50,
      //   distance_unit:'m',
      //   image:"cloud://cloud1-7gj1lfpl09ab4ceb.636c-cloud1-7gj1lfpl09ab4ceb-1318104045/images/play/yinghuochun.jpg"
      // }
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

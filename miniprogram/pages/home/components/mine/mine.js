// pages/home/components/mine/mine.js
import DB from '../../../../api/DB';
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
    openid:'',
    userInfo:{}
  },
  created(){
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loginState(){
     this.setData({userInfo:this.getUserInfoFromStorage()})
    },
    // loginEvent(e) {
    //   console.log(e)

    // },
    toLogin:CF.throttle(function(e){
      wx.showLoading();
      let that =this;
       wx.getUserProfile({
        desc: '用于完善会员资料', 
        success: async (res) => {
          console.warn("111",res);
          let userInfo_a=res.userInfo;
          let openId= await this.getOpenid();
          console.log("gr",userInfo_a,openId);
          userInfo_a.openId=openId;
         //查找数据库
         let userInfo_d= (await that.getUserInfoFromDataBaseByOpenId(openId))['data'][0];
         console.log("55555",userInfo_d)
         if(userInfo_d){
           that.setData({userInfo:userInfo_d});
           that.setUserInfoFromStorage(userInfo_d)
           wx.hideLoading();
           return;
         }
         //没有数据则进行添加数据
         this.insertUserInfoToDataBase(userInfo_a);
        }
      })
    },2000),
    getOpenid() {
      return new Promise((resolve,reject)=>{
        wx.cloud.callFunction({
          name: 'quickstartFunctions',
          data: {
            type: 'getOpenId'
          },
          complete: res => {
            console.log('云函数获取到的openid: ', res);
            resolve(res.result.userInfo.openId)
          }
        })
      })
     
    },
    insertUserInfoToDataBase(userInfo_a){
      console.log("数据库插入数据")
    },
     getUserInfoFromDataBaseByOpenId(openId){      
     return  DB.getCollection('customer',{openId:openId});

    },
    setUserInfoFromStorage(userInfo){
      wx.setStorageSync('userInfo', userInfo);
    },
    getUserInfoFromStorage(){
      return wx.getStorageSync('userInfo')||{};
    },
    

  }
})
// pages/home/components/mine/mine.js
import DB from '../../../../api/DB';
import {CF} from '../../../../utils/CF';
import customer from '../../../../dataBase/customer';
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
  ready(){
    this.loginState();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loginState(){
     this.setData({userInfo:this.getUserInfoFromStorage()})
    },

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
          this.setData({openId:openId});
         //查找数据库
         let userInfo_d= (await that.getUserInfoFromDataBaseByOpenId(openId))['data'][0];
         console.log("55555",userInfo_a,userInfo_d)
         if(userInfo_d){
           that.setData({userInfo:userInfo_d});
           that.setUserInfoFromStorage(userInfo_d);
           wx.hideLoading();
           return;
         }
         //没有数据则进行添加数据
         await that.insertUserInfoToDataBase(userInfo_a);
         that.setData({userInfo:userInfo_a});
         that.setUserInfoFromStorage(userInfo_a);
         wx.hideLoading();
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
     insertUserInfoToDataBase(userInfo){
      console.log("数据库插入数据",userInfo);
      let cs = new customer();
      cs.setCustomer(userInfo);
      console.log("insert a customer",cs.getCustomer(),JSON.stringify(cs.getCustomer()));
      return DB.add("customer",cs.getCustomer());
    },
     getUserInfoFromDataBaseByOpenId(openId){      
     return  DB.getCollection('customer',{openId:openId});
    },
    setUserInfoFromStorage(userInfo){
      wx.setStorageSync('userInfo', userInfo);
    },
    getUserInfoFromStorage(){
      return wx.getStorageSync('userInfo');
    },
    

  }
})
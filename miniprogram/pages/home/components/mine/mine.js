// pages/home/components/mine/mine.js
const common_vendor = require("../../../../common/vendor.js");
import DB from '../../../../api/DB';
import {CF} from '../../../../utils/CF';
import customer from '../../../../dataBase/customer';
const computedBehavior = require("miniprogram-computed").behavior;
Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    cloudImgsrc:getApp().globalData.imgSrc,
    showWrapper:false,
    showMenu:false,
    openid:'',
    authorize:{},
    userInfo:{}
  },
  created(){

  },
  ready(){
    this.loginState();
    this.getMenuAuthority();
  },
  computed:{
    au_createOrder(data){
      return data.authorize['au']&&(data.authorize['au']['createOrder']['accessAll'] ||data.authorize['au']['createOrder']['access'].includes(data.userInfo.openId));
    },
    au_checkOrder(data){  
      return data.authorize['au']&&(data.authorize['au']['checkOrder']['accessAll'] ||data.authorize['au']['checkOrder']['access'].includes(data.userInfo.openId));
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClickHide(){
      this.setData({showWrapper:false})
    },
    loginState(){
     this.setData({userInfo:this.getUserInfoFromStorage()})
    },
    getMenuAuthority() {
      DB.getCollection("authority").then(res => {
        console.log("authority", res,res.data.find(item=>item.moduleType=="mine"))
        res.data.length&&this.setData({
         authorize:res.data.find(item=>item.moduleType=="mine")
        })
      })
    },
    toLogin:CF.throttle(function(e){
      wx.showLoading();
      let that =this;
       wx.getUserInfo({
        success: async (res) => {
          console.warn("111",res);
          let userInfo_a=res.userInfo;
          let openId= await this.getOpenid();      
          console.log("gr",userInfo_a,openId);
          userInfo_a.openId=openId;
          this.setData({openId:openId});
         //查找数据库
         let userInfo_d= (await that.getUserInfoFromDataBaseByOpenId(openId))['data'][0];
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
    getOpenid(){
      return new Promise((resolve,reject)=>{
        wx.login({
          success: (res) => {
            let secret ="845eff40726dc3624688c347dab12bce";
            console.log("66666666666",res);
           
            common_vendor.Vs.callFunction({
              name:"getOpenId",
              data:{
                code:res.code,
                secret:secret,
                appId:getApp().globalData.appId
              }
            }).then(re=>{
              resolve(re.result.res.data.openid)
            }).catch(er=>{
              reject(er)
            })
            // wx.request({
            //   url:`https://api.weixin.qq.com/sns/jscode2session?appid=${getApp().globalData.appId}&secret=${secret}&js_code=${res.code}&grant_type=authorization_code`,
            //   success:re=>{              
            //     resolve(re.data.openid);
            //   },fail:(error=>{
            //     reject(error);
            //   })
            // })
          },
        })
      })
     
    },
    getOpenidCloud() {
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
    showQrCodeAction(){
      this.setData({showWrapper:true})
    },

    shareJss() {
     
      this.triggerEvent('shareJss');
      },saveQrCode:CF.throttle( function (e) {
        wx.showLoading();
         wx.cloud.downloadFile({
          fileID: `${thiss.data.cloudImgsrc}/images/qrcode/qrcode-pro.png`, // 文件 ID
          success: res => {
            // 返回临时文件路径
            console.log(res.tempFilePath)
            wx.saveImageToPhotosAlbum({
              filePath:res.tempFilePath,
              success(re) {
                wx.hideLoading();
                wx.showToast({
                  title: '保存成功',
                  icon:'success'
                })
               },
               fail(err){
                wx.hideLoading();
                wx.showToast({
                  title: '保存失败',
                  icon:'error'
                })
                
               }
            })
          },
          fail: console.error
        })        
      },3000),

  }
})
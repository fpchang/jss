// pages/home/components/introduceComponent.js
import DB from '../../../../api/DB';
import psEvent from '../../../../api/psEvent';
import {CF} from '../../../../utils/CF';
import {servicesFacilities_data} from './data';
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
    showContact:false,
    introduce:{},
    slideShowList: [],
    servicesFacilities_data:servicesFacilities_data
  },
  created() {
    this.getIntroduce();
    this.getSlideShow();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getIntroduce(){
      DB.getCollection("introduce",{name:'JSS'}).then(res => {
        this.setData({
          introduce: res.data[0]
        })
      })
    },
    getSlideShow() {
      DB.getCollection("slideShow").then(res => {
        this.setData({
          slideShowList: res.data
        })
      })
    },
    toConcat:CF.throttle(function (e) {
      this.setData({showContact:true});
    },1500),
    makePhone(){
      wx.makePhoneCall({
        phoneNumber: '18516285834' //仅为示例，并非真实的电话号码
      })
    },
    toMap:CF.throttle(function (e) {
      console.log(e)
      wx.navigateTo({
        url:'./mapLocation/mapLocation'
      })
    },3000),
    onClickHide(){
      this.setData({showContact:false})
    },
    saveQrCode:CF.throttle( function (e) {
      wx.showLoading();
       wx.cloud.downloadFile({
        fileID: 'cloud://cloud1-7gj1lfpl09ab4ceb.636c-cloud1-7gj1lfpl09ab4ceb-1318104045/images/qrcode/wxskymind.jpg', // 文件 ID
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
      

    return;
      let url ="cloud://cloud1-7gj1lfpl09ab4ceb.636c-cloud1-7gj1lfpl09ab4ceb-1318104045/images/qrcode/wxskymind.jpg";
      wx.downloadFile({
        url:url,//图片地址
        success: function (res) {
          console.log("222",res)
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '您的二维码已保存到相册，赶快识别二维码添加小易进行咨询吧',
                showCancel: false,
              })
            },
            fail: function (err) {
              conole.error(3333,err)
              if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  showCancel: false,
                  success: modalSuccess => {
                    wx.openSetting({
                      success(settingdata) {
                        console.log("settingdata", settingdata)
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限成功,再次点击图片即可保存',
                            showCancel: false,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限失败，将无法保存到相册哦~',
                            showCancel: false,
                          })
                        }
                      },
                      fail(failData) {
                        console.log("failData", failData)
                      },
                      complete(finishData) {
                        console.log("finishData", finishData)
                      }
                    })
                  }
                })
              }
            },
            complete(res) {
              wx.hideLoading()
            }
          })
        },fail(f){
          console.error("f",f)
        }
      })
    },3000),
  }
})
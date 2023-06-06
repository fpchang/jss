// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
         env: 'cloud1-7gj1lfpl09ab4ceb',
        traceUser: true,
      });
    }

    this.globalData = {};
    this.initNav();
    this.initNetWork();
    this.updateVersion();
  },
  initNav() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  initNetWork() {
    wx.onNetworkStatusChange(res => {
      console.log("网络监听变化", res)
      let {
        isConnected,
        networkType
      } = res;
      let diting = new Diting();
      let networkTypeVal = diting.getnetworkTypeValue(networkType)
      // logs.mon("networkReachability", {
      //   uri: 3014,
      //   result: networkTypeVal
      // })
    })
  },
  updateVersion() {
    let that = this;
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("获取新版本", res.hasUpdate);
    })

    updateManager.onUpdateReady(async function () {
      await apiInit.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？'
      }).then(res => {
        that.loginOut();
        updateManager.applyUpdate()
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  globalData: {
    navHeight:0,
    navTop:0,
    windowHeight:0
  }
});

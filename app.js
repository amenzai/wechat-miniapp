//app.js
App({
  onLaunch: function () {
    console.log('onlaunch')
    
    // 判断是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.getUserInfo()
        }
      }
    })
  },
  onShow() {
    console.log('app show')
  },
  onHide() {
    console.log('app hideS')
  },
  getUserInfo() {
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfoObj = res
        this.globalData.userInfo = res.userInfo
        this.getUserInfoCallBack && this.getUserInfoCallBack(res)
      }
    })
  },
  globalData: {
    userInfoObj: null,
    userInfo: null,
  }
})
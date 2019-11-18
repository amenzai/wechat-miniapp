//index.js
//获取应用实例
const app = getApp()
import {
  login
} from '../../api/api.js'
Page({
  data: {
    isAuth: false,
  },
  onLoad() {
    console.log('omload');
    const userInfoObj = app.globalData.userInfoObj
    if (userInfoObj) {
      this.setData({
        isAuth: true
      })
      this._checkKey(userInfoObj)
    } else {
      app.getUserInfoCallBack = (res) => {
        this.setData({
          isAuth: true
        })
        this._checkKey(res)
      }
    }
  },
  onShow() {
    console.log('on show')
  },
  onReady() {
    console.log('on ready')
  },
  onHide() {
    console.log('on hide')
  },
  onUnload() {
    console.log('on unload');
  },
  //事件处理函数
  getUserInfo(res) {
    const userInfo = res.detail.userInfo
    if (userInfo) {
      this.setData({
        isAuth: true
      })
      this._login(res.detail)
    }
  },
  _checkKey(params) {
    const miniappKey = wx.getStorageSync('miniappKey')
    if (!miniappKey) {
      this._login(params)
    }
  },
  _login({
    signature,
    rawData,
    encryptedData,
    iv
  }) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const send = {
          code: res.code,
          signature,
          rawData,
          encryptedData,
          iv
        }
        login(send).then(res => {
          wx.setStorageSync('miniappKey', res.data)
        })
      }
    })
  }
})
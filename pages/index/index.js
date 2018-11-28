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
  onLoad() {
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

  },
  onReady() {},
  _checkKey(params) {
    const miniappKey = wx.getStorageSync('miniappKey')
    if (!miniappKey) {
      this._login(params)
    }
  },
  _login(params) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const send = {
          code: res.code,
          signature: params.signature,
          rawData: params.rawData,
          encryptedData: params.encryptedData,
          iv: params.iv
        }
        login(send).then(res => {
          wx.setStorageSync('miniappKey', res.data)
        })
      }
    })
  }
})
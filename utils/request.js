import config from '../config.js';
import {
  removeEmptyProp
} from './util.js';

const apiBase = config.apiBase
const header = {
  'content-type': config.contentType
}
const duration = 2000

// wx.getStorageSync(key) wx.setStorageSync(key, data) wx.clearStorageSync()

const request = function (method, url, data = {}, type = false) {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token') || ''
    if (!type) {
      data = removeEmptyProp(data, type)
    }
    console.log('send data----', url, data)
    wx.showNavigationBarLoading()
    wx.request({
      method,
      url: `${apiBase}${url}`,
      data: {
        token,
        ...data
      },
      header,
      success: (res) => {
        console.log(res); // res.statusCode === 404 or 502 success {errMsg header statusCode data}
        const data = res.data
        if ( data.code === 200) {
          resolve(data)
        } else {
          wx.showToast({
            title: data.message,
            icon: 'none',
            // mask: true,
            duration
          })
          reject(data)
        }
        console.log('request success----', data)
      },

      fail: (res) => {
        console.log('request fail----', res) // {errMsg}
        const errMsg = res.errMsg
        wx.showToast({
          title: errMsg || '接口异常',
          icon: 'none',
          // mask: true,
          duration
        })
        reject(errMsg)
      },
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
  })
}

export default request
// some notes
function note() {
  // jump
  wx.navigateTo({url: './navigator'})
  wx.navigateBack()
  wx.redirectTo({url: './navigator'})
  wx.switchTab({url: '/page/component/index'})
  wx.reLaunch({url: '/page/component/index'})

  // nav-loading
  wx.showNavigationBarLoading()
  wx.hideNavigationBarLoading()

  // modal
  wx.showModal({
    title: '弹窗标题',
    content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
    showCancel: false,
    confirmText: '确定',
    cancelText: '取消'
  })

  wx.showToast({
    title: '请求成功',
    icon: 'success',
    mask: true,
    duration,
  })
}
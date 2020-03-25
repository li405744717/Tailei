// miniprogram/pages/apartment/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    prePhone: "+86 132 7552",
    nextPhone: null,
    code: null,
    showToast: false,
    resultStatus: 'fail',
    last_second: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  closeToast() {
    this.setData({
      showToast: false
    })
  },
  setInputValue(e) {

    let {key} = e.currentTarget.dataset
    this.setData({
      [key]: e.detail.value
    })
  },
  resetPhone() {
    this.closeToast()
    this.setData({
      nextPhone: null,
      code: null
    })
  },
  next() {
    let status = 'success'
    this.setData({
      showToast: true,
      resultStatus: status
    })

    if (status === 'success') {
      this.turnTimer = setInterval(() => {
        let {last_second} = this.data
        if (last_second === 1) {
          clearTimeout(this.turnTimer)
          this.closeToast()
          wx.navigateTo({
            url: '/pages/apartment/pay/pay'
          })
        }
        this.setData({
          last_second: --last_second
        })
      }, 1000)
    }
  },
  goHome() {
    if (this.turnTimer) {
      clearTimeout(this.turmTimer)
    }
    wx.switchTab({
      url: '/pages/home/home/home'
    })
  }
})
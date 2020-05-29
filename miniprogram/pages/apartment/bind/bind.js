// miniprogram/pages/apartment/bind/bind.js
import userAPI from './../../../commAction/user'
import houseAPI from './../../../commAction/house'

Page({

  /**
   * 页面的初始数据
   */
  data: {

    prePhone: "+86",
    nextPhone: null,
    code: null,
    showToast: false,
    resultStatus: 'fail',
    last_second: 3,
    send_second: 60,
    sendTimer: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.house_id = options.house_id
    this.setData({
      house_id: this.house_id
    })
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
  sendVerify() {
    var {nextPhone, sendTimer} = this.data
    if (sendTimer) return
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(nextPhone))) {
      wx.showToast({
        title: "请输入有效手机号",
        icon: 'none'
      })
      return
    }

    userAPI.check_contact(this.house_id, nextPhone).then(data => {
      if (data.code === 200) {
        userAPI.send_verify(nextPhone).then(data => {
          if (data.detail === '验证码发送成功') {
            this.setData({
              sendTimer: true
            })
            this.sendTimer = setInterval(() => {
              let {send_second} = this.data
              if (send_second === 1) {
                clearTimeout(this.sendTimer)
                this.setData({
                  sendTimer: false,
                  send_second: 60
                })
              }
              this.setData({
                send_second: --send_second
              })
            }, 1000)
          }
          wx.showToast({
            title: data.detail,
            icon: 'none'
          })
        })
      }
    })
  },
  next() {
    var {code, nextPhone} = this.data
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(nextPhone))) {
      wx.showToast({
        title: "请输入有效手机号",
        icon: 'none'
      })
      return
    }
    var status = 'fail'
    houseAPI.bind_house(this.house_id, nextPhone, code).then(data => {
      if (data.code === 200) {
        status = 'success'
      }
      this.setData({
        showToast: true,
        detail: data.detail,
        resultStatus: status
      })
      if (status === 'success') {
        var app = getApp()
        houseAPI.get_my_house_list().then(data => {
          app.globalData.user.house_list = data.data
          app.globalData.user.default_house = data.data[0]
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
        })

      }
    }).catch(e => {
      status = 'error'
      this.setData({
        showToast: true,
        resultStatus: status
      })
    })
  },
  goHome() {
    if (this.turnTimer) {
      clearTimeout(this.turmTimer)
    }
    wx.switchTab({
      url: '/pages/home/home/home'
    })
  },
  refresh() {
    this.resetPhone()
    this.setData({
      showToast: false
    })
  }
})

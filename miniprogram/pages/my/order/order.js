// miniprogram/pages/apartment/order/order.js
import chargeAPI from "../../../commAction/charge";

let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: '业主',
    apartment: {},
    orders: [],
    totalNumber: 0,
    payed: false,
    payStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()

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
  getData() {
    chargeAPI.get_charge_list('done').then(data => {
      this.setData({
        orders: data.data.charges,
        role: data.data.role,
        apartment: data.data.house
      })
    })
  },
  goPay() {
    this.setData({
      payed: true,
      payStatus: true
    })
  },
  rePay() {
    this.setData({
      payed: false
    })
  },
  goHome() {
    wx.switchTab({
      url: '/pages/home/home/home'
    })
  }
})

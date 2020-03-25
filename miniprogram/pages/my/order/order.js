// miniprogram/pages/apartment/order/order.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: '业主',
    apartment: {
      city: {
        province: '江西省',
        city: '南昌市',
        town: '聊城'
      },
      apartment: '东昌首府',
      house: {
        building: '七期住宅-1',
        unit: '20栋',
        room: '2号'
      }
    },
    orders: [
      {id: 1, title: '2020年1月物业费', number: 233, create_time: '2020-02-22',pay_time: '2020-02-22', serialNo: '37876879889',man:'业主'},
      {id: 1, title: '2020年1月物业费', number: 233, create_time: '2020-02-22',pay_time: '2020-02-22', serialNo: '37876879889',man:'父母'},
    ],
    totalNumber: 0,
    payed: false,
    payStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderIdStr = options.orderIdStr || ''
    let orders = orderIdStr.split('_')
    console.log('orders', orders)
    this.setTotalNumber()
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
  setTotalNumber() {
    let {orders, selectAll, totalNumber} = this.data
    totalNumber = 0
    for (let order of orders) {
      totalNumber += order.number
    }
    this.setData({
      totalNumber
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
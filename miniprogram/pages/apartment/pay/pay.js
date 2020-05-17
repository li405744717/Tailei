// miniprogram/pages/apartment/pay/pay.js
let app = getApp()
import chargeAPI from './../../../commAction/charge'

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
      {id: 1, title: '2020年1月物业费', number: 233},
      {id: 2, title: '2020年2月物业费', number: 300},
    ],
    orders2: [],
    isIpX: app.globalData.isIpX,
    selectAll: false,
    totalNumber: 0
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
    chargeAPI.get_charge_list('wait').then(data => {
      this.setData({
        orders: data.data.charges,
        role: data.data.role,
        apartment: data.data.house
      })
    })
  },
  selectOrder(e) {
    let {index} = e.currentTarget.dataset
    let {orders, selectAll} = this.data
    orders[index].selected = !orders[index].selected
    let selectedCount = 0
    for (let order of orders) {
      if (order.selected) selectedCount++
    }
    if (selectedCount === orders.length) {
      selectAll = true
    } else {
      selectAll = false
    }
    this.setData({
      orders,
      selectAll
    }, () => {
      this.setTotalNumber()
    })
  },
  selectAll() {
    let {orders, selectAll} = this.data
    selectAll = !selectAll
    for (let order of orders) {
      order.selected = selectAll
    }

    this.setData({
      orders,
      selectAll
    }, () => {
      this.setTotalNumber()
    })
  },
  setTotalNumber() {
    let {orders, selectAll, totalNumber} = this.data
    totalNumber = 0
    for (let order of orders) {
      if (order.selected) totalNumber += parseFloat(order.charge_fee)
    }
    this.setData({
      totalNumber
    })
  },
  goOrder() {
    let {orders, selectAll, totalNumber} = this.data
    if (totalNumber === 0) {
      return
    } else {
      let selectedOrder = orders.filter(order => {
        return order.selected
      })
      let orderIds = selectedOrder.map((order, index) => {
        return order.charge_id
      })
      let orderIdStr = orderIds.join('_')
      wx.navigateTo({
        url: '/pages/apartment/order/order?orderIdStr=' + orderIdStr
      })
    }
  }
})
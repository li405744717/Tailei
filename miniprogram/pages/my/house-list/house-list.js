// miniprogram/pages/my/house-list/house-list.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpX: app.globalData.isIpX,
    apartments: [
      {
        id: 1,
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
      {
        id: 2,
        city: {
          province: '江西省',
          city: '南昌市',
          town: '聊城'
        },
        apartment: '东昌首府',
        house: {
          building: '七期住宅-1',
          unit: '20栋',
          room: '3号'
        }
      },
      {
        id: 3,
        type: 'car',
        city: {
          province: '江西省',
          city: '南昌市',
          town: '聊城'
        },
        apartment: '东昌首府(车位)',
        house: {
          building: '七期住宅-1',
          unit: '20栋',
          room: '3号'
        }
      },
    ],
    apartmentIndex: 0
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
    this.setData({
      apartments: app.globalData.user.house_list
    })
  },
  selectApartment(e) {
    let {index} = e.currentTarget.dataset
    this.setData({
      apartmentIndex: index
    })
  },
  goInfo(e) {
    let {index, key, item} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/my/house-info/house-info?id=${item.id}`
    })
  },
  next() {
    wx.navigateTo({
      url: '/pages/apartment/add/add'
    })
  }
})

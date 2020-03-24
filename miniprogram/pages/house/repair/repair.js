// miniprogram/pages/house/repair/repair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submited: false,
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
    phone: '13479186301',
    inputValue: null,
    images: [],
    range: [['今天', '明天'], ['尽快上门', "08:30", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00"]],
    selectRange: [0, 0]
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
  setInputValue(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindTimeChange(e) {
    let {range} = this.data
    console.log(e)
    this.setData({
      selectRange: e.detail.value
    })
  },
  addImage() {
    let {images} = this.data
    wx.chooseImage({
      count: 3 - images.length,
      success: (e) => {
        console.log('tempFilePaths', e.tempFilePaths)
        images = images.concat(e.tempFilePaths)
        this.setData({
          images
        })
      }
    })
  },
  goRepairList() {
    wx.navigateTo({
      url: '/pages/house/repair-list/repair-list'
    })
  },
  next() {
    console.log('do submit')
    this.setData({
      submited: true
    })
  },
  goHome(){
    wx.switchTab({
      url: '/pages/home/home/home'
    })
  }
})
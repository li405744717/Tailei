// miniprogram/pages/house/type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      {icon: '/images/icon_house_type_zhuzhai.png', title: '住宅/居民楼', type: 'house'},
      {icon: '/images/icon_house_type_bangonglou.png', title: '办公楼/写字楼/商铺', type: 'work'},
      {icon: '/images/icon_house_type_car.png', title: '停车位', type: 'park'},
    ]
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
  goAdd(e) {
    let {index, item} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/house/add/add?type=' + item.type
    })
  }
})
// miniprogram/pages/house/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [
      '/images/ad_1.png',
      '/images/ad_1.png',
      '/images/ad_1.png',
      '/images/ad_1.png'
    ],
    price: 2500,
    price_type: '半年付',
    title: '整组 | 富力城北区 两室精装全配 航天城到四号地铁口 诚租',
    update_time: '02-22',
    contents: [
      {title: '2室2厅1卫', subTitle: '房型'},
      {title: '84平米', subTitle: '面积'},
      {title: '6层', subTitle: '面积'},
      {title: '南北', subTitle: '朝向'}
    ],
    tags: ['朝南', '有电梯', '精装修'],
    address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
    owner: {
      avatar: '/images/avatar.png',
      name: '张少刚（您的专属租房顾问）',
      phone: '13020555555'
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {type} = options
    if (type === 'car') {
      wx.setNavigationBarTitle({
        title: '车位详情'
      })
    }
    let contents = type !== 'car' ? [
      {title: '2室2厅1卫', subTitle: '房型'},
      {title: '84平米', subTitle: '面积'},
      {title: '6层', subTitle: '面积'},
      {title: '南北', subTitle: '朝向'}
    ] : [
      {title: '28970', subTitle: '车位号'}
    ]
    this.setData({
      type,
      contents
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

  }
})
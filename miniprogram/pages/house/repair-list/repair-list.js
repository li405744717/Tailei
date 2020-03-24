// miniprogram/pages/house/repair-list/repair-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      type: '111',
      type_name: ' 待处理',
      contents: [
        {
          id: 1,
          images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
          remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
          create_time: '02-22'
        },
        {
          id: 2,
          images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
          remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
          create_time: '02-22'
        },
      ]
    },
      {
        type: '222',
        type_name: ' 待支付',
        contents: [
          {
            id: 3,
            images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
            remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
            create_time: '02-22',
            price: 300
          },
          {
            id: 3,
            images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
            remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
            create_time: '02-22',
            price: 240
          },
        ]
      },
      {
        type: '333',
        type_name: ' 已完成',
        contents: [

        ]
      }],
    selectList: 0
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
  selectList(e) {
    let {index} = e.currentTarget.dataset
    this.setData({
      selectList: index
    })
  },
  goPay(e){
    let {item} = e.currentTarget.dataset
    console.log(item)
    wx.navigateTo({
      url: '/pages/house/order/order'
    })
  }
})
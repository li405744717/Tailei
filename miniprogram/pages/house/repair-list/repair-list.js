// miniprogram/pages/house/repair-list/repair-list.js
import repairAPI from './../../../commAction/repair'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      type: 'wait',
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
        type: 'unpaid',
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
        type: 'done',
        type_name: ' 已完成',
        contents: [
          {
            id: 3,
            images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
            remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
            create_time: '02-22',
            complete_time: '02-22',
            price: 240
          }
        ]
      }],
    selectList: 0
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
    repairAPI.get_repair_list().then(data => {
      this.setData({
        list: [{
          type: 'wait',
          type_name: ' 待处理',
          contents: data.data.wait
        },
          {
            type: 'unpaid',
            type_name: ' 待支付',
            contents: data.data.unpaid
          },
          {
            type: 'done',
            type_name: ' 已完成',
            contents: data.data.done
          }],
      })
    })
  },
  selectList(e) {
    let {index} = e.currentTarget.dataset
    this.setData({
      selectList: index
    })
  },
  goPay(e) {
    let {item} = e.currentTarget.dataset
    console.log(item)
    wx.navigateTo({
      url: '/pages/house/order/order'
    })
  }
})
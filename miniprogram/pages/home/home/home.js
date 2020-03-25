// miniprogram/pages/home/home/home.js
import utils from '../../../common/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [
      {
        title: "房屋账单",
        path: "/pages/apartment/pay/pay",
        icon: "/images/icon_menu_bill.png",
      },
      {
        title: "房屋租售",
        path: "/pages/house/list/list",
        icon: "/images/icon_menu_sale.png",
      },
      {
        title: "房屋报修",
        path: "/pages/house/repair/repair",
        icon: "/images/icon_menu_repair.png",
      },
      {
        title: "房屋反馈",
        path: "/pages/suggest/suggest",
        icon: "/images/icon_menu_suggest.png",
      }

    ],
    tip: {
      title: "标题",
      content: "文章内容部分文章内容部分文章内容部分文章内容部分"
    },
    ads: [
      {
        image: "/images/ad_1.png",
        path: "",
        appid: ""
      }
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
    this.getTabBar().setTabBar(0)
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
  goPath(e) {
    console.log(e)
    var {url, source} = e.currentTarget.dataset
    utils.goPage({url, source})
  }
})
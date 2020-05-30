// miniprogram/pages/my/my/my.js
import utils from "../../../common/utils";

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [
      {
        title: "缴费记录",
        subTitle: "一键查询",
        path: "/pages/my/order/order",
        bg_image: "/images/my_jiaofei.png",
      },
      {
        title: "报修记录",
        subTitle: "一键查询",
        path: "/pages/house/repair-list/repair-list",
        bg_image: "/images/my_baoxiu.png",
      },
      {
        title: "我的房源",
        subTitle: "一键查询",
        path: "/pages/house/my/my?from=my",
        bg_image: "/images/my_fangyuan.png",
      },
      {
        title: "邀请家人",
        subTitle: "一键查询",
        path: "/pages/my/invite/invite",
        bg_image: "/images/my_invite.png",
      },
      {
        title: "我的房屋",
        subTitle: "一键查询",
        path: "/pages/my/house-list/house-list",
        bg_image: "/images/my_fangwu.png",
      },
    ],
    userInfo: app.globalData.user.userInfo
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
    this.setData({
      userInfo: app.globalData.user.userInfo,
      apartment: app.globalData.user.default_house
    })
    this.getTabBar().setTabBar(2)
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

  onShareAppMessage: function () {

  },
   */
  goPage(e) {
    console.log(e)
    var {url, source} = e.currentTarget.dataset
    if (!app.globalData.user.default_house && //没有默认房源
      (url !== '/pages/house/my/my?from=my' && url !== '/pages/my/house-list/house-list')) {
      wx.showToast({
        title: "暂无房源,请绑定房源",
        icon: 'none'
      })
      return
    }


    utils.goPage({url, source})
  },
  auth(e) {
    console.log(e)
    this.setData({
      userInfo: app.globalData.user.userInfo,
      apartment: app.globalData.user.default_house
    })
    if (!app.globalData.user.default_house) {
      wx.navigateTo({
        url: '/pages/apartment/add/add'
      })
    }
  }
})

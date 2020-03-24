// miniprogram/pages/my/my/my.js
import utils from "../../../common/utils";

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
      }, {
        title: "我的房源",
        subTitle: "一键查询",
        path: "/pages/house/my/my?from=my",
        bg_image: "/images/my_fangyuan.png",
      }, {
        title: "邀请家人",
        subTitle: "一键查询",
        path: "",
        bg_image: "/images/my_invite.png",
      }, {
        title: "我的房屋",
        subTitle: "一键查询",
        path: "",
        bg_image: "/images/my_fangwu.png",
      },
    ],
    userInfo:{
      avatarUrl:"/images/avatar.png",
      nickname:'DP',
      apartment:"xx xx xx xx-xx-xx"
    }
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
  goPage(e) {
    console.log(e)
    var {url, source} = e.currentTarget.dataset
    utils.goPage({url, source})
  }
})
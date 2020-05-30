// miniprogram/pages/home/home/home.js
import utils from '../../../common/utils'
import houseAPI from "../../../commAction/house";

var app = getApp()
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
        title: "居家报修",
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
      title: null,
      content: ''
    },
    tip2: {
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
    console.log('home onshow')
    let app = getApp()
    this.type = app.globalData.token !== app.globalData.app_token ? app.globalData.app_from : null
    this.invite_house_id = app.globalData.app_from_house_id
    this.relation_type = app.globalData.relation_type
    this.invite_phone = app.globalData.invite_phone
    if (this.type === 'invite') {
      this.getInviteData()
    } else {
      this.setData({
        type: 'home'
      })
    }
    app.globalData.app_from = null
    app.globalData.relation_type = null
    app.globalData.app_from_house_id = null
    app.globalData.invite_phone = null
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
  getInviteData() {
    houseAPI.invitee_house(this.invite_phone).then(data => {
      wx.hideLoading()
      var apartments = data.data || []
      if (apartments.length !== 0) { //有待邀请,才显示
        this.setData({
          type: 'invite'
        })
      }

    }).catch(e => {
      wx.hideLoading()
    })
  },
  goPath(e) {
    console.log(e)
    var {url, source} = e.currentTarget.dataset
    if (!app.globalData.user.default_house && url !== '/pages/apartment/add/add' && url !== '/pages/house/list/list') { //没有默认房源
      wx.showToast({
        title: "暂无房源,请绑定房源",
        icon: 'none'
      })
      return
    }

    utils.goPage({url, source})
  },
  bindInvite() {
    wx.navigateTo({
      url: `/pages/my/house-list/house-list?type=invite&id=${this.invite_house_id}&relation_type=${this.relation_type}&invite_phone=${this.invite_phone}`
    })
  }
})

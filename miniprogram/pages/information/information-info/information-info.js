// miniprogram/pages/information/information-info/information-info.js
import informationAPI from './../../../commAction/information'

var app = getApp()
var WxParse = require('./../../../components/wxParse/wxParse');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpX: app.globalData.isIpX,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var {id} = options
    this.id = id
    if (id) {
      this.getData()
    } else {
      wx.showToast({
        title: '缺少id',
        icon: 'none'
      })
    }

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
    return {
      url: `/pages/information/information-info/information-info?id=${this.id}`
    }
  },
  getData() {
    informationAPI.information_info(this.id).then(data => {
      console.log(data)
      // var content = `<p><strong><span style="font-family: 宋体; font-weight: bold; font-size: 16px; color: rgb(221, 99, 95);">今年两会期间以防御性质为主的稳定风格是唯一录得正收益的风格指数</span></strong><span style="font-family:宋体;font-weight:normal;font-size:16px;">，体现两会期间市场情绪相对4月末财报发布期有所收敛。由于中美贸易摩擦在两会期间有抬头趋势，导致市场交易情绪较会前有所回落，上证综指日均成交额较会前30日减少10%</span></p>`
      var content = data.data.content
      var html_content = WxParse.wxParse('content', 'html', content, this, 5);
      this.setData({
        content: html_content,
        title: data.data.title
      })
    })
  }
})
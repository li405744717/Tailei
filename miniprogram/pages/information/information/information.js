// miniprogram/pages/information/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [
      {
        title: "热点",
        contents: [
          {

            title: "文章标题不超过两行多出部超过两行多出部文章标题不超过两行多出部超过两行多出部",
            content: "文章内容部分文章内容部分文章内容部分文章内容部分……文章内容部分文章内容部分文章内容部分文章内容部分……",
            image: '/images/ad_1.png',
            path: '',
            create_time: "2020年2月22日"
          }
        ]
      },
      {
        title: "每日餐食",
        contents: [
          {

            title: "文章标题不超过两行多出部超过两行多出部文章标题不超过两行多出部超过两行多出部",
            content: "文章内容部分文章内容部分文章内容部分文章内容部分……文章内容部分文章内容部分文章内容部分文章内容部分……",
            image: '/images/ad_1.png',
            path: '',
            create_time: "2020年2月22日"
          }
        ]
      },
      {
        title: "生活小妙招",
        contents: [
          {

            title: "文章标题不超过两行多出部超过两行多出部文章标题不超过两行多出部超过两行多出部",
            content: "文章内容部分文章内容部分文章内容部分文章内容部分……文章内容部分文章内容部分文章内容部分文章内容部分……",
            image: '/images/ad_1.png',
            path: '',
            create_time: "2020年2月22日"
          }
        ]
      },
      {
        title: "xxxxx",
        contents: [
          {

            title: "文章标题不超过两行多出部超过两行多出部文章标题不超过两行多出部超过两行多出部",
            content: "文章内容部分文章内容部分文章内容部分文章内容部分……文章内容部分文章内容部分文章内容部分文章内容部分……",
            image: '/images/ad_1.png',
            path: '',
            create_time: "2020年2月22日"
          }
        ]
      },
      {
        title: "热点",
        contents: [
          {

            title: "文章标题不超过两行多出部超过两行多出部文章标题不超过两行多出部超过两行多出部",
            content: "文章内容部分文章内容部分文章内容部分文章内容部分……文章内容部分文章内容部分文章内容部分文章内容部分……",
            image: '/images/ad_1.png',
            path: '',
            create_time: "2020年2月22日"
          }
        ]
      },
    ],
    selectMenuIndex: 0
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

  selectMenu(e) {
    var {index} = e.currentTarget.dataset
    this.setData({
      selectMenuIndex: index
    })
  }
})
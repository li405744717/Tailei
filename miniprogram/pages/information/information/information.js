// miniprogram/pages/information/information/information.js
import informationAPI from './../../../commAction/information'

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
            content: "文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分……",
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
            content: "文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分……",
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
            content: "文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分……",
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
            content: "文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分文章内容部分……",
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
    this.getTabBar().setTabBar(1)
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
    this.getData(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var {selectMenuIndex, menus} = this.data
    if (!menus[selectMenuIndex].next) {
      this.fetchData(menus[selectMenuIndex].title, menus[selectMenuIndex].page + 1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fetchData(label, page) {
    var {menus, selectMenuIndex} = this.data
    var index = selectMenuIndex
    informationAPI.information_list(label, page).then(data => {
      menus[index].contents = menus[index].contents.concat(data.data)
      menus[index].next = data.next
      menus[index].page = page
      this.setData({
        menus
      })
    })
  },
  getData(refresh) {
    informationAPI.get_information_types().then(data => {
      if (refresh) wx.stopPullDownRefresh()
      var menus = data.data.map(item => {
        return {
          title: item.name,
          contents: []
        }
      })
      this.setData({
        menus
      })
      for (let index in menus) {
        let menu = menus[index]
        informationAPI.information_list(menu.title).then(data => {
          menus[index].contents = data.data
          menus[index].next = data.next
          menus[index].page = 1
          this.setData({
            menus
          })
        })
      }
    }).catch(e => {
      if (refresh) wx.stopPullDownRefresh()
    })
  },
  selectMenu(e) {
    var {index} = e.currentTarget.dataset
    this.setData({
      selectMenuIndex: index
    })
  },
  goPath(e) {
    var {item} = e.currentTarget.dataset
    var id = item.id
    wx.navigateTo({
      url: `/pages/information/information-info/information-info?id=${id}`
    })
  }
})
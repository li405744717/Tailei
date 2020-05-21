// miniprogram/pages/house/my/my.js
let app = getApp()
import houseAPI from './../../../commAction/house'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpX: app.globalData.isIpX,
    list: [
      {
        type: 'published',
        type_name: '已发布',
        contents: [
        ]
      },
      {
        type: 'uncensored',
        type_name: ' 待审核',
        contents: [
        ]
      },
      {
        type: 'rejected',
        type_name: ' 未通过',
        contents: [
        ]
      }
    ],
    selectList: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {from} = options
    this.setData({
      from
    })
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
    this.fetchData('published')
    this.fetchData('uncensored')
    this.fetchData('rejected')
  },
  loadMore() {
    var {selectList, list} = this.data
    if (!list[selectList].no_more) {
      this.fetchData(list[selectList].type, list[selectList].page + 1)
    }
  },
  fetchData(publish_status, page) {
    var loadMore = false
    if (page && page !== 1) {
      loadMore = true
    }
    var {list} = this.data
    var list_index = ['published', 'uncensored', 'rejected'].findIndex(item => {
      return item === publish_status
    })
    if (!loadMore) {
      wx.showLoading()
    }
    houseAPI.get_my_rent_list(publish_status, page).then(data => {
      if (!loadMore) wx.hideLoading()
      if (page && page !== 1) { //load more
        list[list_index].contents = list[list_index].contents.concat(data.data[publish_status])
        list[list_index].page = page
      } else {
        list[list_index].contents = data.data[publish_status]
        list[list_index].page = 1
      }

      this.setData({
        list
      })
    }).catch(e => {
      if (!loadMore) wx.hideLoading()
      if (loadMore) {
        list[list_index].no_more = true
        this.setData({
          list
        })
      }
    })
  },
  goList() {
    wx.redirectTo({
      url: '/pages/house/list/list'
    })
  },
  goInfo(e) {
    let {index, item} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/house/info/info?id=' + item.id
    })
  },
  add() {
    wx.navigateTo({
      url: '/pages/house/type/type'
    })
  },
  selectType(e) {
    let {index} = e.currentTarget.dataset
    this.setData({
      selectList: index
    })
  },
  goHome() {
    wx.switchTab({
      url: '/pages/home/home/home'
    })
  }
})

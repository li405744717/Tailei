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
          {
            id: 1,
            image: '/images/ad_1.png',
            title: '整组 | 富力城北区 两室精装诚租整组 | 富力城北区 两室精装诚租',
            subTitle: '2室·84平米·富力城（北区）',
            tags: ['朝南', '有电梯', '精装修'],
            price: 2500,
            address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
            create_time: '02-20'
          },
          {
            id: 2,
            image: '/images/ad_1.png',
            title: '整组 | 富力城北区 两室精装诚租整组 | 富力城北区 两室精装诚租',
            subTitle: '2室·84平米·富力城（北区）',
            tags: ['朝南', '有电梯', '精装修'],
            price: 2500,
            address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
            create_time: '02-21'
          },
        ]
      },
      {
        type: 'uncensored',
        type_name: ' 待审核',
        contents: [
          {
            id: 1,
            image: '/images/ad_1.png',
            title: '整组 | 富力城北区 两室精装诚租整组 | 富力城北区 两室精装诚租',
            subTitle: '2室·84平米·富力城（北区）',
            tags: ['朝南', '有电梯', '精装修'],
            price: 2500,
            address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
            create_time: '02-20'
          },
          {
            id: 2,
            image: '/images/ad_1.png',
            title: '整组 | 富力城北区 两室精装诚租整组 | 富力城北区 两室精装诚租',
            subTitle: '2室·84平米·富力城（北区）',
            tags: ['朝南', '有电梯', '精装修'],
            price: 2500,
            address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
            create_time: '02-20'
          },
        ]
      },
      {
        type: 'rejected',
        type_name: ' 未通过',
        contents: [
          {
            id: 2,
            image: '/images/ad_1.png',
            title: '整组 | 富力城北区 两室精装诚租整组 | 富力城北区 两室精装诚租',
            subTitle: '2室·84平米·富力城（北区）',
            tags: ['朝南', '有电梯', '精装修'],
            price: 2500,
            address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
            create_time: '02-20',
            result: '虚假房源信息'
          }
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
    houseAPI.get_my_house_list().then(data => {
      this.setData({
        list: [
          {
            type: 'published',
            type_name: '已发布',
            contents: data.data.published
          },
          {
            type: 'uncensored',
            type_name: ' 待审核',
            contents: data.data.uncensored
          },
          {
            type: 'rejected',
            type_name: ' 未通过',
            contents: data.data.rejected
          }
        ]
      })
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
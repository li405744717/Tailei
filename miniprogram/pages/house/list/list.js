// miniprogram/pages/house/list/list.js
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
        type: 'house',
        type_name: ' 租房',
        contents: [
          {
            id: 1,
            image: '/images/ad_1.png',
            title: '整组 | 富力城北区 两室精装诚租整组 | 富力城北区 两室精装诚租',
            subTitle: '2室·84平米·富力城（北区）',
            tags: ['朝南', '有电梯', '精装修'],
            price: 2500,
            price_type: '半年付',
            address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
            create_time: '2019-02-02',
          },
          {
            id: 2,
            image: '/images/ad_1.png',
            title: '整组 | 富力城北区 两室精装诚租整组 | 富力城北区 两室精装诚租',
            subTitle: '2室·84平米·富力城（北区）',
            tags: ['朝南', '有电梯', '精装修'],
            price: 2500,
            address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
            create_time: '2019-02-02',
          },
        ]
      },
      {
        type: 'work',
        type_name: ' 商铺写字楼',
        contents: []
      },
      {
        type: 'park',
        type_name: ' 停车位',
        contents: [
          {
            id: 1,
            car_number: "23434",
            title: '富力城北区 五号楼停车位出租',
            price: 2500,
            create_time: '2019-02-02',
          },
          {
            id: 2,
            car_number: "23434",
            title: '富力城北区 五号楼停车位出租',
            price: 2500,
            create_time: '2019-02-02',
          },
        ]
      }
    ],
    selectList: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_list()
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
  get_list() {
    houseAPI.get_house_list("").then(data => {
      this.setData({
        list: [
          {
            type: 'house',
            type_name: ' 租房',
            contents: data.data.house
          },
          {
            type: 'work',
            type_name: ' 商铺写字楼',
            contents: data.data.work
          },
          {
            type: 'park',
            type_name: ' 停车位',
            contents: data.data.park
          }
        ],
      })
    })
  },
  goInfo(e) {
    let {index, item} = e.currentTarget.dataset
    let {list, selectList} = this.data
    wx.navigateTo({
      url: `/pages/house/info/info?id=${item.id}&type=${list[selectList].type}`
    })
  },
  add() {
    wx.navigateTo({
      url: '/pages/house/type/type'
    })
  },
  goMy() {
    wx.redirectTo({
      url: '/pages/house/my/my'
    })
  },
  selectType(e) {
    let {index} = e.currentTarget.dataset
    this.setData({
      selectList: index
    })
  }
})
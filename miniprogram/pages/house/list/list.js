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
        page: 1,
        contents: [
          // {
          //   id: 1,
          //   image: '/images/ad_1.png',
          //   title: '整组 | 富力城北区 两室精装诚租整组 | 富力城北区 两室精装诚租',
          //   subTitle: '2室·84平米·富力城（北区）',
          //   tags: ['朝南', '有电梯', '精装修'],
          //   price: 2500,
          //   price_type: '半年付',
          //   address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
          //   create_time: '2019-02-02',
          // },
          // {
          //   id: 2,
          //   image: '/images/ad_1.png',
          //   title: '整组 | 富力城北区 两室精装诚租整组 | 富力城北区 两室精装诚租',
          //   subTitle: '2室·84平米·富力城（北区）',
          //   tags: ['朝南', '有电梯', '精装修'],
          //   price: 2500,
          //   address: 'XX市XX县XX路XX小区XX楼XX单元XX室',
          //   create_time: '2019-02-02',
          // },
        ]
      },
      {
        type: 'work',
        page: 1,
        type_name: ' 商铺写字楼',
        contents: []
      },
      {
        type: 'park',
        type_name: ' 停车位',
        page: 1,
        contents: [
          // {
          //   id: 1,
          //   car_number: "23434",
          //   title: '富力城北区 五号楼停车位出租',
          //   price: 2500,
          //   create_time: '2019-02-02',
          // },
          // {
          //   id: 2,
          //   car_number: "23434",
          //   title: '富力城北区 五号楼停车位出租',
          //   price: 2500,
          //   create_time: '2019-02-02',
          // },
        ]
      }
    ],
    selectList: 0

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
    this.fetchData('house')
    this.fetchData('work')
    this.fetchData('park')
  },
  loadMore() {
    var {selectList, list} = this.data
    if (!list[selectList].no_more) {
      this.fetchData(list[selectList].type, list[selectList].page + 1)
    }
  },
  fetchData(rent_type, page) {
    var loadMore = false
    if (page && page !== 1) {
      loadMore = true
    }
    var {list} = this.data
    var list_index = ['house', 'work', 'park'].findIndex(item => {
      return item === rent_type
    })
    if (!loadMore) {
      wx.showLoading()
    }
    houseAPI.get_rent_list(rent_type, page).then(data => {
      if (!loadMore) wx.hideLoading()
      if (page && page !== 1) { //load more
        list[list_index].contents = list[list_index].contents.concat(data.data[rent_type])
        list[list_index].page = page
      } else {
        list[list_index].contents = data.data[rent_type]
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
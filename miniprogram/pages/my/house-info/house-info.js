// miniprogram/pages/my/house-info/house-info.js
import houseAPI from './../../../commAction/house'
import userAPI from './../../../commAction/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    apartment: {
      id: 1,
      city: {
        province: '江西省',
        city: '南昌市',
        town: '聊城'
      },
      apartment: '东昌首府',
      house: {
        building: '七期住宅-1',
        unit: '20栋',
        room: '2号'
      }
    },
    relations: [],
    showToast: false,
    contents: [
      "对方尚未确认绑定",
      "确认要撤回绑定邀请吗？"
    ],
    buttons: [
      {type: 'cancel', text: '取消', styleClass: 'c_999999'},
      {type: 'confirm', text: '确定', styleClass: 'c_FFAB19'},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {type, id, relation_type, owner_id} = options
    this.id = id
    var app = getApp()
    this.setData({
      owner: owner_id === app.globalData.user.id
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

  onShareAppMessage: function () {

  },
   */
  getData() {
    wx.showLoading()
    Promise.all([houseAPI.house_info(this.id), houseAPI.house_invite_list(this.id)]).then(datas => {
      console.log(datas)
      wx.hideLoading()
      this.setData({
        apartment: datas[0].data,
        relations: datas[1].data
      })
    }).catch(e => {
      console.log(e)
      wx.hideLoading()
    })
  },
  next() {
    wx.navigateTo({
      url: '/pages/apartment/add/add'
    })
  },
  deleteItem(e) {
    console.log(e)
    let {index, item} = e.currentTarget.dataset
    this.setData({
      showToast: true,
      handleIndex: index
    })
  },
  clickToast(e) {
    let pageType = this.data.type
    let {type} = e.detail
    this.setData({
      showToast: false,
    })

    let {handleIndex, relations} = this.data
    if (type === 'confirm') {
      console.log(relations[handleIndex])
      userAPI.cancel_invite([relations[handleIndex].id]).then(data => {
        wx.showToast({
          title: data.detail,
          icon: 'none'
        })
        houseAPI.house_invite_list(this.id).then(data => {
          this.setData({
            relations: data.data
          })
        })
      }).catch(e => {
        wx.showToast({
          title: '操作失败,请重试',
          icon: 'none'
        })
      })
    }

  },
})

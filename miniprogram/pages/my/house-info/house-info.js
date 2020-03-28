// miniprogram/pages/my/house-info/house-info.js
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
    relations: [
      {
        role: '业主',
        phone: '13412341234',
        id: 1,
        status_name: '邀请中',
        avatar: '/images/avatar.png'

      },
      {
        role: '租户',
        phone: '13412341235',
        id: 1,
        status_name: '邀请中',
        avatar: '/images/avatar.png'

      }
    ],
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
    let {type} = options
    this.setData({
      type
    })
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
  next() {
    wx.navigateTo({
      url: '/pages/apartment/add/add'
    })
  },
  deleteItem(e) {
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
      showToast: false
    })
    if (pageType === 'invite') {

    } else {
      let {handleIndex, relations} = this.data
      if (type === 'confirm') {
        relations.splice(handleIndex, 1)
        this.setData({
          relations
        })
      }
    }

  },
  confirmInvite() {
    let {type} = this.data
    if (type === 'invite') {
      let contents = [
        '同意业主',
        '邀请绑定此房屋吗？'
      ]
      this.setData({
        contents,
        showToast: true
      })
    }
  }
})
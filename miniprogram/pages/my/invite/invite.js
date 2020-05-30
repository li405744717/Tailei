// miniprogram/pages/my/invite/invite.js
import userAPI from './../../../commAction/user'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {


    apartments: [
      {
        houseId: 1,
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
      {
        houseId: 2,
        city: {
          province: '江西省',
          city: '南昌市',
          town: '聊城'
        },
        apartment: '东昌首府',
        house: {
          building: '七期住宅-1',
          unit: '20栋',
          room: '3号'
        }
      },
    ],
    relations: [
      {
        type: 'father',
        title: '爸爸'
      },
      {
        type: 'mother',
        title: '妈妈'
      },
      {
        type: 'son',
        title: '儿子'
      },
      {
        type: 'daughter',
        title: '女儿'
      },
      {
        type: 'sister',
        title: '姐妹'
      },
      {
        type: 'brother',
        title: '兄弟'
      },
      {
        type: 'tenant',
        title: '租户'
      }
    ],
    apartmentIndex: 0,
    relation: null,
    phone: null,
    showSelect: '',
    showToast: false,
    contents: [
      "确认邀请1234566666",
      "绑定此房屋吗?"
    ],
    buttons: [
      {type: 'cancel', text: '取消', styleClass: 'c_999999'},
      {type: 'confirm', text: '确定', styleClass: 'c_FFAB19'},
    ],
    submited: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      apartments: app.globalData.user.house_list
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
    var {apartmentIndex, apartments, relation_type, phone} = this.data
    var house_id = apartments[apartmentIndex].id
    var app = getApp()
    return {
      path: `/pages/home/home/home?type=invite&house_id=${house_id}&relation_type=${relation_type}&invite_phone=${phone}&token=${app.globalData.token}`
    }
  },
  setSelect(e) {
    let {key} = e.currentTarget.dataset
    this.setData({
      showSelect: key
    })
  },
  closeSelect() {
    this.setData({
      showSelect: ''
    })
  },
  selectItem(e) {
    let {key, index, item} = e.currentTarget.dataset
    let {relations, apartments} = this.data
    if (key === 'relation') {
      this.setData({
        relation: item.title,
        relation_type: item.type,
        showSelect: ''
      })
    } else if (key === 'apartment') {
      if (apartments[index].owner_id !== app.globalData.user.id) {
        wx.showToast({
          title: '非房屋业主,暂不支持邀请家人',
          icon: 'none'
        })
      } else {
        this.setData({
          apartmentIndex: index,
          showSelect: ''
        })
      }

    }
  },
  setInputValue(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  next() {
    let {phone} = this.data
    let contents = [
      "确认邀请" + phone,
      "绑定此房屋吗?"
    ]
    this.setData({
      contents,
      showToast: true
    })
  },
  clickToast(e) {
    console.log(e)
    let {type} = e.detail
    let {phone} = this.data
    var {apartmentIndex, apartments, relation_type} = this.data
    var house_id = apartments[apartmentIndex].id
    console.log(type)
    this.setData({
      showToast: false
    })
    if (type === 'confirm') {
      userAPI.invite(app.globalData.user.id, phone, house_id, relation_type).then(data => {
        this.setData({
          submited: true
        })
      }).catch(e => {
        this.setData({
          submited: true
        })
        wx.showToast({
          title: '邀请失败,请重试',
          icon: 'none'
        })
      })
    }
  },
  call() {

  },
  goAdd() {
    wx.navigateTo({
      url: '/pages/apartment/add/add'
    })
  }
})

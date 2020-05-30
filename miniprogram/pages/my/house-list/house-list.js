// miniprogram/pages/my/house-list/house-list.js
import houseAPI from './../../../commAction/house'
import utils from './../../../common/utils'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpX: app.globalData.isIpX,
    apartments: [],
    apartmentIndex: 0,
    buttons: [
      {type: 'cancel', text: '取消', styleClass: 'c_999999'},
      {type: 'confirm', text: '确定', styleClass: 'c_FFAB19'},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {type, id, relation_type, invite_phone} = options
    this.id = id
    this.relation_type = relation_type
    this.invite_phone = invite_phone
    this.setData({
      type
    })
    wx.showLoading()
    if (type === 'invite') {
      this.getInviteData()
    } else {
      this.getData()
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

  onShareAppMessage: function () {

  },
   */
  getData() {
    this.setData({
      apartments: app.globalData.user.house_list
    }, () => {
      wx.hideLoading()
    })
  },
  getInviteData() {
    houseAPI.invitee_house(this.invite_phone).then(data => {
      wx.hideLoading()
      this.setData({
        apartments: data.data
      })
    }).catch(e => {
      wx.hideLoading()
    })
  },
  selectApartment(e) {
    let {index} = e.currentTarget.dataset
    var {apartments} = this.data

    houseAPI.set_default_house(apartments[index].id).then(data => {
      wx.showToast({
        title: data.detail,
        icon: 'none'
      })
      this.setData({
        apartmentIndex: index
      })
      utils.setHouseList()
    }).catch(e => {
      wx.showToast({
        title: '操作失败,请重试',
        icon: 'none'
      })
    })
  },
  goInfo(e) {
    let {index, key, item} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/my/house-info/house-info?id=${item.id}&owner_id=${item.owner_id}`
    })
  },
  next() {
    wx.navigateTo({
      url: '/pages/apartment/add/add'
    })
  },
  getPhone(e) {
    var {house} = e.currentTarget.dataset
    console.log(e)

    this.setData({
      show: true,
      house,
      prePhone1: this.invite_phone.slice(0, 3),
      prePhone2: this.invite_phone.slice(3, 7)
    })
    return
    if (e.detail.iv) { //授权成功
      // TODO bind phone
      // TODO check phone === this.invite_phone
      let phone = '' //TODO get api.phone
      if (phone === this.invite_phone) {
        this.confirmInvite()
      } else {
        wx.showToast({
          title: '绑定手机号与邀请手机号不一致,请联系业主核实',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '绑定房屋,需绑定手机号',
        icon: 'none'
      })
    }
    // bindtap="confirmInvite"
  },
  confirmInvite(e) {
    var {house} = e.currentTarget.dataset
    let {type} = this.data
    if (type === 'invite') {
      let contents = [
        '同意业主',
        '邀请绑定此房屋吗？'
      ]
      this.setData({
        contents,
        house,
        showToast: true
      })
    }
  },
  clickToast(e) {
    let pageType = this.data.type
    let {type} = e.detail
    this.setData({
      showToast: false,
    })
    if (pageType === 'invite') {
      console.log(type)
      if (type === 'confirm') {
        var {house} = this.data
        console.log(this.relation_type, this.invite_phone, house.id)
      }
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
  setInputValue(e) {
    let {key} = e.currentTarget.dataset
    this.setData({
      [key]: e.detail.value
    })
  },
  checkPhone() {
    this.setData({
      show: false
    })
    var {prePhone1, prePhone2, nextPhone} = this.data
    var phone = prePhone1 + prePhone2 + nextPhone
    if (phone === this.invite_phone) {
      console.log('check right')
      var {house} = this.data
      var params = {
        "house_id": house.id,
        "relation": house.relation
      }
      console.log(params)
      houseAPI.bind_member(house.house_id, house.relation, house.id).then(data => {
        wx.showToast({
          title: data.detail,
          icon: 'none'
        })
        wx.showLoading()

        utils.setHouseList()
        this.getInviteData()

      }).catch(e => {
        wx.showToast({
          title: data.detail,
          icon: 'none'
        })
        wx.showLoading()
        this.getInviteData()
      })
    } else {
      wx.showToast({
        title: '手机号不一致,请联系业主核实',
        icon: 'none'
      })
    }
  }
})

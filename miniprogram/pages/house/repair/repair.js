// miniprogram/pages/house/repair/repair.js
import repairAPI from './../../../commAction/repair'
import utils from "../../../common/utils";
import suggestAPI from "../../../commAction/suggest";

var app = getApp()
var Range = [
  [['今天', '明天'], ['尽快上门', "08:30", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00"]],
  [['今天', '明天'], ["08:30", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00"]]
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submited: false,
    role: '业主',
    inputValue: null,
    images: [],
    range: Range[0],
    selectRange: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      apartment: app.globalData.user.userInfo.default_house,
      phone: app.globalData.user.userInfo.phone
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
  setInputValue(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindColumnChange(e) {
    console.log(e)
    var {column, value} = e.detail
    if (column === 0) {
      this.setData({
        range: Range[value]
      })
    }
  },
  bindTimeChange(e) {
    let {range} = this.data
    console.log(e)
    this.setData({
      selectRange: e.detail.value
    })
  },
  addImage() {
    let {images} = this.data
    wx.chooseImage({
      count: 3 - images.length,
      success: (e) => {
        console.log('tempFilePaths', e.tempFilePaths)
        images = images.concat(e.tempFilePaths)
        this.setData({
          images
        })
      }
    })
  },
  goRepairList() {
    wx.navigateTo({
      url: '/pages/house/repair-list/repair-list'
    })
  },
  next() {
    console.log('do submit')
    var {inputValue, apartment, selectRange, range} = this.data
    var date = range[0][selectRange[0]], time = range[1][selectRange[1]]
    var date_str, time_str
    if (date === '今天') {
      date_str = (new Date()).Format('yyyy-MM-dd')
    } else {
      date_str = (new Date(new Date().getTime() + 86400000)).Format('yyyy-MM-dd')
    }
    if (time === '尽快上门') {
      time_str = (new Date()).Format('HH:mm:ss')
    } else {
      time_str = time + ':00'
    }
    var reserve_time = date_str + ' ' + time_str
    var form = {
      title: '东西坏了',
      detail: inputValue,
      photos: [],
      house_id: apartment.id,
      court_id: apartment.court_id,
      repair_type: 'home',
      reserve_time: reserve_time,
      order_time: (new Date()).Format('yyyy-MM-dd HH:mm:ss')
    }

    var {images} = this.data
    var count = images.length, image_paths = []
    this.timer
    for (let index in images) {
      var file_path = images[index]
      utils.upLoad(file_path, (data) => {
        console.log('upload data', data)
        count--
        if (data.code === 200) {
          image_paths.push(data.link)
        }
      })
    }
    this.timer = setTimeout(() => {
      if (count === 0) {
        clearTimeout(this.timer)

        form.photos = image_paths

        console.log('create_repair form', form)
        repairAPI.create_repair(form).then(data => {
          if (data.detail === '维修提交成功') {
            this.setData({
              submited: true
            })
          } else {
            wx.showToast({
              title: data.detail,
              icon: 'none'
            })
          }
        }).catch(e => {
          wx.showToast({
            title: '提交失败,请重试',
            icon: 'none'
          })
        })
      }
    }, 200)


  },
  goHome() {
    wx.switchTab({
      url: '/pages/home/home/home'
    })
  },
  deleteImage(e) {
    let {index} = e.currentTarget.dataset
    let {images} = this.data
    images.splice(index, 1)
    this.setData({
      images
    })
  }
})
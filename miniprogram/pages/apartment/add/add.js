// miniprogram/pages/apartment/add/add.js

import {Citys, Apartments, Houses} from './../../../common/citys'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: [
      {
        title: "城市",
        id: 'city',
        placeholder: '请选择所在城市',
        content: {
          province: null,
          province_id: null,
          city: null,
          city_id: null,
          town: null,
          town_id: null
        },
        text: null
      },
      {
        title: "小区",
        id: 'apartment',
        placeholder: '请选择所在小区',
        content: {
          apartment: null,
          apartment_id: null
        },
        text: null,
        options: []
      },
      {
        title: "房屋",
        id: 'house',
        placeholder: '请选择楼栋号、单元号、房间号',
        process: "楼栋号",
        content: {
          building: null,
          building_id: null,
          unit: null,
          unit_id: null,
          room: null,
          room_id: null
        },
        text: null,
        options: []
      }
    ],
    citys: JSON.parse(JSON.stringify(Citys)),
    apartments: JSON.parse(JSON.stringify(Apartments)),
    houses: JSON.parse(JSON.stringify(Houses)),
    citySelect: {
      province: null,
      city: null,
      town: null
    },
    apartmentSelect: {
      apartment: null
    },
    houseSelect: {
      building: null,
      unit: null,
      room: null
    },
    showSelect: {
      city: false,
      apartment: false,
      house: false
    },
    selectId: 'city'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  next(e) {
    console.log(e)
  },
  showSelect(e) {
    let {key, index} = e.currentTarget.dataset
    console.log(key, index)
    let {showSelect, options} = this.data

    if (index > 0 && !options[index - 1].content.text) {
      return
    }
    showSelect[key] = true
    this.setData({
      showSelect
    })
  },
  closeSelect(e) {
    let {key} = e.currentTarget.dataset
    let {showSelect} = this.data
    showSelect[key] = false
    this.setData({
      showSelect
    })
  },
  selectCityIndex(e) {
    let {index, key, name, id} = e.currentTarget.dataset
    console.log(index, key, name, id)
    let {citySelect, citys, showSelect, options} = this.data
    if (key !== 'town' && citySelect[key] === index) citySelect[key] = null
    else citySelect[key] = index
    if (key === 'town') {
      options[0].content.text = name
      options[0].content.town = name
      options[0].content.town_id = id
    } else if (key === 'city') {
      // options[0].content.city = name
      // options[0].content.city_id = id
      if (citySelect[key] === null) {
        // options[0].content.city = null
        // options[0].content.city_id = null
        // options[0].content.town = null
        // options[0].content.town_id = null
      }
    } else if (key === 'province') {
      // options[0].content.province = name
      // options[0].content.province_id = id
      if (citySelect[key] === null) {
        // options[0].content.province = null
        // options[0].content.province_id = null
        // options[0].content.city = null
        // options[0].content.city_id = null
        // options[0].content.town = null
        // options[0].content.town_id = null
      }
    }

    if (key === 'town') {//选好了小区
      showSelect.city = false
      showSelect.apartment = true
    }
    this.setData({
      citySelect,
      options,
      showSelect
    })

  },
  selectApartmentIndex(e) {
    let {index, key, name, id} = e.currentTarget.dataset
    let {apartmentSelect, options, showSelect} = this.data
    apartmentSelect.apartment = index
    options[1].content.text = name
    options[1].content.apartment = name
    options[1].content.apartment_id = id

    showSelect.apartment = false
    showSelect.house = true
    this.setData({
      apartmentSelect,
      options,
      showSelect
    })
  },
  selectHouseIndex(e) {
    let {index, key, name, id} = e.currentTarget.dataset
    console.log(index, key, name, id)
    let {houseSelect, showSelect, options} = this.data
    if (key !== 'room' && houseSelect[key] === index) houseSelect[key] = null
    else houseSelect[key] = index
    if (key === 'room') {
      options[2].content.room = name
      options[2].content.room_id = id
      options[2].content.text += `-${name}`
    } else if (key === 'unit') {
      options[2].content.unit = name
      options[2].content.unit_id = id
      options[2].content.text += `-${name}`

      if (houseSelect[key] === null) {
        // options[0].content.city = null
        // options[0].content.city_id = null
        // options[0].content.town = null
        // options[0].content.town_id = null
      }
    } else if (key === 'building') {
      options[2].content.building = name
      options[2].content.building_id = id
      options[2].content.text = name
      if (houseSelect[key] === null) {
        // options[0].content.province = null
        // options[0].content.province_id = null
        // options[0].content.city = null
        // options[0].content.city_id = null
        // options[0].content.town = null
        // options[0].content.town_id = null
      }
    }

    if (key === 'room') {//选好了房间号
      showSelect.house = false
    }
    let process = houseSelect.unit != null ? '房间号' : houseSelect.building != null ? '单元号' : '楼栋号'
    options[2].process = process
    this.setData({
      houseSelect,
      options,
      showSelect
    })

  }
})
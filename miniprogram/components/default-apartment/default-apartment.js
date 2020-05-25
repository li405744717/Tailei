// components/default-apartment/default-apartment.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  lifetimes: {
    attached() {
      var app = getApp()
      console.log('apartment',app.globalData.user.userInfo.default_house)
      this.setData({
        apartment: app.globalData.user.userInfo.default_house
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {}
})

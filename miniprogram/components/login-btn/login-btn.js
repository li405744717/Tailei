// components/loginBtn/loginBtn.js
var app = getApp()
var utils = require('./../../common/utils')
Component({
  externalClasses: ['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},
  lifetimes: {
    ready() {
      var app = getApp()
      this.setData({
        token: app.globalData.token,
        userInfo: app.globalData.user.userInfo
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    btnClick() {
      this.triggerEvent('click', {}, {});
    },
    click: function (e) {
      if (e.detail.errMsg == 'getUserInfo:fail auth deny' || !e.detail.userInfo) {
        wx.showToast({
          title: '授权才能体验完整功能',
          icon: 'none',
          duration: 2000
        })
        return
      }

      utils.checkLoginAction(e, () => {
        this.triggerEvent('click', e, {});
      })
    }
  }
})

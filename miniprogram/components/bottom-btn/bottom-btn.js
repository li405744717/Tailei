// components/bottom-btn/bottom-btn.js
var app = getApp()
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    styleValue: {
      type: String,
      value: '1'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIpX: app.globalData.isIpX
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      if (!this.data.disabled) {
        this.triggerEvent('click', e, {});
      }
    }
  }
})

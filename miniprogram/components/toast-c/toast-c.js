// components/toast/toast.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    buttons: {
      type: Array,
      value: []
    },
    contents: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      let {type} = e.currentTarget.dataset
      console.log(type)
      this.triggerEvent('click', {type}, {})
    },
    close() {
      this.setData({
        show: false
      })
      this.triggerEvent('click', {type: 'close'}, {})
    },
    none() {

    }
  }
})

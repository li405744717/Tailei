// custom-tab-bar/index.js
let app = getApp()
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
  data: {
    isIpX: app.globalData.isIpX,
    "list": [
      {
        "pagePath": "pages/home/home/home",
        "text": "首页",
        "iconPath": "/images/icon_tab_home.png",
        "selectedIconPath": "/images/icon_tab_home_select.png",
        selected: true
      },
      {
        "pagePath": "pages/information/information/information",
        "text": "资讯",
        "iconPath": "/images/icon_tab_information.png",
        "selectedIconPath": "/images/icon_tab_information_select.png",
        selected: false
      },
      {
        "pagePath": "pages/my/my/my",
        "text": "我的",
        "iconPath": "/images/icon_tab_my.png",
        "selectedIconPath": "/images/icon_tab_my_select.png",
        selected: false
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setTabBar(i) {
      let {list} = this.data
      for (let item of list) {
        item.selected = false
      }
      list[i].selected = true
      this.setData({
        list
      })
    },
    goPath(e) {
      let {item} = e.currentTarget.dataset
      wx.switchTab({
        url: '/' + item.pagePath
      })
    }
  }
})

// miniprogram/pages/house/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forms: [
      {title: '填写地址', placeholder: '如：XX县、市/XX街道/XX小区/XX栋/XX单元/XX室', key: 'address', value: null},
      {title: '填写房型', placeholder: '如：两室一厅', key: 'room', value: null},
      {title: '填写面积', placeholder: '如：100平米', key: 'area', value: null},
      {title: '填写楼层', placeholder: '如：6层', key: 'floor', value: null},
      {title: '填写朝向', placeholder: '如：朝南', key: 'direction', value: null},
      {title: '填写租金/支付方式', placeholder: '如：2000/月 押一付三', key: 'pay', value: null},
      {title: '装修类型', placeholder: '如：精装修、简装修、毛皮、带家具等', key: 'type', value: null},
      {title: '联系方式', placeholder: '填写您的姓名及电话号码', key: 'phone', value: null},
    ],
    forms_car: [
      {title: '填写地址', placeholder: '如：XX县、市/XX街道/XX小区/XX栋/XX单元/XX室', key: 'address', value: null},
      {title: '填写车位号', placeholder: '如：5号楼4323', key: 'room', value: null},
      {title: '填写租金/支付方式', placeholder: '如：2000/月 押一付三', key: 'area', value: null},
      {title: '联系方式', placeholder: '填写您的姓名及电话号码', key: 'phone', value: null},
    ],
    images: ["/images/ad_1.png"],
    type: 'bangonglou', // zhuzhai // car
    submited: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {type} = options
    console.log(options)
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
  goHome() {
    wx.switchTab({
      url: '/pages/home/home/home'
    })
  },
  setInputValue(e) {
    let {value} = e.detail
    let {key} = e.currentTarget.dataset
    let {type, form, form_car} = this.data
    if (type !== 'car') {
      let formItem = form.find(item => {
        return item.key === key
      })
      formItem.value = value
      this.setData({
        form
      })
    } else {
    }
    let formItem = form_car.find(item => {
      return item.key === key
    })
    formItem.value = value
    this.setData({
      form_car
    })
  },
  next() {
    let {form, type, form_car} = this.data
    if (type !== 'car') {
      console.log('form', form)
    } else {
      console.log('form', form_car)
    }
    this.setData({
      submited: true
    })
  },
  addImage() {
    let {images} = this.data
    wx.chooseImage({
      count: 5 - images.length,
      success: (e) => {
        console.log('tempFilePaths', e.tempFilePaths)
        images = images.concat(e.tempFilePaths)
        this.setData({
          images
        })
      }
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
// miniprogram/pages/house/add/add.js
import houseAPI from './../../../commAction/house'
import utils from "../../../common/utils";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    forms: [
      {title: '填写地址', placeholder: '如：XX县、市/XX街道/XX小区/XX栋/XX单元/XX室', key: 'address', value: null},
      {title: '填写房型', placeholder: '如：两室一厅', key: 'room_type', value: null},
      {title: '填写面积', placeholder: '如：100平米', key: 'size', value: null},
      {title: '填写楼层', placeholder: '如：6层', key: 'floor', value: null},
      {title: '填写朝向', placeholder: '如：朝南', key: 'direction', value: null},
      {title: '填写租金(元/月)', placeholder: '如：2000/月', key: 'fee', value: null},
      {title: '填写支付方式', placeholder: '如：押一付三', key: 'pay_way', value: null},
      {title: '装修类型', placeholder: '如：精装修、简装修、毛皮、带家具等', key: 'furniture', value: null},
      {title: '联系方式', placeholder: '填写您的姓名及电话号码', key: 'contact', value: null},
    ],
    forms_park: [
      {title: '填写地址', placeholder: '如：XX县、市/XX街道/XX小区/XX栋/XX单元/XX室', key: 'address', value: null},
      {title: '填写车位号', placeholder: '如：5号楼4323', key: 'floor', value: null},
      {title: '填写租金(元/月)', placeholder: '如：2000/月', key: 'fee', value: null},
      {title: '填写支付方式', placeholder: '如：押一付三', key: 'pay_way', value: null},
      {title: '联系方式', placeholder: '填写您的姓名及电话号码', key: 'contact', value: null},
    ],
    images: [],
    type: 'work', // house // park
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
    let {type, forms, forms_park} = this.data
    if (type !== 'park') {

      let formItem = forms.find(item => {
        return item.key === key
      })
      console.log('formItem', formItem, key)
      formItem.value = value
      this.setData({
        forms
      })
    } else {
      let formItem = forms_park.find(item => {
        return item.key === key
      })
      formItem.value = value
      this.setData({
        forms_park
      })
    }

  },
  next() {
    let {forms, type, forms_park} = this.data
    var form = type !== 'park' ? forms : forms_park
    var params = {rent_type: type, publisher_id: 1}
    for (var item of form) {
      params[item.key] = item.value
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
        console.log('image_paths', image_paths)
        params.photos = image_paths
        console.log(params)
        houseAPI.publish_rent(params).then(data => {
          this.setData({
            submited: true
          })
        }).catch(e => {
          console.log(e)
        })
      }
    }, 200)


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
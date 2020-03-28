// miniprogram/pages/my/invite/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


    apartments: [
      {
        houseId: 1,
        city: {
          province: '江西省',
          city: '南昌市',
          town: '聊城'
        },
        apartment: '东昌首府',
        house: {
          building: '七期住宅-1',
          unit: '20栋',
          room: '2号'
        }
      },
      {
        houseId: 2,
        city: {
          province: '江西省',
          city: '南昌市',
          town: '聊城'
        },
        apartment: '东昌首府',
        house: {
          building: '七期住宅-1',
          unit: '20栋',
          room: '3号'
        }
      },
    ],
    relations: [
      {
        id: 1,
        title: '爸爸'
      },
      {
        id: 2,
        title: '妈妈'
      },
      {
        id: 3,
        title: '儿子'
      },
      {
        id: 4,
        title: '女儿'
      },
      {
        id: 5,
        title: '姐妹'
      },
      {
        id: 6,
        title: '兄弟'
      },
      {
        id: 7,
        title: '租户'
      }
    ],
    apartmentIndex: 0,
    relation: null,
    phone: null,
    showSelect: '',
    showToast: false,
    contents: [
      "确认邀请1234566666",
      "绑定此房屋吗?"
    ],
    buttons: [
      {type: 'cancel', text: '取消', styleClass: 'c_999999'},
      {type: 'confirm', text: '确定', styleClass: 'c_FFAB19'},
    ],
    submited: false
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
    return {
      path:'/pages/home/home/home?type=invite'
    }
  },
  setSelect(e) {
    let {key} = e.currentTarget.dataset
    this.setData({
      showSelect: key
    })
  },
  closeSelect() {
    this.setData({
      showSelect: ''
    })
  },
  selectItem(e) {
    let {key, index, item} = e.currentTarget.dataset
    let {relations} = this.data
    if (key === 'relation') {
      this.setData({
        relation: item.title,
        showSelect: ''
      })
    } else if (key === 'apartment') {
      this.setData({
        apartmentIndex: index,
        showSelect: ''
      })
    }
  },
  setInputValue(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  next() {
    let {phone} = this.data
    let contents = [
      "确认邀请" + phone,
      "绑定此房屋吗?"
    ]
    this.setData({
      contents,
      showToast: true
    })
  },
  clickToast(e) {
    console.log(e)
    let {type} = e.detail
    console.log(type)
    this.setData({
      showToast: false
    })
    if(type==='confirm'){
      this.setData({
        submited:true
      })
    }
  },
  call() {

  },
  goAdd(){
    wx.navigateTo({
      url: '/pages/apartment/add/add'
    })
  }
})
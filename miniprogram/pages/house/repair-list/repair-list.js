// miniprogram/pages/house/repair-list/repair-list.js
import repairAPI from './../../../commAction/repair'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      type: 'wait',
      type_name: ' 待处理',
      contents: [
        {
          id: 1,
          images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
          remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
          create_time: '02-22'
        },
        {
          id: 2,
          images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
          remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
          create_time: '02-22'
        },
      ]
    },
      {
        type: 'unpaid',
        type_name: ' 待支付',
        contents: [
          {
            id: 3,
            images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
            remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
            create_time: '02-22',
            price: 300
          },
          {
            id: 3,
            images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
            remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
            create_time: '02-22',
            price: 240
          },
        ]
      },
      {
        type: 'done',
        type_name: ' 已完成',
        contents: [
          {
            id: 3,
            images: ['/images/ad_1.png', '/images/ad_1.png', '/images/ad_1.png'],
            remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
            create_time: '02-22',
            complete_time: '02-22',
            price: 240
          }
        ]
      }],
    selectList: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
  getData() {
    this.fetchData('wait')
    this.fetchData('unpaid')
    this.fetchData('done')
  },
  loadMore() {
    var {selectList, list} = this.data
    if (!list[selectList].no_more) {
      this.fetchData(list[selectList].type, list[selectList].page + 1)
    }

  },
  fetchData(repair_status, page) {
    var loadMore = false
    if (page && page !== 1) {
      loadMore = true
    }
    var {list} = this.data
    var list_index = ['wait', 'unpaid', 'done'].findIndex(item => {
      return item === repair_status
    })
    if (!loadMore) {
      wx.showLoading()
    }
    repairAPI.get_repair_list(repair_status, page).then(data => {
      if (!loadMore) wx.hideLoading()
      if (loadMore) { //load more
        list[list_index].contents = list[list_index].contents.concat(data.data[repair_status])
        list[list_index].page = page
      } else {
        list[list_index].contents = data.data[repair_status]
        list[list_index].page = 1
      }

      this.setData({
        list
      })
    }).catch(e => {
      if (!loadMore) wx.hideLoading()
      if (loadMore) {
        list[list_index].no_more = true
        this.setData({
          list
        })
      }
    })
  },
  selectList(e) {
    let {index} = e.currentTarget.dataset
    this.setData({
      selectList: index
    })
  },
  goPay(e) {
    let {item} = e.currentTarget.dataset
    console.log(item)
    wx.navigateTo({
      url: '/pages/house/order/order'
    })
  }
})
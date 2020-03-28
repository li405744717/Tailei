// components/slide-btn/slide-btn.js
var showSlideId = {
  _showId: '',
  _currentSlide: null,
  get showId() {
    return this._showId
  },
  set showId(value) {
    console.log('set', value, '->', this._showId)
    this._showId = value
  },
  get currentSlide() {
    return this._currentSlide
  },
  set currentSlide(value) {
    if (this._currentSlide) this._currentSlide.close()
    this._currentSlide = value
  },
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    edit: {
      type: Boolean,
      value: true
    },
    enable: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    slideId: '',

  },
  lifetimes: {
    ready() {
      var that = this;
      //common是自己写的公共JS方法，可忽略
      for (var i = 0; i < 1; i++) {
        this.data.items.push({
          content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
          isTouchMove: false //默认隐藏删除
        })
      }
      let slideId = Date.now().toString(36)
      slideId += Math.random().toString(36).substr(3)
      this.slideId = slideId
      this.setData({
        items: this.data.items
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      console.log('close')
      var {items} = this.data
      items[0].isTouchMove = false
      this.setData({
        items
      })
    },
    //手指触摸动作开始 记录起点X坐标
    touchstart: function (e) {
      //开始触摸时 重置所有删除
      this.data.items.forEach(function (v, i) {
        if (v.isTouchMove)//只操作为true的
          v.isTouchMove = false;
      })
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
        items: this.data.items
      })
    },

    //滑动事件处理
    touchmove: function (e) {
      var that = this,
        index = e.currentTarget.dataset.index,//当前索引
        startX = that.data.startX,//开始X坐标
        startY = that.data.startY,//开始Y坐标
        touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
        touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
        //获取滑动角度
        angle = that.angle({X: startX, Y: startY}, {X: touchMoveX, Y: touchMoveY});
      that.data.items.forEach(function (v, i) {
        v.isTouchMove = false
        //滑动超过30度角 return
        if (Math.abs(angle) > 30) return;
        if (i == index) {
          if (touchMoveX > startX) //右滑
            v.isTouchMove = false
          else {//左滑
            v.isTouchMove = true
            if (showSlideId.showId != that.slideId) {
              console.log('划开', that.slideId)
              showSlideId.showId = that.slideId
              showSlideId.currentSlide = that
            }
          }

        }
      })
      //更新数据
      that.setData({
        items: that.data.items
      })
    },

    /**

     * 计算滑动角度

     * @param {Object} start 起点坐标

     * @param {Object} end 终点坐标

     */

    angle: function (start, end) {
      var _X = end.X - start.X,
        _Y = end.Y - start.Y
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },
    edit: function (e) {
      this.triggerEvent('edit', {}, {});
    },
    delete: function (e) {
      this.triggerEvent('delete', {}, {});
    },
  }
})

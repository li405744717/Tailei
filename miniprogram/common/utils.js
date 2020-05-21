var userApi = require('./../commAction/user')

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  var year = this.getFullYear();
  var yearstr = year + '';
  yearstr = yearstr.length >= 4 ? yearstr : '0000'.substr(0, 4 - yearstr.length) + yearstr;

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (yearstr + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
module.exports = {
  checkLoginAction(e, callback) {
    var app = getApp()
    console.log(app.globalData)
    var token = app.globalData.token
    var open_id = app.globalData.user.open_id
    var params = {}

    var setParam = () => {
      if (e != null && e.detail.userInfo) { // 授权,获取授权信息
        params = e.detail.userInfo
        params.iv = e.detail.iv
        params.encryptedData = e.detail.encryptedData
        if (app.globalData.user.userInfo.nickname != e.detail.userInfo.nickName || app.globalData.user.userInfo.avatar != e.detail.userInfo.avatarUrl) {
          console.log('更新用户信息', params)
          userApi.registe(params, null, open_id)
        }
        app.globalData.user.userInfo = e.detail.userInfo
        app.globalData.user.iv = e.detail.iv
        app.globalData.user.encryptedData = e.detail.encryptedData
      }
    }
    if (token) { // 有token
      if (callback) callback()
      setParam()
    } else {
      console.log('没有token,重新WXLogin')
      setParam()
      app.globalData.loginPromise().then(data => {
        if (callback) callback()
      }).catch(err => {
        console.log('获取token失败', err)
      })
    }
  },
  goPage(options) {
    var {url, source} = options
    wx.navigateTo({
      url: url
    })
    if (source) {
      console.log('do record', source)
    }
  }
}

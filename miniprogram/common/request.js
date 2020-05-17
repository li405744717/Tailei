var CODE = {
  SUCCESS: 200,
  SUCCESS2: 0,
  AUTHENTICATION_FAILED: 401
}


function request(method, url, data, third, noToken, noToast) {
  var startTime = new Date()
  var app = getApp()
  try {
    var token = app.globalData.token
  } catch (e) {
    var token = null
  }
  if (!token && !noToken) { //无token
    console.log('请求', url, '无token,invoke login')
    return app.globalData.loginPromise().then(_ => {
      if (app.globalData.token)
        return request(method, url, data, third, noToken)
      else
        return new Promise(((resolve, reject) => {
          resolve({})
        }))
    }).catch(err => {
      console.log('请求', url, 'relogin,获取token失败', err)
    })
  } else {
    var header = {
      'content-type': 'application/json', // 默认值,
      'Authorization': 'Token ' + token,
      'kb': 'Token ' + token
    }
    if (noToken) delete header.Authorization
    if (noToken) delete header.kb
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        method: method,
        data: data,
        header: header,
        success: function (res) {
          console.log(url, noToken, res);
          if (!third) {
            if (res.statusCode == CODE.AUTHENTICATION_FAILED) { //用户未认证,token无效
              console.log('用户未认证,token无效')
              return app.globalData.loginPromise().then(data => {
                return request(method, url, data, third, noToken)
              })
            } else if (res.data.code == CODE.SUCCESS || res.data.code == CODE.SUCCESS2) {
              return resolve(res.data)
            } else if (res.data.detail && typeof res.data.detail == 'string' && res.data.code != 401) {
              if (!noToast && res.statusCode !== 404) {
                wx.showToast({
                  title: res.data.detail,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
            reject(res.data)
          } else {
            resolve(res.data)
          }
        },
        fail: function (res) {
          console.log('请求失败。。。', res)
          var endTime = new Date()
          var errTitle = res.errMsg.indexOf('out') > -1 ? 'request超时' : '请求失败'
          if (errTitle == 'request超时') {
            if (!noToast) {
              wx.showModal({
                title: '哦嚯',
                content: "对不起，叮当好像断线了，您的手机网络正常吗？",
                showCancel: false,
                confirmText: "让我看看",
              })
            }

          }
          reject(res)
        }
      })
    })
  }
}

function configRequest(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      success: (data) => {
        console.log('config:', url, data)
        resolve(data.data)
      }
    })
  }).then(data => {
    return data
  })
}

function put(url, data, third, noToast) {
  return request('PUT', url, data, third, noToast)
}

function post(url, data, third, token, noToast) {
  return request('POST', url, data, third, token, noToast)
}

function get(url, data, third, token, noToast) {
  return request('GET', url, data, third, token, noToast)
}

module.exports = {
  request: request,
  config: configRequest,
  post: post,
  get: get,
  put: put,
  CODE: CODE
}
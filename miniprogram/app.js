//app.js
var userApi = require('./commAction/user.js');
var utils = require('./common/utils')
var Config = require('./common/index')
var CONST = Config.CONST
App({
  onLaunch: function () {
    console.log('onlaunch')
    this.globalData = {
      // token_string: '052756c520a19d1dc9fa5f361344590d474b0adf',
      user: {
        userInfo: {
          nickName: '小主',
          avatarUrl: '/img/avatar.png',
        },
        iv: '',
        encryptedData: '',
        openid: ''
      },
      get token() {
        return this.token_string
      },
      set token(value) {
        console.log('set token', value, this.token_string)
        if (value != this.token_string && value) {
          console.log('更新token')
          // value = 'd6a5ace1264e1e97b3abe62fee58ac765e0b99d8'
          this.token_string = value
          setTimeout(() => {
            console.log('更新token')

          }, 1000)
        }
        this.token_string = value
      }
    }

    //获取设备宽高
    wx.getSystemInfo({
      success: data => {
        let ratio = 750 / data.screenWidth
        let height = data.windowHeight * ratio
        this.globalData.window = {
          origin: data,
          ratio,
          height,
          navbarHeight: 0,
          statusBarHeight: data.statusBarHeight
        }


        ;
        if (data.model.indexOf('iPhone') > -1) {
          this.globalData.isIOS = true
        }
        let model = data.model.substring(0, data.model.indexOf('X')) + 'X'

        if (model.indexOf('iPhone') > -1 && model.indexOf('X') > -1) {
          this.globalData.isIpX = true
        }
      }
    });

    var storageUserKeys = ['phone', 'nickname', 'avatarUrl']

    this.globalData.loginPromise = click => {
      return new Promise((resolve, reject) => {
        var setUserInfo = (data) => {
          // data.detail.phone = false
          this.globalData.token = data.token
          this.globalData.user.userInfo.nickname = data.detail && data.detail.nickname || '小主'
          this.globalData.user.userInfo.avatar = data.detail && data.detail.avatar || '/images/avatar.png'
          this.globalData.user.phone = data.detail && data.detail.phone
          console.log('设置storage token1_' + CONST.ApiEnvironment)
          wx.setStorage({
            key: "token1_" + CONST.ApiEnvironment,
            data: data.token
          });
          for (let key of storageUserKeys) {
            console.log('设置storage ' + key)
            wx.setStorage({
              key: key,
              data: data.detail && data.detail[key == 'avatarUrl' ? 'avatar' : key] || null
            });
          }

        }
        var params = this.globalData.user
        console.log('invoke login');
        wx.login({
          success: (res) => {
            userApi.login(res.code, '123456').then(data => {
              console.log('data', data)
              // 模拟没有token,有openid
              // if (this.count < 7) {
              //   console.log('count', this.count)
              //   data.token = null
              //   data.detail = {}
              // }`
              this.count++
              if (data.open_id) this.globalData.user.openid = data.open_id;
              if (data.token) { //直接拿到token
                console.log('Login获取到token,更新账户信息')
                setUserInfo(data)
                resolve()
              } else if (data.open_id && params.iv && params.encryptedData) {
                console.log('没有token,只有openid,请求授权')
                userApi.registe(params, data.token, data.open_id).then(data => {
                  if (data.token) {
                    console.log('Registe获取到token,更新账户信息')
                    setUserInfo(data)
                    resolve()
                  } else {
                    console.log('Registe获取到token失败,清除账户信息')
                    setUserInfo(data)
                    if (click) {
                      wx.showToast({
                        title: "授权才能体验哦",
                        icon: 'none'
                      })
                    }
                    reject()
                  }
                })
              } else if (click) {
                console.log('没有openid或者没有授权,清除账户信息')
                setUserInfo(data)
                wx.showToast({
                  title: "授权才能体验哦",
                  icon: 'none'
                })
                reject()
              } else {
                setUserInfo(data)
                reject()
              }
            }).catch(err => {
              console.log('login err', err)
              this.globalData.token = null;
              console.log('token:' + this.globalData.token);
              wx.showToast({
                title: '登录失败,请重试',
                icon: 'none'
              })
              reject()
            });
          },
          complete: () => {
            // resolve()
          }
        })
      });
    }
    this.globalData.loginPromise().then(data => {
      console.log('APP页 拿到token')
    }).catch(err => {
      console.log('APP页', err)
    })


  },
  onShow: function (res) {
    console.log('onshow')
    this.globalData.appFrom = res.query.type
  }
})


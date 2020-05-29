//app.js
import houseAPI from './commAction/house'

var userApi = require('./commAction/user.js');

var utils = require('./common/utils')
var Config = require('./common/index')
var CONST = Config.CONST
App({
  onLaunch: function () {
    console.log('onlaunch')
    const setHouseList = () => {
      houseAPI.get_my_house_list().then(data => {
        this.globalData.user.house_list = data.data
        this.globalData.user.default_house = data.data[0]
      })
    }
    this.globalData = {
      // token_string: '052756c520a19d1dc9fa5f361344590d474b0adf',
      user: {
        userInfo: {
          auth: false,
          nickname: '小主',
          avatar: '/img/avatar.png',
        },
        house_list: [],
        default_house: {},
        iv: '',
        encryptedData: '',
        open_id: '',
        id: null
      },
      get token() {
        return this.token_string
      },
      set token(value) {
        console.log('set token', value, this.token_string)
        if (value != this.token_string && value) {
          console.log('更新token')
          value = '052756c520a19d1dc9fa5f361344590d474b0adf'
          this.token_string = value
          try {
            setHouseList()
          } catch (e) {
            console.log(e)
          }
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
          if (data.detail) {
            this.globalData.user.userInfo.nickname = data.detail.nickname && data.detail.nickname !== '' ? data.detail.nickname : null
            this.globalData.user.userInfo.avatar = data.detail.avatar && data.detail.avatar !== '' ? data.detail.avatar : '/images/avatar.png'
            this.globalData.user.userInfo.phone = data.detail.phone
            this.globalData.user.id = data.detail.id
          }

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
            userApi.login(res.code).then(data => {
              console.log('data', data)
              // 模拟没有token,有openid
              // if (this.count < 7) {
              //   console.log('count', this.count)
              //   data.token = null
              //   data.detail = {}
              // }`
              this.count++
              var open_id = data.detail && data.detail.open_id
              if (open_id) this.globalData.user.open_id = open_id
              if (data.token) { //直接拿到token
                // data.token = '052756c520a19d1dc9fa5f361344590d474b0adf'
                console.log('Login获取到token,更新账户信息')
                setUserInfo(data)
                resolve()
              } else if (open_id && params.iv && params.encryptedData) {
                console.log('没有token,只有openid,请求授权')
                userApi.registe(params, data.token, open_id).then(data => {
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
    this.globalData.app_from = res.query.type
    this.globalData.relation_type = res.query.relation_type
    this.globalData.app_from_house_id = res.query.house_id
    this.globalData.invite_phone = res.query.invite_phone
  }
})


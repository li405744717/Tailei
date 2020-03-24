var request = require('../common/request.js')
var common = require('../common/index.js')
var KbURL = common.CONST.KbURL;
module.exports = {
  login(wx_code, identify_code) {
    let url = KbURL + 'account/login/?code=' + wx_code + '&source=wx&program=wuye';
    return request.get(url, {}, null, true).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  bindopenid(from, openid) {
    let url = KbURL + 'account/bindopenid/';
    let params = {
      from: from,
      opendid: opendid
    }
    return request.put(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  registe(userInfo, token, openid) {
    console.log(userInfo)
    if (token) {
      let url = KbURL + 'account/data/';
      let params = {
        nickname: userInfo.nickName || userInfo.nickname || '',
        province: userInfo.province || '',
        gender: userInfo.gender || '' + "",
        avatar: userInfo.avatarUrl || userInfo.avatar || '',
        city: userInfo.city || '',
      }
      return request.put(url, params).then(data => {
        return data;
      }).catch(err => {
        return err;
      });
    } else {
      let url = KbURL + 'account/auth/';
      let params = {
        source: 'wx',
        program: 'wuye',
        encryptedData: userInfo.encryptedData,
        iv: userInfo.iv,
        open_id: openid || 'obykF0Uck-snFNKv13I4RM7px0GA'
      }
      return request.post(url, params, null, true).then(data => {
        return data;
      }).catch(err => {
        return err;
      });
    }
  }
}
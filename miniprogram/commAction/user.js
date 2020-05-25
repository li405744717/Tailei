var request = require('../common/request.js')
var common = require('../common/index.js')
var KbURL = common.CONST.KbURL;
module.exports = {
  login(wx_code) {
    let url = KbURL + 'account/account/login/?code=' + wx_code + '&source=wx&program=wuye'
    var params = {
      source: 'wx',
      program: 'wuye',
      code: wx_code,
      api_version: common.CONST.api_version
    }
    return request.get(url, params, null, true).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  check_contact(house_id, phone) {
    let url = KbURL + 'house/house/check_contact/';
    return request.post(url, {house_id, phone}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  send_verify(phone) {
    let url = KbURL + 'send_verify/';
    return request.post(url, {phone}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  verify_code(phone, code) {
    let url = KbURL + 'verify_code/';
    return request.post(url, {phone, code}).then(data => {
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
    console.log(userInfo, openid)
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
      let url = KbURL + 'account/account/auth/';
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

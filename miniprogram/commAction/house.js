var request = require('../common/request.js')
var common = require('../common/index.js')
var KbURL = common.CONST.KbURL;
module.exports = {
  get_area() {
    let url = KbURL + 'house/house/area_list/';
    return request.get(url, {}, null, true).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  get_court(town_id) {
    let url = KbURL + 'house/house/court_list/';
    return request.get(url, {town: town_id}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  get_court_house(court_id) {
    let url = KbURL + 'house/house/house_list/';
    return request.get(url, {court: court_id}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  get_rent_list(rent_type, page) {
    let url = KbURL + 'house/house/rent_list/';
    var params = {rent_type}
    if (page) params.page = page
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  publish_rent(params) {
    let url = KbURL + 'house/house/publish_rent/';
    return request.post(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  get_my_rent_list(publish_status, page) {
    let url = KbURL + 'house/house/my_rent_list/'
    var params = {publish_status}
    if (page) params.page = page
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  get_my_house_list() {
    let url = KbURL + 'house/house/my_house_list/';
    return request.get(url, {}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  house_info(id) {
    let url = KbURL + 'house/house/admin_house_retrieve/';
    return request.get(url, {id}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  house_invite_list(house_id) {
    let url = KbURL + 'house/house/invite_records/';
    return request.get(url, {house_id}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  bind_house(house_id, phone, code, relation_type) {
    let url = KbURL + 'house/house/bind_house/';
    return request.post(url, {
      house_id,
      phone,
      code,
      bind_type: relation_type || 'own',
      api_version: common.CONST.api_version
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  bind_member(house_id, relation,invite_id) {
    let url = KbURL + 'house/house/bind_member/';
    return request.post(url, {
      house_id,
      relation,
      invite_id
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  invitee_house(phone) {
    let url = KbURL + 'account/account/my_invitee/';
    return request.get(url, {
      phone
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  set_default_house(house_id){
    let url = KbURL + 'house/house/set_primary/';
    return request.post(url, {
      house_id
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}

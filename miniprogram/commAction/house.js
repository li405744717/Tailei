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
  get_house_list(type) {
    let url = KbURL + 'house/house/rent_list/';
    return request.get(url, {}).then(data => {
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
  get_my_house_list() {
    let url = KbURL + 'house/house/my_rent_list/';
    return request.get(url, {}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}
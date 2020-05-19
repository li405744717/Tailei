var request = require('../common/request.js')
var common = require('../common/index.js')
var KbURL = common.CONST.KbURL;
module.exports = {
  create_repair(form) {
    let url = KbURL + 'repair/repair/repair_create/'
    return request.post(url, form).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  get_repair_list(repair_status, page) {
    let url = KbURL + 'repair/repair/repair_records/'
    var params = {repair_status}
    if (page) params.page = page
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}
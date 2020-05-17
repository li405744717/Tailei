var request = require('../common/request.js')
var common = require('../common/index.js')
var KbURL = common.CONST.KbURL;
module.exports = {
  get_charge_list(charge_status) {
    let url = KbURL + 'charge/charge/charge_records/';
    var params = {}
    if (charge_status) params.charge_status = charge_status
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}
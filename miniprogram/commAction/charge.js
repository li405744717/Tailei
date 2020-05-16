var request = require('../common/request.js')
var common = require('../common/index.js')
var KbURL = common.CONST.KbURL;
module.exports = {
  get_charge_list() {
    let url = KbURL + 'charge/charge/charge_records/';
    return request.get(url, {}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}
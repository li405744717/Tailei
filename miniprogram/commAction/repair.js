var request = require('../common/request.js')
var common = require('../common/index.js')
var KbURL = common.CONST.KbURL;
module.exports = {
  get_repair_list() {
    let url = KbURL + 'repair/repair/repair_records/';
    return request.get(url, {}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}
var request = require('../common/request.js')
var common = require('../common/index.js')
var KbURL = common.CONST.KbURL;
module.exports = {
  create_suggest(params) {
    let url = KbURL + 'material/material/opinion_create/';
    return request.post(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}
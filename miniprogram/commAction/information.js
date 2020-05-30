var request = require('../common/request.js')
var common = require('../common/index.js')
var KbURL = common.CONST.KbURL;
module.exports = {
  get_information_types() {
    let url = KbURL + 'material/material/admin_label_list/'
    return request.get(url, {}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  information_list(label, page) {
    let url = KbURL + `material/material/passage_list/`
    var params = {label}
    if (page) params.page = page
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });

  },
  information_info(id) {
    let url = KbURL + `material/material/passage_retrieve/`
    var params = {id}
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}
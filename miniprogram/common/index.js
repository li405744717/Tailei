var DevKbURL = 'https://xinyuanwuye.cn/api/' //https://xinyuanwuye.cn/api/'
var DevAnalystURL = 'https://devanalyst.ddwenwen.com/api/'


var DevConfigURL = 'https://config.ddwenwen.com/dev/api/'
var CONST = {
  KbURL: 'https://xinyuanwuye.cn/api/',
  AnalystURL: 'https://analyst.ddwenwen.com/api/',
  ConfigURL: 'https://config.ddwenwen.com/api/',
  // socketDomain: 'ws://127.0.0.1:12300/',
  socketDomain: 'wss://websocket.dingnuo.ai/',
  ApiEnvironment: 'dev', //uat dev ,loc
  Environment: 'UAT', // fundebug
  api_version: 0, //1 | 0
  UPLOAD_URL: 'https://xinyuanwuye.cn/api/upload_image/'
}
if (CONST.ApiEnvironment == 'dev') {
  CONST.KbURL = DevKbURL
  CONST.Environment = 'DEV'
  CONST.AnalystURL = DevAnalystURL
  CONST.ConfigURL = DevConfigURL

} else if (CONST.ApiEnvironment == 'loc') {
  CONST.KbURL = DevKbURL
  CONST.Environment = 'DEV'
  CONST.AnalystURL = LocAnalystURL
  CONST.ConfigURL = DevConfigURL

}
exports.CONST = CONST
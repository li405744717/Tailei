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
  apiVersion: "0.0", //1.0 or 0.0
  UatVersion: '3.7.3' //参数  3.7.1  DEV 3.2.0  ,new:3.7.2
}
if (CONST.ApiEnvironment == 'dev') {
  CONST.KbURL = DevKbURL
  CONST.Environment = 'DEV'
  CONST.AnalystURL = DevAnalystURL
  CONST.ConfigURL = DevConfigURL
  CONST.UatVersion = '3.2.0'
} else if (CONST.ApiEnvironment == 'loc') {
  CONST.KbURL = DevKbURL
  CONST.Environment = 'DEV'
  CONST.AnalystURL = LocAnalystURL
  CONST.ConfigURL = DevConfigURL
  CONST.UatVersion = '3.2.0'
}
exports.CONST = CONST
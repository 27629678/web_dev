const LogLevel = {
  Debug   : 2,
  Info    : 1,
  Error   : 0,
};

let log_level = LogLevel.Debug;

Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1,                 //月份 
      "d+": this.getDate(),                    //日 
      "h+": this.getHours(),                   //小时 
      "m+": this.getMinutes(),                 //分 
      "s+": this.getSeconds(),                 //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }

  function date_string() {
    let date = new Date();

    return date.format('yyyy-MM-dd hh:mm:ss S');
  }

exports.debug = function(...args) {
  if (log_level < LogLevel.Debug) {
    return;
  }

  console.log(date_string() + '[D]:' + args);
};

exports.info = function (...args) {
  if (log_level < LogLevel.Info) {
    return;
  }

  console.info(date_string() + '[I]:' + args);
};

exports.error = function (...args) {
  if (log_level < LogLevel.Error) {
    return;
  }

  console.error(date_string() + '[E]:' + args);
}
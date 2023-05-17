export function getCurrentTime() {
  //获取当前时间并打印
  var _this = this;
  let yy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  let dd = new Date().getDate();
  let hh = new Date().getHours();
  let mf =
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes();
  let ss =
    new Date().getSeconds() < 10
      ? "0" + new Date().getSeconds()
      : new Date().getSeconds();
  return (_this.gettime =
    yy + "/" + mm + "/" + dd + " " + hh + ":" + mf + ":" + ss);
}

export function getDate(dateStr) {
  return dateStr.substring(0, 10);
}

export function getDateTime(dateStr) {
  return dateStr.replace("T", " ");
}

export function toStr(str) {
  if (str == undefined || str.length <= 0) {
    return "";
  }
  return str.toString();
}

export function toInt(str) {
  if (str == undefined || str.length <= 0) {
    return 0;
  }
  return parseInt(str);
}

export function toBool(str) {
  if (str == undefined || str.length <= 0) {
    return false;
  }
  return str == "true" ? true : false;
}

export function hiddenEmail(str) {
  if (str == undefined || str.length <= 0) {
    return "";
  }
  var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (!strRegex.test(str)) {
    return str;
  }
  var end = str.indexOf("@");
  var strA = str.substring(0, end);
  var strB = str.substring(end);
  if (strA.length <= 1) {
    return "**" + strB;
  }
  if (strA.length > 1 && strA.length <= 5) {
    return strA.substring(0, 1) + "****" + strB;
  }
  var strANew = replaceCenterWithChar(strA, 3, 2, "*");
  return strANew + strB;
}

export function replaceCenterWithChar(str, frontLen, endLen, cha) {
  var len = str.length - frontLen - endLen;
  var xing = "";
  for (var i = 0; i < len; i++) {
    xing += cha;
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

export function InitFormModel(data) {
  let formModel = {};
  for (let item in data) {
    console.log(item);
  }
  return formModel;
}

export function isMobile() {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}

export default {
  getCurrentTime,
  getDate,
  getDateTime,
  toStr,
  toInt,
  toBool,
  hiddenEmail,
  InitFormModel,
  isMobile,
};

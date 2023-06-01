//import {KJUR} from "./ecdh_all";
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    S: this.getMilliseconds()
  };
  for (var k in /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), o) new RegExp("(" + k + ")").test(fmt) && (fmt = fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)));
  return fmt
};

// console.log = (function (oriLogFunc) {
//   return function () {
//     //判断配置文件是否开启日志调试
//     if (wx.getStorageSync('isConsole')) {
//       try{
//         oriLogFunc.call(console, ...arguments);
//       }catch(e){
//         console.error('console.log error', e);
//       }
//     }
//   }
// })(console.log);

export function sortObject(bodyObj) {
  const orderBody = {};
  return Object.keys(bodyObj).sort().forEach((function (key) {
    orderBody[key] = bodyObj[key]
  })), orderBody
}
export function getParamsStr(obj) {
  let paramsArray = [];
  for (var key in obj) paramsArray.push(key + "=" + obj[key]);
  return paramsArray.join("&")
}
//16进制数转10进制
export function hex2int(hex) {
  var len = hex.length,
    a = new Array(len),
    code;
  for (var i = 0; i < len; i++) {
    code = hex.charCodeAt(i);
    if (48 <= code && code < 58) {
      code -= 48;
    } else {
      code = (code & 0xdf) - 65 + 10;
    }
    a[i] = code;
  }

  return a.reduce(function (acc, c) {
    acc = 16 * acc + c;
    return acc;
  }, 0);
}
export function str16ToBit(str) {
  let result = "";
  str += "";
  for (let i = 0; i < str.length; i++) {
    let bit = parseInt(str[i], 16).toString(2);
    for (bit.toString(); bit.length < 4;) bit = "0" + bit;
    result += bit
  }
  return result
}
/*
 * 16进制数转bit（8位）
 * @str16: 十六进制字符串
 * */
export function BitParse(str16) {
  let result = "",
    map = {
      0: "0000",
      1: "0001",
      2: "0010",
      3: "0011",
      4: "0100",
      5: "0101",
      6: "0110",
      7: "0111",
      8: "1000",
      9: "1001",
      a: "1010",
      b: "1011",
      c: "1100",
      d: "1101",
      e: "1110",
      f: "1111"
    };
  for (let i = 0; i < str16.length; i++) result += map[str16[i]];
  return result
}
//十六进制字符串转字节数组

export function Str2Bytes(str) {
  var pos = 0;

  var len = str.length;

  if (len % 2 != 0) {
    return null;

  }

  len /= 2;

  var hexA = new Array();

  for (var i = 0; i < len; i++) {
    var s = str.substr(pos, 2);

    var v = parseInt(s, 16);

    hexA.push(v);

    pos += 2;

  }

  return hexA;

}
//字节数组转十六进制字符串
export function Bytes2Str(arr) {
  var str = "";

  for (var i = 0; i < arr.length; i++) {
    var tmp = arr[i].toString(16);

    if (tmp.length == 1) {
      tmp = "0" + tmp;
    }

    str += tmp;
  }

  return str;
}
//ASCII码转16进制
export function strToHexCharCode(str) {
  if (str === "") {
      return "";
  } else {
      var hexCharCode = [];
      hexCharCode.push("0x");
      for (var i = 0; i < str.length; i++) {
          hexCharCode.push((str.charCodeAt(i)).toString(16));
      }
      return hexCharCode.join("");
  }
}
//十六进制转ASCII码
export function hexCharCodeToStr(hexCharCodeStr) {
  var trimedStr = hexCharCodeStr.trim();
  var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
  var len = rawStr.length;
  if (len % 2 !== 0) {
      alert("存在非法字符!");
      return "";
  }
  var curCharCode;
  var resultStr = [];
  for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16);
      resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join("");
}
//unit8转str
utf8ArrayToStr: array => {
  let out, i, len, c;
  let char2, char3;
  out = "";
  len = array.length;
  i = 0;
  while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
        case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
        case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                      ((char2 & 0x3F) << 6) |
                      ((char3 & 0x3F) << 0));
        break;
      }
    }
    return out;
}
export function parseLTV(oristr) {
  let arr = [], targetStr = oristr;
  for (; targetStr.length > 0;) {
    let splitobj = getSplitObject(targetStr);
    arr.push(splitobj);
   targetStr = targetStr.substr(splitobj.strlength + 4)
  }
  return arr
}
export function getSplitObject(str) {
  let lengthstr, length = hex2int(str.substr(0, 2)) - 1,
    strlength = 2 * length,
    type = str.substr(2, 2),
    value = str.substr(4, strlength);
  return {
    allstr: str.substr(0, strlength + 4),
    strlength: strlength,
    length: length,
    type: type,
    value: value
  }
}
export function bleErrorCode() {
  var codeObj = [{
    codeHex: 0,
    codeInt: 0,
    message: "成功"
  }, {
    codeHex: 257,
    codeInt: 257,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }, {
    codeHex: "",
    codeInt: 0,
    message: ""
  }]
}
// export function getRasKey(isLogin) {
//   if(wx.getStorageSync('rasKey')){
//     return;
//   }
//   let result={};
//     var curve = "secp256r1";
//     var ec = new KJUR.crypto.ECDSA({ curve: curve });
//     var keypair = ec.generateKeyPairHex();

//     let privateKeyBase64 = wx.CryptoJS.enc.Base64.stringify(
//       wx.CryptoJS.enc.Hex.parse(keypair.ecprvhex)
//     );
//     let publicKeyBase64 = wx.CryptoJS.enc.Base64.stringify(
//       wx.CryptoJS.enc.Hex.parse(keypair.ecpubhex)
//     );
//     let privateKey = wx.CryptoJS.enc.Hex.parse(keypair.ecprvhex).toString();
//     let publicKey = wx.CryptoJS.enc.Hex.parse(keypair.ecpubhex).toString();
//     wx.setStorageSync( "rasKey",
//        {
//         privateKeyBase64: privateKeyBase64,
//         publicKeyBase64: publicKeyBase64,
//         privateKey: privateKey,
//         publicKey: publicKey
//       }
//     );
//     result={ privateKey: keypair.ecprvhex, publicKey: keypair.ecpubhex };
//     logs.info("公私钥:"+JSON.stringify(result))
//     return result;
// }
export function getUuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "";

  var uuid = s.join("");
  return uuid;
}
export function throttle(fn, interval) {
  var enterTime = 0,
    gapTime = interval || 1e3;
  return function () {
    var that = this,
      backTime = new Date;
    backTime - enterTime > gapTime && (fn.call(that, arguments), enterTime = backTime)
  }
}
export function debounce(fn, interval) {
  var timer, gapTime = interval || 1e3;
  return function () {
    clearTimeout(timer);
    var that = this,
      args = arguments;
    timer = setTimeout((function () {
      fn.call(that, args)
    }), gapTime)
  }
}
export function hasPageRoute(pageRoute){
  let pages =getCurrentPages(); 
  console.log("111111111111",pages,pageRoute)
  let pageObj =pages.find(item=>item.route==pageRoute);
  return pageObj?true:false;
}
export function getModelIphone(){
  let modestr =wx.getSystemInfoSync().model;
  try{
    let modeArr = modestr.match(/\<([^)]*)\>/);
    return modeArr instanceof Array ?modeArr[1]:null;
  }catch(e){
    console.log(e)
    return null;
  }
}
export var CF = {
  getModelIphone:getModelIphone,
  sortObject: sortObject,
  getUuid: getUuid,
  hex2int: hex2int,
  parseLTV: parseLTV,
  bleErrorCode: bleErrorCode,
  BitParse: BitParse,
  str16ToBit: str16ToBit,
  hexCharCodeToStr: hexCharCodeToStr,
  Bytes2Str: Bytes2Str,
  Str2Bytes: Str2Bytes,
  //getRasKey: getRasKey,
  getParamsStr: getParamsStr,
  throttle: throttle,
  debounce: debounce,
  hasPageRoute:hasPageRoute
};
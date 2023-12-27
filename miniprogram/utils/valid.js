export var valid = {
  required: function (val, str) {
    let flag = true;
    if (!val) {
      flag = false;
      wx.showToast({
        title: str ,
        icon:'none'    
      });

    }
    return flag;
  },
  validatePhoneDefault: function (value) {
    const reg = /^[1][0-9]{10}$/;
    let flag = true;
    if (value == '' || value == undefined || value == null) {
      flag = false;
    } else {
      if ((!reg.test(value)) && value != '') {
        flag = false;
      } else {
        flag = true;
      }
    }
    return flag;
  },
  validatePhone: function (value) {
    const reg = /^[1][0-9]{10}$/;
    let flag = true;
    if (value == '' || value == undefined || value == null) {
      flag = false;
      wx.showToast({
        title: "请输入手机号码" ,
        icon:"none"       
      });
    } else {
      if ((!reg.test(value)) && value != '') {
        flag = false;
        wx.showToast({
          title: "请输入正确手机号码" ,
          icon:"none"       
        });
      } else {
        flag = true;
      }
    }
    return flag;
  }
};
class customer {
  constructor() {
    this._id = "",
      this.avatarUrl = "",
      this.city = "",
      this.idCard = "",
      this.mobile = "",
      this.name = "",
      this.nickName = "",
      this.openId = ""
  }
  initCustomer() {

    return {
      _id: "",
      avatarUrl: "",
      city: "",
      idCard: "",
      mobile: "",
      name: "",
      nickName: "",
      openId: ""
    }
  }
  setCustomer(obj) {
    if (!obj) {
      return this.initCustomer();
    }
    Object.assign(this, obj)
  }
  getCustomer() {
    return {
      avatarUrl:this.avatarUrl,
      city:this.city,
      idCard:this.idCard,
      mobile:this.mobile,
      name:this.name,
      nickName:this.nickName,
      openId:this.openId
    }
  }
}
module.exports = customer;
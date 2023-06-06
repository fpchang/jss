class customer{
  constructor(){

  }
  initCustomer(){
    // this._id="",
    // this.avatarUrl="",
    // this.city="",
    // this.idCard="",
    // this.mobile="",
    // this.name="",
    // this.nickName="",
    // this.openId=""
    return {
      _id:"",
      avatarUrl:"",
      city:"",
      idCard:"",
      mobile:"",
      name:"",
      nickName:"",
      openId:""
    }
  }
  setCustomer(obj){
    if(!obj){
      return this.initCustomer();
    }
    return Object.assign(this.initCustomer(),obj)
  }
  getCustomer(){
   return this.initCustomer();
  }
}
module.exports= customer;
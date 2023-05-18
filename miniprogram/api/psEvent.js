//发布订阅事件控制中心
// export var psEvent = {
  
// }
class psEvent{
  constructor(){
    this.events={};
    this.topicalList=[
      'getSlideShow',//轮播
  
   ]
  }
  isLogin() {
    return false;
  }
 

 subcribe(topical = '', fn) {
    if (!topical || typeof fn != 'function') {
       return;
    }
    if (!this.events[topical]) {
       this.events[topical] = {
          value: '',
          list: []
       };
    }
    let token = new Date().getTime();
    this.events[topical]['list'].push({
       token: token,
       func: fn
    });
    //如果有存在的值，直接发布
    if (this.events[topical]['value']&&this.isLogin()) {
       this.publish(topical, this.events[topical]['value']);
    }
    return token;
 }
 publish(topical, value,sn) {
    if(!this.isLogin()){
       return;
    }
    let event = this.events[topical];
    if (!event) {
       return;
    }
    event.value = value;
    event['list'].forEach(item => {
       item['func'] && item['func'](value);
    })
 }
 // 根据token清除topical
 unsubcribe(topical, token) {
    let event = this.events[topical];
    if(topical&&token){
       event['list'] = event['list'].filter(item => item.token != token);
       return;
    }
   // event['list']=[];
    
 }
  //清除topical
 unsubcribeTopical(topical) {
    let event = this.events[topical];
    if(topical){
       event['list']=[];
       return;
    }     
 }
 clearSubcribe(){
    this.events={}
 }
}
module.exports = new psEvent();
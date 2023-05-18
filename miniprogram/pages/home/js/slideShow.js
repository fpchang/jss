import DB from '../../../api/DB';
import psEvent from '../../../api/psEvent';
class SlideShow{
  constructor(){}
   async getSlideShow(){
     return DB.getCollection("slideShow");    
  }
}
module.exports=new SlideShow();
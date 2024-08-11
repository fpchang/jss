//import common_vendor from '../common/vendor';
const common_vendor = require("../common/vendor.js");
class DB{
  constructor(){}
   getCollection(dbName,w={}){
     
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
      console.log(dbName);
      const db = common_vendor.Vs.database();
     // wx.cloud.database()
      db.collection(dbName).where(w).get().then(res=>{
        console.log(res.result);
        resolve(res.result)
      }).catch(err=>{
      })
    })
  }
  getCollectionGroupBy(dbName,w={},groupBy="_id asc"){
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
      console.log(dbName);
      const db = common_vendor.Vs.database();
      db.collection(dbName).where(w).orderBy(groupBy).get().then(res=>{
        console.log(res.result);
        resolve(res.result)
      }).catch(err=>{
      })
    })
  }
  insertData(dbName,r={}){
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
      const db = common_vendor.Vs.database();
      db.collection(dbName).add(r).then(res=>{
        resolve(res.result);
      }).catch(er=>{
        console.error(er);
        reject(er)
      })
    });
  }
  add(dbName,r={}){
    const db = common_vendor.Vs.database();
      return db.collection(dbName).add(r)  
  }
  update(dbName,_id="",data={}){
    const db = common_vendor.Vs.database();
    console.log(arguments)
    return db.collection(dbName).doc(_id).update(data);
  }
}
module.exports = new DB();
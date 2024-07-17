//const db = common_vendor.Vs.database();
class DB{
  constructor(){}
   getCollection(dbName,w={}){
     
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
      wx.cloud.database().collection(dbName).where(w).get().then(res=>{
        console.log(res.data);
        resolve(res)
      })
    })
  }
  insertData(dbName,r={}){
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
      wx.cloud.database().collection(dbName).add({
        data:r
      }).then(res=>{
        resolve(res);
      }).catch(er=>{
        reject(er)
      })
    });
  }
  add(dbName,r={}){
      return wx.cloud.database().collection(dbName).add({
        data:r
      })  
  }
}
module.exports = new DB();
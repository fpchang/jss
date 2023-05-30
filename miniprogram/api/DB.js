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
}
module.exports = new DB();
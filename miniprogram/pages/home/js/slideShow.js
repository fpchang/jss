class SlideShow{
  constructor(){}
  async getSlideShow(){
    await wx.cloud.database().collection("slideShow").get().then(res=>{
      console.log(res.data)
    })
  }
}
module.exports=SlideShow;
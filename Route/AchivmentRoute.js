const express=require("express")
const {AchievementModel} =require("../Model/Achievement")
const AchievementRoute=express.Router()


AchievementRoute.get("/",async(req,res)=>{
    try{
       const data=await AchievementModel.find()
       res.send(data)
    }
    catch(err){
        res.send(err)
    }
})

AchievementRoute.post("/",async(req,res)=>{
    const payload=req.body
   try{
      const data=new AchievementModel(payload)
      await data.save()
      res.send(data)
   }
   catch(err){
    res.send(err)
}
})


AchievementRoute.delete("/:id",async(req,res)=>{
  const id=req.params.id
  try{
      await AchievementModel.findByIdAndDelete({"_id":id})
      res.send("Delete Success")
  }
  catch(err){
    res.send(err)
}
})

AchievementRoute.patch("/:id",async(req,res)=>{
  const id=req.params.id
  try{
      await AchievementModel.findByIdAndUpdate({"_id":id})
      res.send("Upload Success")
  }
  catch(err){
    res.send(err)
}
})

module.exports={
    AchievementRoute
  }

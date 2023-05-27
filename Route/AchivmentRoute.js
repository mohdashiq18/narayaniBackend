const express=require("express")
const {AchievementModel} =require("../Model/Achievement")
const AchievementRoute=express.Router()


AchievementRoute.get("/get",async(req,res)=>{
    try{
       const data=await AchievementModel.find()
       res.send(data)
    }
    catch{
      res.send("err")
    }
})

AchievementRoute.post("/post",async(req,res)=>{
    const payload=req.body
   try{
      const data=new AchievementModel(payload)
      await data.save()
      res.send(data)
   }
   catch{
     res.send("err")
   }
})


AchievementRoute.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
  try{
      await AchievementModel.findByIdAndDelete({"_id":id})
      res.send("Delete Success")
  }
  catch{
    res.send("err")
  }
})

AchievementRoute.patch("/upload/:id",async(req,res)=>{
  const id=req.params.id
  try{
      await AchievementModel.findByIdAndUpdate({"_id":id})
      res.send("Upload Success")
  }
  catch{
    res.send("err")
  }
})

module.exports={
    AchievementRoute
  }

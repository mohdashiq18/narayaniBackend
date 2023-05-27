const express=require("express")
const { model } = require("mongoose")
const {TestimonialModel} =require("../Model/Testimonial")
const TestimonialRoute=express.Router()


TestimonialRoute.get("/get",async(req,res)=>{
    try{
       const data=await TestimonialModel.find()
       res.send(data)
    }
    catch{
      res.send("err")
    }
})

TestimonialRoute.post("/post",async(req,res)=>{
    const payload=req.body
   try{
      const data=new TestimonialModel(payload)
      await data.save()
      res.send(data)
   }
   catch{
     res.send("err")
   }
})


TestimonialRoute.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
  try{
      await TestimonialModel.findByIdAndDelete({"_id":id})
      res.send("Delete Success")
  }
  catch{
    res.send("err")
  }
})

TestimonialRoute.patch("/upload/:id",async(req,res)=>{
  const id=req.params.id
  try{
      await TestimonialModel.findByIdAndUpdate({"_id":id})
      res.send("Upload Success")
  }
  catch{
    res.send("err")
  }
})

module.exports={
    TestimonialRoute
  }

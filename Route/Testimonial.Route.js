const express=require("express")
const { model } = require("mongoose")
const {TestimonialModel} =require("../Model/Testimonial")
const TestimonialRoute=express.Router()


TestimonialRoute.get("/",async(req,res)=>{
    try{
       const data=await TestimonialModel.find()
       res.send(data)
    }
    catch(err){
      res.send(err)
  }
})

TestimonialRoute.post("/",async(req,res)=>{
    const payload=req.body
   try{
      const data=new TestimonialModel(payload)
      await data.save()
      res.send(data)
   }
   catch(err){
    res.send(err)
}
})


TestimonialRoute.delete("/:id",async(req,res)=>{
  const id=req.params.id
  try{
      await TestimonialModel.findByIdAndDelete({"_id":id})
      res.send("Delete Success")
  }
  catch(err){
    res.send(err)
}
})

TestimonialRoute.patch("/:id",async(req,res)=>{
  const id=req.params.id
  const payload=req.body
  try{
      await TestimonialModel.findByIdAndUpdate({"_id":id},payload)
      res.send("Upload Success")
  }
  catch(err){
    res.send(err)
}
})

module.exports={
    TestimonialRoute
  }

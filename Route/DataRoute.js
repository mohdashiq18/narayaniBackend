const express=require("express")
const DataRoute=express.Router()

const {UploadModel} =require("../Model/UploadModel")

DataRoute.get("/", async (req, res) => {
  try {
    const { category, length, width, page } = req.query;
    const itemsPerPage = 3;
    const currentPage = page ? parseInt(page) : 1;
    const skipItems = (currentPage - 1) * itemsPerPage;
    
    const filterOptions = [];

    if (category) {
      filterOptions.push({ category });
    }

    if (length) {
      filterOptions.push({ 'size._length': { $lte: Number(length) } });
    }

    if (width) {
      filterOptions.push({ 'size._width': { $lte: Number(width) } });
    }

    let filter = {};

    if (filterOptions.length > 0) {
      filter = { $and: filterOptions };
    }

    const uploads = await UploadModel.find(filter)
      .skip(skipItems)
      .limit(itemsPerPage);

    res.status(200).json(uploads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  DataRoute.get("/:id",async(req,res)=>{
    const id=req.params.id
    try{
       const data = await UploadModel.findOne({"_id":id})
       res.send(data)
    }
    catch(err){
      res.send(err)
  }
  })
  DataRoute.delete("/:id",async(req,res)=>{
    const id = req.params.id
    try{
        await UploadModel.findByIdAndDelete({"_id":id})
        res.send("Delete success")
    }
    catch(err){
      res.send(err)
  }
  })
  DataRoute.patch("/:id",async(req,res)=>{
    const id = req.params.id
    const payload=req.body
    try{
        await UploadModel.findByIdAndUpdate({"_id":id},payload)
        res.send("Update success")
    }
    catch(err){
      res.send(err)
  }
  })
  DataRoute.post("/",async(req, res,next) => {
  const payload=req.body
  const currentDate = new Date();
  
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  try{
     const data=new UploadModel({...payload,date:formattedDate})
     await data.save()
     res.send(data)
  }
  catch(err){
    res.send(err)
}
  });


  module.exports={
    DataRoute
  }
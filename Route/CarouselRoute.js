const express = require('express');
const Carouselrouter = express.Router();
const {CarouselModel} = require('../Model/Carousel');

Carouselrouter.get('/carousal', async (req, res) => {
    try {
      const carouselItems = await CarouselModel.find();
      res.json(carouselItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  Carouselrouter.post('/carousal', async (req, res) => {
    const carouselItem = new CarouselModel({
      imgPc: req.body.imgPc,
      imgMobile: req.body.imgMobile,
      text: req.body.text,
      heading: req.body.heading
    });
  
    try {
      const newCarouselItem = await carouselItem.save();
      res.status(201).json(newCarouselItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  Carouselrouter.patch('/carousal/:id', async (req, res) => {
    const payload=req.body
    const id=req.params.id
    try{
       const data=await CarouselModel.findByIdAndUpdate({"_id":id},payload)
       res.send(data)
    }
    catch{
        res.send("err")
    }
    
  });
  
  Carouselrouter.delete('/carousal/:id', async (req, res) => {
    const id=req.params.id
    try{
       const data=await CarouselModel.findByIdAndDelete({"_id":id})
       res.send(data)
    }
    catch{
        res.send("err")
    }
    
  });

  module.exports = {
    Carouselrouter
  };

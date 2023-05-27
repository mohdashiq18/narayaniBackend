const express = require("express");
require('dotenv').config()
const Connect=require("./Config/Config")
const app = express();
const {DataRoute} =require("./Route/DataRoute")
const {userRoute} =require("./Route/UserRout")
const {TestimonialRoute} =require("./Route/Testimonial.Route")
const {Carouselrouter} =require("./Route/CarouselRoute")
const {AchievementRoute} =require("./Route/AchivmentRoute")
const cors=require("cors")
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/",DataRoute)
app.use("/",userRoute)
app.use("/testimonial",TestimonialRoute)
app.use("/achievement",AchievementRoute)
app.use("/",Carouselrouter)
app.listen(process.env.PORT,async(req,res)=>{
    try{
      await Connect
      console.log("server is running in Port 5000")
    }
    catch{
        console.log("Server Error")
    }
});
  
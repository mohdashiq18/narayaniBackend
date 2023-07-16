const express = require("express");
require('dotenv').config()
const Connect=require("./Config/Config")
const app = express();
const {DataRoute} =require("./Route/DataRoute")
const {userRoute} =require("./Route/UserRout")
const {TestimonialRoute} =require("./Route/Testimonial.Route")
const {AchievementRoute} =require("./Route/AchivmentRoute")
const {ServicesMain} =require("./Route/MainService")
const {ServicesSub} =require("./Route/SubService")
const {Appointment} =require("./Route/Appontment")
const cors=require("cors")
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/data",DataRoute)
app.use("/users",userRoute)
app.use("/testimonial",TestimonialRoute)
app.use("/achievement",AchievementRoute)
app.use("/main",ServicesMain)
app.use("/sub",ServicesSub)
app.use("/appointment",Appointment)
app.listen(process.env.PORT,async(req,res)=>{
    try{
      await Connect
      console.log("server is running in Port 5000")
    }
    catch{
        console.log("Server Error")
    }
});
  
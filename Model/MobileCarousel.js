const mongoose=require("mongoose")

const mobileSchema=mongoose.Schema({
    img:{type:String,required:true},
    text:{type:String,required:true},
    heading:{type:String,required:true}
})


const MobileModel=mongoose.model("mobileCarousel",mobileSchema)

module.exports={
    MobileModel
}
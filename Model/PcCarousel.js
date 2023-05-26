const mongoose=require("mongoose")

const pcSchema=mongoose.Schema({
    img:{type:String,required:true},
    text:{type:String,required:true},
    heading:{type:String,required:true}
})


const PcModel=mongoose.model("PcCarousel",pcSchema)

module.exports={
    PcModel
}
const mongoose=require("mongoose")

const mainServicesSchema=mongoose.Schema({
    smname:{type:String,required:true},
})

const MainServicesModel=mongoose.model("MainServices",mainServicesSchema)

module.exports={
    MainServicesModel
}
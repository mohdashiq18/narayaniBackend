const mongoose=require("mongoose")

const subServicesSchema=mongoose.Schema({
    mainId:{type:String,required:true},
    mainname:{type:String,required:true},
    title: { type: String, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    date: { type: String, required: true },
    size: {
      _length: { type: Number, required: true },
      _width: { type: Number, required: true },
    },

})

const SubServicesModel=mongoose.model("servicesSub",subServicesSchema)

module.exports={
    SubServicesModel
}
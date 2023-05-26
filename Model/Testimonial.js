const mongoose=require("mongoose")

const testimonialSchema=mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    message:{type:String,required:true}
})


const TestimonialModel=mongoose.model("testimonial",testimonialSchema)

module.exports={
    TestimonialModel
}
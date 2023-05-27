const mongoose=require("mongoose")

const achievementSchema=mongoose.Schema({
    img:{type:String,required:true},
    text:{type:String,required:true},
    heading:{type:String,required:true}
})


const AchievementModel=mongoose.model("achievement",achievementSchema)

module.exports={
    AchievementModel
}
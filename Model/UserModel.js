const mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String},
    number: { type: String, required: true },
    last_visit: { type: String,required:true },
    next_consult_date: { type: String, default: 'Not Updated' },
    last_consulted_date: { type: String, default: 'Not Updated' },
    consult_status: { type: Boolean, default: false },
    consulter_name: { type: String, default: 'Not Consulted' },
    consult_feedback: { type: String, default: 'Not Consulted' }
  });

const UserModel=mongoose.model("users",userSchema)

module.exports={
    UserModel
}
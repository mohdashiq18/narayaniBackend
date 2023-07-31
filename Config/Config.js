const mongoose=require("mongoose")
require('dotenv').config()
const Connect = mongoose.connect("mongodb+srv://narayani:Narayani@cluster0.hridl9w.mongodb.net/narayni_interior?retryWrites=true&w=majority")

module.exports={
    Connect
}  
const mongoose=require("mongoose")
require('dotenv').config()
const Connect = mongoose.connect(process.env.DB_url)

module.exports={
    Connect
}  
const mongoose = require("mongoose")
require('dotenv').config();

const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully")

    } catch (error) {

        console.log('error connecting db' + error)
    }

}

module.exports = connectDB
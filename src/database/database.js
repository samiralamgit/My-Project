const mongoose = require("mongoose");
// require('../models/registers');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/Register").then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(err)
});
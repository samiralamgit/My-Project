const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    name: {
        type: String
    },
    link: {
        type: String
    }
})

const course=new mongoose.model("course",courseSchema);

module.exports=course;
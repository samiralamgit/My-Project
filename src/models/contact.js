const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    message: {
        type: String
    }
})

const contact=new mongoose.model("contactList",contactSchema);

module.exports=contact;
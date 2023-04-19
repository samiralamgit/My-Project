const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const studedentSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    course: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Cpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

studedentSchema.methods.generateToken=async function(){
    try{
        const token=jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error){
        res.send(error);
    }
}

studedentSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password, 10);
        this.Cpassword=await bcrypt.hash(this.password, 10);
    }
    // this.Cpassword=undefined;
    next();
})

const student=new mongoose.model("Student",studedentSchema);
module.exports=student;
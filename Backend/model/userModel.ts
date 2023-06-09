import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add the name"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"please add the email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please add the Password"],
    },
    phone:{
        type:Number,
        required:[true,"please add the Phone number"],
    },
    address:{
        type:String,
        required:[true,"please add the Address"],
    },
    answer:{
        type:String,
        required:[true,"please add the answer"],
    },
    role:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export default mongoose.model('users',userSchema)
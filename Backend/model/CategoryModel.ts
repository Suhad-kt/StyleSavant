import mongoose from "mongoose";
import slugify from 'slugify'

const CategorySchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})

export default mongoose.model('category',CategorySchema)
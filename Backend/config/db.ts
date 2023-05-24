import mongoose from "mongoose";

const ConnectDb = async ()=>{
    try {
         const connect = await mongoose.connect(process.env.MONGO_URL as string)
         console.log("connected to mongodb database ",connect.connection.host,connect.connection.name);

    } catch (error) {
        console.log("Database not connected :",error);
        
    }
}
export default ConnectDb
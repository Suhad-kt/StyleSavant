import { log } from "console";
import express from "express";
import dotenv from "dotenv"
import ConnectDb from "./config/db";
import authRoutes from "./Routes/authRoute"
import morgan from "morgan";
import cors from "cors"

//configure env 
dotenv.config() 

// database config
ConnectDb()

//rest object
const app = express();
const port = process.env.PORT || 3000

//middlewares  
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


//routes
app.use("/api/auth",authRoutes)

//app listening
app.listen(port, () => {
  log("server started in port ",port);
});



import { log } from "console";
import express from "express";
import dotenv from "dotenv"
import ConnectDb from "./config/db";
import authRoutes from "./Routes/authRoute"

//configure env 
dotenv.config() 

// database config
ConnectDb()

//rest object
const app = express();
const port = process.env.PORT || 3001

//middlewares
app.use(express.json())


//routes
app.use("/api/user",authRoutes)

//rest api
// app.get("/", (req, res) => {
//   res.send("welcome");
// });

app.listen(port, () => {
  log("server started in port ",port);
});



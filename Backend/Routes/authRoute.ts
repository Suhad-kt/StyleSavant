import  express from "express";
import { registerController } from "../Controllers/Usercontroller";

//Router Object
const router =express.Router()

//routing
//REGISTER  || METHOD POST

router.post('/register',registerController)


export default router
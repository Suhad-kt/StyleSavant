import  express from "express";
import { CurrentUser, loginController, registerController } from "../Controllers/Usercontroller";
import { ValidateToken, isadmin } from "../middlewares/authMiddleware";

//Router Object
const router =express.Router()

//routing
//REGISTER  || METHOD POST

router.post('/register',registerController)

//Login  || METHOD POST
router.post('/login',loginController)


//test
router.get('/current',ValidateToken,isadmin,CurrentUser)

export default router
import  express from "express";
import { CurrentUser, forgotPasswordController, loginController, registerController } from "../Controllers/Usercontroller";
import { ValidateToken, isadmin } from "../middlewares/authMiddleware";

//Router Object
const router =express.Router()

//routing
//REGISTER  || METHOD POST

router.post('/register',registerController)

//Login  || METHOD POST
router.post('/login',loginController)

//forgot password  || POST
router.post('/forgot-password',forgotPasswordController)

//test
router.get('/current',ValidateToken,isadmin,CurrentUser)

//protected route auth
router.get('/userauth',ValidateToken,(req,res)=>{
    res.status(200).send({ok:true})
})

//forgot password || post
router.post('/forgot-password',forgotPasswordController)

export default router
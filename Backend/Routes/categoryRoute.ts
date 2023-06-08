import  express  from "express";
import { ValidateToken, isadmin } from "../middlewares/authMiddleware";
import { CategoryController, DeleteCategoryController, SingleCategoryController, createCategoryController, updateCategoryController } from "../Controllers/CategoryController";

const router = express.Router()

//Create catogery  Method:POST
router.post('/create-category',ValidateToken,isadmin,createCategoryController)


//Update catogery  Method:PUT
router.put('/update-category/:id',ValidateToken,isadmin, updateCategoryController)

//Get all catogery  Method:GET
router.get('/get-category',CategoryController)

//Get single catogery  Method:GET
router.get('/single-category/:slug',SingleCategoryController)

//Delete catogery  Method:DELETE
router.delete('/delete-category/:id',ValidateToken,isadmin, DeleteCategoryController)

export default router
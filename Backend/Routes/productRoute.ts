import express from 'express'
import { ValidateToken, isadmin } from '../middlewares/authMiddleware'
import { DeleteProductController, UpdateProductController, createProductController, getProductController, getSingleProductController } from '../Controllers/PoductController'
import upload from '../middlewares/multer'

const router = express.Router()

//create product    Metode:POST
router.post('/create-product',ValidateToken,isadmin, upload.single('file'),createProductController)

//update Product  Method:PUT
 router.put('/update-product/:productid',upload.single('file'),ValidateToken,isadmin,UpdateProductController)

//Delete Product  Method:Delete
router.delete('/delete-product/:productid',ValidateToken,isadmin,DeleteProductController)

//get-allproducts    Metode:GET
router.get('/all-products',getProductController)


// get single product    Metode:GET
router.get('/get-product/:slug',getSingleProductController)


export default router
import express from 'express'
import { ValidateToken, isadmin } from '../middlewares/authMiddleware'
import { DeleteProductController, UpdateProductController, createProductController, getProductController, getProductPhoto, getSingleProductController } from '../Controllers/PoductController'
import upload from '../middlewares/multer'

const router = express.Router()

//create product    Metode:POST
router.post('/create-product',ValidateToken,isadmin, upload.single('file'),createProductController)

//update Product  Method:PUT
 router.put('/update-product/:productid',ValidateToken,isadmin,upload.single('file'),UpdateProductController)

//Delete Product  Method:Delete
router.delete('/delete-product/:productid',ValidateToken,isadmin,DeleteProductController)

//get-allproducts    Metode:GET
router.get('/all-products',getProductController)

//get photo
router.get('/product-photo/:productid',getProductPhoto)

// get single product    Metode:GET
router.get('/product/:slug',getSingleProductController)


export default router
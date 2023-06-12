import { Request, Response } from "express";
import slugify from "slugify";
import ProductModel from "../model/ProductModel";
import { cloud } from "../config/cloudinary";

//creating product
export const createProductController = async (req: Request, res: Response) => {
  const { file } = req;
  if (!file) {
    throw new Error("not file found");
  }
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    const imageCloud = await cloud.uploader.upload(file?.path as string);

    // validation
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, message: "name is required" });

      case !description:
        return res
          .status(500)
          .send({ success: false, message: "description is required" });
      case !price:
        return res
          .status(500)
          .send({ success: false, message: "price is required" });
      case !category:
        return res
          .status(500)
          .send({ success: false, message: "category is required" });
      case !quantity:
        return res
          .status(500)
          .send({ success: false, message: "quantity is required" });
    }

    const products = new ProductModel({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
      photo: imageCloud.secure_url,
    });

    await products.save();

    res.status(200).send({
      success: true,
      message: "product created successfull",
      products,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error while product creating", error });
  }
};

// Update Product
export const UpdateProductController = async (req: Request, res: Response) => {
  try {
    const file = req.file
    
    const { name, slug, description, price, category, quantity, shipping } =
      req.body;

    const imageCloud = await cloud.uploader.upload(file?.path as string);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.productid,
      {
        $set: {
          name,
          slug: slugify(name),
          description,
          price,
          category,
          quantity,
          shipping,
          photo: imageCloud.secure_url,
        },
      },
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("server problem updating data");
    }

    return res
      .status(200)
      .send({ success: true, message: "product updated", updatedProduct });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while in Updating product",
      error,
    });
  }
};

//Delete product
export const DeleteProductController = async (req: Request, res: Response) => {
  const productid = req.params.productid;

  const deletedProduct = await ProductModel.findByIdAndDelete(productid);

  if (!deletedProduct) throw new Error("cannot delete product");
  return res
    .status(200)
    .send({ success: true, message: "product deleted", deletedProduct });
};

// All Products getting
export const getProductController = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({})
      .limit(12)
      .sort({ createdAt: -1 })
      .populate("category");
    if (!products)
      return res
        .status(500)
        .send({ success: false, message: "no products available" });
    res.status(200).send({
      success: true,
      message: "All products",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while in getting all products",
      error,
    });
  }
};

//get photo
export const getProductPhoto = async (req: Request, res: Response) => {
  try {
    const productPhoto =await ProductModel.findById(req.params.productid).select("photo")
    
    if(productPhoto?.photo){
      res.status(200).send({
        success: true,
        message: "get product photo successfully",
        productPhoto
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while in getting photo",
      error,
    });
  }
};

// single Product getting
export const getSingleProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug }).populate("category");
    res.status(200).send({
      success: true,
      message: "get single product successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while in getting single product",
      error,
    });
  }
};


//filters 
export const productFilterController =async (req:Request,res:Response)=>{
  try {
    const {checked,radio}=req.body
    let args:any={}
    if(checked.length>0) args.category=checked
    if(radio.length) args.price = {$gte:radio[0] , $lte:radio[1]}

    const products = await ProductModel.find(args)
    res.status(200).send({
      success:true,
     products
    })
  } catch (error) {
    res.status(500).send(error)
  }
}


//product count 
export const PoductCountController = async (req:Request,res:Response)=>{
  try {
    const productCount = await ProductModel.find({}).estimatedDocumentCount()
    res.status(200).send({success:true,productCount})
  } catch (error) {
    res.status(500).send({success:false,message:'error in getting product count',error})
  }
}


//product perPage
export const PoductListController = async (req:Request,res:Response)=>{
  try {
    const perPage:number = 6
    const page:number = req.params.page ? parseInt(req.params.page) :1
    const products = await ProductModel.find({}).skip((page - 1) * perPage).limit(perPage).sort({createdAt:-1})
    res.status(200).send({success:true,products})
  } catch (error) {
    res.status(500).send({success:false,message:'error in getting product count',error})
  }
}


//search product
export const SearchProductController = async (req:Request,res:Response) =>{
  try {
    const {keyword}  = req.params
    const result = await ProductModel.find({
      $or:[
        {name:{$regex:keyword,$options:'i'}},
        {description:{$regex:keyword,$options:'i'}}
      ]
    })
    res.status(200).send(result)
    
  } catch (error) {
    res.status(500).send({success:false,message:'error in search product Api',error})
  }
}
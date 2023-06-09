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
    const { name, slug, description, price, category, quantity, shipping } =
      req.body;

    const imageCloud = await cloud.uploader.upload(req.file?.path as string);

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


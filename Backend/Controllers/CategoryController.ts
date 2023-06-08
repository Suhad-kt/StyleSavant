import { Request, Response } from "express";
import CategoryModel from "../model/CategoryModel";
import slugify from "slugify";
var ObjectId = require("mongoose").ObjectID;

//create category
export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).send({ success: false, message: "Name is required" });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      res
        .status(200)
        .send({ success: true, message: "category Already Exists" });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ success: true, message: "new category created", category });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in create category", error });
  }
};

//update category
export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    }
    res
      .status(200)
      .send({ success: true, message: "category updated", category });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "error while updating category",
        error,
      });
  }
};

//get all category
export const CategoryController = async (req: Request, res: Response) => {
  try {
    const category = await CategoryModel.find({});
    res
      .status(200)
      .send({ success: true, message: "All categories list", category });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "error while getting all category ",
        error,
      });
  }
};

//single category
export const SingleCategoryController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await CategoryModel.findOne({slug})
    res
      .status(200)
      .send({ success: true, message: "get Single category successfully", category });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "error while getting single category ",
        error,
      });
  }
};

//delete category
export const DeleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id)
    res
      .status(200)
      .send({ success: true, message: "category deleted successfully", category });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "error while deleting ",
        error,
      });
  }
};

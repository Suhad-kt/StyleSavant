import { Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import userModel from "../model/userModel";

//protected Routes token base

export const ValidateToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const decode = Jwt.verify(
      req.headers.authorization as string,
      process.env.JWT_SECRET as string
    );  
    req.user = decode
    next();
  } catch (error) {
    res.status(404).send({ message: "token is not verified", error });
  }
};

//check isadmin or not
export const isadmin = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user?.role !== 1) {
       res
        .status(401)
        .send({ success:false, message: "Unuthorized Access" });
    } else {
      next()
    }
  } catch (error) {
    res.status(401).send({success:false, message: "error in Isadmin middleware", error });
  }
};

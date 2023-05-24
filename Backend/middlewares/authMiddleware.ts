import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import userModel from "../model/userModel";

//protected Routes token base

export const ValidateToken = async (req:any,res: Response,next: NextFunction) => {
  try {
    const decode = Jwt.verify(
        req.headers.authorization as string,
        process.env.JWT_SECRET as string
    )
    req.user = decode

    next();
  } catch (error) {
    res.status(404).json({ message: "token is not verified",error });
  }
};



//check isadmin or not
export const isadmin = async (req:any,res:Response,next:NextFunction) =>{
    try {
        const user = await userModel.findById(req.user_id)
       if(user?.role !== 1) return res.status(401).json({message:"Unuthorized Access"})
       else{
        next()
       }
    } catch (error) {
        res.status(401).json({message:"error in admin middleware",error})
    }
}
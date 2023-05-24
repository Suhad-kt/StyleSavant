import { Request, Response, NextFunction } from "express";
import users from "../model/userModel";
import { hashPassword } from "../helpers/authHelper";
import userModel from "../model/userModel";
import { user } from "../interface/user";

//register
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //check user
    const ExistingUser = await users.findOne({ email });
    //existing user
    if (ExistingUser) return res.status(500).json("Userm is already exist")

    //registerUser
    const hashedPassword =await hashPassword(password);
  
    //save
    const user = new users({
        name,
        email,
        password:hashedPassword,
        address,
        phone
    })
    if(!user) return res.status(500).json("User not found")
     const newUser= await user.save()
    res.status(200).json(newUser)

  } catch (error) {   
    res
      .status(404)
      .json({ success: false, message: "error in registeration", error });
  }
};


//login


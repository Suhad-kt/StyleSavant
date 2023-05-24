import { Request, Response, NextFunction } from "express";
import { comparePassword, hashPassword } from "../helpers/authHelper";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";

//registerController
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //check user
    const ExistingUser = await userModel.findOne({ email });
    //existing user
    if (ExistingUser) return res.status(500).json("User is already exist");

    //registerUser
    const hashedPassword = await hashPassword(password);

    //save
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    if (!user) return res.status(500).json("User not found");
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "error in registeration", error });
  }
};

//loginController
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //find user
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email is not registered" });

    // Compare Password with Hashedpassword
    const match = await comparePassword(password, user?.password as string);
    if (!match) return res.status(401).json("Invalid password");

    //Token
    if (user && match) {
      const accessToken = jwt.sign(
        {
          user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            _id: user._id,
          },
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
      res.status(200).json({ accessToken });
    }
  } catch (error) {
    res.status(500).json({ message: "error in login", error });
  }
};


//testcontroller
export const CurrentUser = async (req:Request,res:Response)=>{
  res.status(200).json("protected")
}
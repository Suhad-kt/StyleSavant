import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../helpers/authHelper";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";

//registerController
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address,answer} = req.body;
    if(!name || !email || !password || !phone || !address || !answer){
      res.status(404).send({success:false,messsage:"all fields mandataory"})
    }
    //check user
    const ExistingUser = await userModel.findOne({ email });
    //existing user
    if (ExistingUser)
      return res
        .status(200)
        .send({ success: true, message: "User is already exist please login" });

    //registerUser
    const hashedpassword = await hashPassword(password);

    //save
    const user = new userModel({
      name,
      email,
      password: hashedpassword,
      address,
      phone,
      answer
    });

    const newuser = await user.save()
    res
      .status(201)
      .send({ success: true, message: "User Register Successfully", newuser });

  } catch (error) {
    res
      .status(404)
      .send({ success: false, message: "error in registeration", error });
  }
};




//loginController
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //find user
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).send({success:false, message:"Email is not registered" });

    // Compare Password with Hashedpassword
    const match = await comparePassword(password, user.password as string);
    if (!match) return res.status(401).send({success:false,message:"Invalid password"});

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
      res.status(200).send({success:true,message:"Login Successfully", accessToken,user });
    }
  } catch (error) {
    res.status(500).send({success:false, message: "error in login", error });
  }
};


//forgotPasswordController
export const forgotPasswordController = async(req:Request,res:Response)=>{
  try {
    const {email,answer,password} =req.body
    if(!email || !answer || !password){
      res.status(400).send({success:false,message:"All field is mandaotary"})
      return;
    }
    //check email is available
    const user =await userModel.findOne({email,answer}).lean()

    //validation
    if(!user){
      res.status(404).send({sucess:false,message:"Wrong email or Answer"})
      return;
    }
    const hashedpassword = await hashPassword(password)
    //update password
    await userModel.findByIdAndUpdate(user._id,{password:hashedpassword})
    res.status(200).send({success:true,message:"password updated successfully"})
  } catch (error) {
    res.status(500).send({success:false,message:"something went wrong",error})
  }
}

//testcontroller
export const CurrentUser = async (req: Request, res: Response) => {
  res.status(200).send("protected");
};

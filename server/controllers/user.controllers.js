import { UserModel } from "../models/user.model.js";

export const getAllUser = async(req,res)=>{  
  try {
    //! get all user data
    const allUser = await UserModel.find();
    return res.send(allUser);
  } catch (error){
    console.log(error);
    return res.status(400).send({error: "bad request1"});
  }
}
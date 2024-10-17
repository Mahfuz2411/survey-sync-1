import { Activity } from "../constants/activity.constant.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

//! Should be verified for admin
export const getAllUser = async (req, res) => {
  try {
    //! get all user data
    const allUser = await UserModel.find().select("-password");
    return res.send(allUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "bad request" });
  }
};

//! Should be verified for admin
export const getParticulerUser = async (req, res) => {
  try {
    const email = req.impData.email;
    const user = await UserModel.findOne({ email });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "bad request" });
  }
};


//* ok
export const loginUser = async (req, res) => {
  try {
    const userData = req.body;
    // Verify a password
    const userFromDb = await UserModel.findOne({ email: userData.email });
    if(!userFromDb) return res.status(409).json({error: "User not found!"});
    const savedHashFromDatabase = userFromDb.password;
    const userEnteredPassword = userData.password;
    const abc = await bcrypt.compare(userEnteredPassword, savedHashFromDatabase);
    
    if(abc) {
      userFromDb.password = undefined;
      return res.status(200).json(userFromDb);
    } 

    return res.status(401).json({error: "Password doesn't matched"});
  } catch (error) {
    return res.status(500).json({ error: "Something Error Occured!" });
  }
};


//* ok
export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const saltRounds = Number(process.env.SALT_ROUNDS);

    userData.password = await bcrypt.hash(userData.password, saltRounds);

    const access = "user";
    const newUser = {
      ...userData,
      access,
      ...Activity,
    };
    const result = await UserModel.create(newUser);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({error: "Something error occurred!"});
  }
};


export const findUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UserModel.findUserById(id);
    if(!result) return res.status(401).json({error: "Unauthorized"});
    result.password = undefined;
    return res.json(result);
  } catch (error) {
    return res.status(500).json({error: "Something error occurred!"});
  }
};

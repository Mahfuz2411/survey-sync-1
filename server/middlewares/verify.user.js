import { UserModel } from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
  try{
    const email = req.headers.email;
    const query = { email: email };
    const impData = await UserModel.findOne(query);
    if(!impData) return res.status(401).json({error: "Unauthorized"});
    req.impData = impData;
    next();
  } catch (error) {
    return res.status(400).json({error: "Bad Request"})
  }
};
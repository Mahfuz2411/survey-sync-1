import { SurveyModel } from "../models/survey.model.js";
import { UserModel } from "../models/user.model.js";

export const verifySurveyor = async (req, res, next) => {
  try{
    const email = req.headers.email;
    const query = { email: email };
    const impData = await UserModel.findOne(query);
    if(!impData) return res.status(401).json({error: "Unauthorized"});
    if(impData.access != "surveyor") return res.status(401).json({error: "Unauthorized"});
    req.impData = impData;
    next();
  } catch (error) {
    return res.status(400).json({error: "Bad Request"})
  }
};

export const checkExistanceOfSurveys = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const email = req.impData.email;
    const prev = await SurveyModel.findOne({ _id, email });
    console.log(prev);
    if (!prev) return res.status(500).json({ error: "Not found!" });
    next();
  } catch (error) {
    console.log(error);
    
    return res.status(400).json({error: "Bad Request"});
  }
}
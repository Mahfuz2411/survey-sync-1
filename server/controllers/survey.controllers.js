import { Activity } from "../constants/activity.constant.js";
import { SurveyModel } from "../models/survey.model.js";

//* ok
export const allActiveSurvey = async (req, res) => {
  try {
    const surveys = await SurveyModel.find({ active: true });
    return res.status(200).json(surveys);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

//* ok
export const mySurveys = async (req, res) => {
  try {
    const surveyorID = req.impData._id;
    const surveys = await SurveyModel.find({ surveyorID });
    return res.status(200).json(surveys);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

//* ok
export const createSurvey = async (req, res) => {
  try {
    const impData = req.impData;
    const survey = req.body;
    const newSurvey = {
      ...survey,
      surveyorID: impData._id,
      fullName: impData.fullName,
      userImg: impData.img,
      email: impData.email,
      active: true,
      ...Activity,
    };
    const result = await SurveyModel.create(newSurvey);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

//* ok
export const deleteSurvey = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await SurveyModel.deleteOne({ _id });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

export const updateSurvey = async (req, res) => {
  try {
    const _id = req.params.id;
    const email = req.impData.email;
    const prev = await SurveyModel.findOne({ _id, email });
    if (!prev) return res.status(500).json({ error: "Not found!" });

    const result = await SurveyModel.updateOne(
      { _id },
      { question: req.body.question, description: req.body.description }
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

export const mostVotedSurveys = async (req, res) => {
  try {
    const surveys = await SurveyModel.find({ active: true }).sort({vote: -1}).limit(6);
    return res.status(200).json(surveys);
  } catch(error) {
    return res.status(500).json({error: error.message});
  }
}

export const  deactivateSurvey = async (req, res) => {
  try {
    const _id = req.params.id;
    // const email = req.impData.email;
    // const prev = await SurveyModel.findOne({ _id, email });
    // if (!prev) return res.status(500).json({ error: "Not found!" });

    const result = await SurveyModel.updateOne(
      { _id },
      { active: false }
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

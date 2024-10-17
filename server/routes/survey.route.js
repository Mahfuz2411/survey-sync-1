import express from "express";
import {
  allActiveSurvey,
  createSurvey,
  deactivateSurvey,
  deleteSurvey,
  mostVotedSurveys,
  mySurveys,
  updateSurvey,
} from "../controllers/survey.controllers.js";
import { checkExistanceOfSurveys, verifySurveyor } from "../middlewares/verify.suveyor.js";
import { verifyUser } from "../middlewares/verify.user.js";

const route = express.Router();

// routes for surveyors
route.post("/createsurvey", verifySurveyor, createSurvey);
route.put("/updatesurvey/:id", verifySurveyor, checkExistanceOfSurveys, updateSurvey);
route.get("/mysurveys", verifySurveyor, mySurveys);
route.delete("/delete/:id", verifySurveyor, checkExistanceOfSurveys, deleteSurvey);
route.put("/deactivatesurvey/:id", verifySurveyor, checkExistanceOfSurveys, deactivateSurvey);

// routes for user
route.get("/allsurveys", allActiveSurvey);
// route.get("/recentsurveys");
route.get("/mostvotedsurveys", mostVotedSurveys);

export const surveyRoute = route;

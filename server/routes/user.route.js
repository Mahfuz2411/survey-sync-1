import express from "express";
import {
  getParticulerUser,
  getAllUser,
  registerUser,
  loginUser,
  findUserByID,
} from "../controllers/user.controllers.js";
import { verifyUser } from "../middlewares/verify.user.js";
import { verifyAdmin } from "../middlewares/verify.admin.js";

const route = express.Router();

route.get("/allusers", verifyAdmin, getAllUser);
//! should be getParticulerSurveyor
// route.get("/surveyors", verifyUser, getParticulerUser);
route.post("/login", loginUser); 
route.post("/register", registerUser);

route.get("/:id", verifyUser, findUserByID);    // If any user want to visit others profile



export const userRoute = route;
import express from "express";
import { getAllUser } from "../controllers/user.controllers.js";

const route = express.Router();

route.get("/allusers", getAllUser);

export const userRoute = route;
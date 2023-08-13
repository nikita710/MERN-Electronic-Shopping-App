import express from "express";
import { signin, signup } from "../controller/authController.js";

const authRouts = express.Router();

authRouts.post("/signup", signup).post("/login", signin);

export default authRouts;

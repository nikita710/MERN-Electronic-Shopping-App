import express from "express";
import { fetchUserById, updateUser } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.patch("/:id", updateUser).get("/:id", fetchUserById);

export default userRoutes;

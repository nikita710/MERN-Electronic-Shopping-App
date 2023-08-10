import express from "express";
import {
  createCategory,
  fetchCategories,
} from "../controller/CategoriesController.js";
const categoriesRoutes = express.Router();

//create category
categoriesRoutes.post("/", createCategory).get("/", fetchCategories);

export default categoriesRoutes;

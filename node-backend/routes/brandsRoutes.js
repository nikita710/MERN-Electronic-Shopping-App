import express from "express";
import { createBrands, fetchBrands } from "../controller/BrandsController.js";

const brandRoutes = express.Router();

brandRoutes.post("/", createBrands).get("/", fetchBrands);

export default brandRoutes;

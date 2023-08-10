import express from "express";
import {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from "../controller/ProductsController.js";

const router = express.Router();

// Create Product Route
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);

export default router;

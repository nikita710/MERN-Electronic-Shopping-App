import express from "express";
import {
  addToCart,
  deleteCart,
  fetchItemsByUserId,
  updateCart,
} from "../controller/CartController.js";

const cartRoutes = express.Router();

cartRoutes
  .post("/", addToCart)
  .get("/", fetchItemsByUserId)
  .patch("/:id", updateCart)
  .delete("/:id", deleteCart);

export default cartRoutes;

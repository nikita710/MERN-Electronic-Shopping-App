import express from "express";
import {
  adminFetchAllOrders,
  createOrder,
  deleteOrder,
  fetchAllOrdersByUser,
  updateOrder,
} from "../controller/OrderController.js";
const orderRoutes = express.Router();

orderRoutes
  .post("/", createOrder)
  .get("/user/:userId", fetchAllOrdersByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder)
  .get("/", adminFetchAllOrders);

export default orderRoutes;

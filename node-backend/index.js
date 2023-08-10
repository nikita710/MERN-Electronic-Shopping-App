import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import categoriesRoutes from "./routes/categoriesRouter.js";
import brandRoutes from "./routes/brandsRoutes.js";
import cors from "cors";

// server object
const server = express();

// middleware
server.use(express.json()); // parse json request body
server.use(
  cors({
    exposeHeaders: ["X-Total-Count"],
  })
);

// routes
server.use("/products", productRoutes);
server.use("/categories", categoriesRoutes);
server.use("/brands", brandRoutes);

// Server initialization
server.get("/", (req, res) => {
  res.json({ status: "success" });
});

// without creating routes direct call APIs
// server.post("/products", createProduct);

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/electronics-db"
    );
    console.log(`Mongodb connection established ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to mongodb : ${error}`);
  }
};
connectDB();

// Server connection
server.listen(8080, () => {
  console.log("server listening on port 9595...");
});

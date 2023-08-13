import { Products } from "../model/ProductsModel.js";

// Create a new Product
export async function createProduct(req, res) {
  const product = new Products(req.body);

  try {
    const response = await product.save();
    // console.log(response);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Fetch all products with filtration
export async function fetchAllProducts(req, res) {
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }

  let query = Products.find(condition);
  let countProducts = Products.find(condition);

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    countProducts = countProducts.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    countProducts = countProducts.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalProducts = await countProducts.count().exec();
  // console.log({ totalProducts });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const products = await query.exec();
    res.set("X-Total-Count", totalProducts);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Find Product By Id
export async function fetchProductById(req, res) {
  const { id } = req.params;

  try {
    const result = await Products.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
}

// Update Product
export async function updateProduct(req, res) {
  const { id } = req.params;
  try {
    const result = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
}

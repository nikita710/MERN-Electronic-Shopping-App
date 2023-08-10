import { Categories } from "../model/CategoriesModel.js";

// Create a new category
export async function createCategory(req, res) {
  const category = new Categories(req.body);
  try {
    const result = await category.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
}

// Fetch categories
export async function fetchCategories(req, res) {
  try {
    const categories = await Categories.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json(error);
  }
}

import { Brands } from "../model/BrandsModel.js";

// create a new brand
export async function createBrands(req, res) {
  const brands = new Brands(req.body);
  try {
    const savedBrands = await brands.save();
    res.status(201).json(savedBrands);
  } catch (error) {
    res.status(404).json(error);
  }
}

// get all brands
export async function fetchBrands(req, res) {
  try {
    const brands = await Brands.find({});
    res.status(200).json(brands);
  } catch (error) {
    res.status(404).json(error);
  }
}

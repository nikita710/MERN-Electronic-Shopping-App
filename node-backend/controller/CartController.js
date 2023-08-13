import { Cart } from "../model/CartModel.js";

// Add To Cart
export async function addToCart(req, res) {
  const cartItems = new Cart(req.body);
  try {
    const savedCart = await cartItems.save();
    const cart = await savedCart.populate("product");
    res.status(201).json(cart);
  } catch (error) {
    res.status(404).json(error);
  }
}

// Fetch Cart By User Id
export async function fetchItemsByUserId(req, res, next) {
  const { user } = req.query;
  try {
    const cart = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Update Cart
export async function updateCart(req, res) {
  const { id } = req.params;
  try {
    const result = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const cart = await result.populate("product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json(error);
  }
}

// Delete Cart
export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

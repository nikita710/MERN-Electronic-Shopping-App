import { Orders } from "../model/OrderModel.js";

// Create Order
export async function createOrder(req, res) {
  const order = new Orders(req.body);
  try {
    const savedOrder = await order.save();
    res.status(200).send(savedOrder);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Fetch All Order BY User'
export async function fetchAllOrdersByUser(req, res) {
  const { userId } = req.params;
  try {
    const orders = await Orders.find({ user: userId }).populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Update order
export async function updateOrder(req, res) {
  const { id } = req.params;

  try {
    const order = await Orders.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Delete order
export async function deleteOrder(req, res) {
  const { id } = req.params;
  try {
    const order = await Orders.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json(error);
  }
}

// Fetch All Orders for Admin
export async function adminFetchAllOrders(req, res) {
  let query = Orders.find({});
  let countOrders = Orders.find({});

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  const totalOrders = await countOrders.count().exec();

  try {
    const orders = await query.exec();
    res.set("X-Total-Count", totalOrders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json(error);
  }
}

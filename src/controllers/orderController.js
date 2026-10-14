import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET /api/orders
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ uid: req.user.uid }).sort({ createdAt: -1 });
  res.json(orders);
});

// POST /api/orders  body: { items, total, status?, shippingAddress, shippingMethod }
export const createOrder = asyncHandler(async (req, res) => {
  const { items, total, status, shippingAddress, shippingMethod } = req.body;
  if (!items?.length) {
    res.status(400);
    throw new Error("Order has no items");
  }
  const order = await Order.create({
    orderId: `ORD-${Date.now()}`,
    uid: req.user.uid,
    items,
    total,
    status,
    shippingAddress,
    shippingMethod,
  });
  res.status(201).json(order);
});

// GET /api/orders/:orderId
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId, uid: req.user.uid });
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(order);
});

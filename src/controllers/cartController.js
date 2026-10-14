import Cart from "../models/Cart.js";
import asyncHandler from "../utils/asyncHandler.js";

const findCart = async (uid) =>
  (await Cart.findOne({ uid })) || (await Cart.create({ uid, items: [] }));

// GET /api/cart
export const getCart = asyncHandler(async (req, res) => {
  const cart = await findCart(req.user.uid);
  res.json(cart.items);
});

// POST /api/cart  body: { id, title, price, image, quantity }
export const addToCart = asyncHandler(async (req, res) => {
  const cart = await findCart(req.user.uid);
  const item = req.body;
  const existing = cart.items.find((i) => i.id === item.id);
  if (existing) existing.quantity += item.quantity || 1;
  else cart.items.push(item);
  await cart.save();
  res.status(201).json(cart.items);
});

// PUT /api/cart/:id  body: { quantity }
export const updateQuantity = asyncHandler(async (req, res) => {
  const cart = await findCart(req.user.uid);
  const item = cart.items.find((i) => i.id === Number(req.params.id));
  if (!item) {
    res.status(404);
    throw new Error("Item not in cart");
  }
  item.quantity = req.body.quantity;
  await cart.save();
  res.json(cart.items);
});

// DELETE /api/cart/:id
export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await findCart(req.user.uid);
  cart.items = cart.items.filter((i) => i.id !== Number(req.params.id));
  await cart.save();
  res.json(cart.items);
});

// DELETE /api/cart
export const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndUpdate({ uid: req.user.uid }, { items: [] }, { upsert: true });
  res.json([]);
});

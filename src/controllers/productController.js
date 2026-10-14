import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET /api/products?limit=30&skip=0
export const getProducts = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 30;
  const skip = Number(req.query.skip) || 0;
  const [products, total] = await Promise.all([
    Product.find().sort({ id: 1 }).skip(skip).limit(limit),
    Product.countDocuments(),
  ]);
  res.json({ products, total, skip, limit });
});

// GET /api/products/search?q=phone
export const searchProducts = asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  const products = await Product.find({ title: { $regex: q, $options: "i" } }).limit(20);
  res.json({ products, total: products.length });
});

// GET /api/products/categories
export const getCategories = asyncHandler(async (req, res) => {
  res.json(await Product.distinct("category"));
});

// GET /api/products/category/:category
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.category }).sort({ id: 1 });
  res.json({ products, total: products.length });
});

// GET /api/products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ id: Number(req.params.id) });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

import Wishlist from "../models/Wishlist.js";
import asyncHandler from "../utils/asyncHandler.js";

const findWishlist = async (uid) =>
  (await Wishlist.findOne({ uid })) || (await Wishlist.create({ uid, productIds: [] }));

// GET /api/wishlist
export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await findWishlist(req.user.uid);
  res.json(wishlist.productIds);
});

// POST /api/wishlist/:productId  (adds if missing, removes if present)
export const toggleWishlist = asyncHandler(async (req, res) => {
  const wishlist = await findWishlist(req.user.uid);
  const productId = Number(req.params.productId);
  wishlist.productIds = wishlist.productIds.includes(productId)
    ? wishlist.productIds.filter((id) => id !== productId)
    : [...wishlist.productIds, productId];
  await wishlist.save();
  res.json(wishlist.productIds);
});

// DELETE /api/wishlist
export const clearWishlist = asyncHandler(async (req, res) => {
  await Wishlist.findOneAndUpdate({ uid: req.user.uid }, { productIds: [] }, { upsert: true });
  res.json([]);
});

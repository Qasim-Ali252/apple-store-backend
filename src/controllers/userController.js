import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

// POST /api/users/sync  — call after Firebase sign in / sign up
export const syncUser = asyncHandler(async (req, res) => {
  const { displayName, photoURL } = req.body;
  const user = await User.findOneAndUpdate(
    { uid: req.user.uid },
    { email: req.user.email, displayName, photoURL, lastLogin: new Date() },
    { new: true, upsert: true }
  );
  res.json(user);
});

// GET /api/users/me
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.user.uid });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

// PUT /api/users/me  body: { displayName?, photoURL? }
export const updateMe = asyncHandler(async (req, res) => {
  const { displayName, photoURL } = req.body;
  const user = await User.findOneAndUpdate(
    { uid: req.user.uid },
    { displayName, photoURL },
    { new: true }
  );
  res.json(user);
});

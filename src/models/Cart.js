import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true }, // product id
    title: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);

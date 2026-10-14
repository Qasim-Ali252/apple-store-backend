import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // e.g. ORD-1700000000000
    uid: { type: String, required: true, index: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, default: "Processing" },
    shippingAddress: String,
    shippingMethod: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

// Mirrors the DummyJSON product shape the frontend already uses.
const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, index: true },
    price: { type: Number, required: true },
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    thumbnail: String,
    images: [String],
    reviews: [
      {
        rating: Number,
        comment: String,
        date: Date,
        reviewerName: String,
        reviewerEmail: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

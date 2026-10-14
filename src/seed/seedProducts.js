// Copies the DummyJSON catalog into MongoDB so the frontend's product pages keep working.
// Run with: npm run seed
import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

await connectDB();

const res = await fetch("https://dummyjson.com/products?limit=0");
const { products } = await res.json();

await Product.deleteMany({});
await Product.insertMany(products);
console.log(`Seeded ${products.length} products`);

await mongoose.disconnect();

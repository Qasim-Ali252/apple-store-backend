import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    email: { type: String, required: true },
    displayName: String,
    photoURL: String,
    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

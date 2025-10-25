// models/User.js
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Export directly without creating a "User" variable in this file
export default mongoose.models.User ?? mongoose.model("User", schema);

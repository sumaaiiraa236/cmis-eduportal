import dotenv from "dotenv";// --- 1️⃣ Load environment variables ---
import "dotenv/config"; // or use dotenv.config()

// --- 2️⃣ Import dependencies ---
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./models/routes/auth.js";
import studentRoutes from "./models/routes/students.js";

// --- 3️⃣ Initialize app ---
const app = express();
app.use(cors());
app.use(express.json());

// --- 4️⃣ Connect to MongoDB ---
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ No MongoDB URI found. Set MONGO_URI or MONGODB_URI in .env");
  process.exit(1);
}

try {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log("✅ MongoDB connected");
} catch (err) {
  console.error("MongoDB connection failed:", err);
  process.exit(1);
}

// --- 5️⃣ Use routes ---
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// --- 6️⃣ Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

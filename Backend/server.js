import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config(); // loads .env file

const app = express();

// connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // allows JSON body parsing

// Routes
app.use("/api/auth", authRoutes);     // signup/login
app.use("/api/posts", postRoutes);    // CRUD posts

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

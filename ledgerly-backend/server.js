import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// allowed origins (prod + dev)
const allowedOrigins = [
  process.env.FRONTEND_URL,         // Vercel frontend
  "http://localhost:3000",          // Local dev
  "http://127.0.0.1:3000"           // Local dev alternative
];

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(" Blocked by CORS:", origin);
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(`Allowed frontend: ${process.env.FRONTEND_URL}`);
});

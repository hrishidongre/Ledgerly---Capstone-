import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// allowed origins (ONLY production + localhost)
const allowedOrigins = [
  process.env.FRONTEND_URL,       // production: https://ledgerly-capstone.vercel.app
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin) return callback(null, true); // mobile/postman

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("CORS Not Allowed"));
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Allowed origins:", allowedOrigins);
});

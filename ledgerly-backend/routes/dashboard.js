import express from "express";
import prisma from "../utils/prisma.js";

const router = express.Router();

// Get dashboard data for authenticated user
router.get("/", async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Dashboard data retrieved", user });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

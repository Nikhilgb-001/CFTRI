// routes/dean.js
import express from "express";
import auth from "../middleware/auth.js";
import Dean from "../models/Dean.js";

const router = express.Router();

// Middleware to restrict to deans only
const deanOnly = (req, res, next) => {
  if (req.user.role !== "dean") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

router.get(
  "/dean/assigned-users",
  auth,
  deanOnly,
  async (req, res) => {
    try {
      // Look up this Dean and populate their processedUsers array:
      const dean = await Dean.findById(req.user.id)
        .populate({
          path: "processedUsers",
          select: "name email assignedTask taskStatus",
        });

      if (!dean) {
        return res.status(404).json({ message: "Dean not found" });
      }

      // Send back just the array of Users
      res.json(dean.processedUsers);
    } catch (err) {
      console.error("Error fetching assigned users:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;

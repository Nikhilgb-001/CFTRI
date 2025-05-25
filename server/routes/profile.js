import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Coordinator from "../models/Coordinator.js";

const router = express.Router();

// Get current user profile
// server/routes/profile.js
router.get("/", auth, async (req, res) => {
  try {
    console.log("Decoded token:", req.user); // Log the token payload
    let user;
    if (req.user.role === "user") {
      user = await User.findById(req.user.id);
    } else if (req.user.role === "admin") {
      user = await Admin.findById(req.user.id);
    } else if (req.user.role === "coordinator" || req.user.role === "dean") {
      // user = await Coordinator.findById(req.user.id);
      user = await Coordinator.findById(req.user.id).select("-password");
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: err.message });
  }
});

// Update profile
router.put("/", auth, async (req, res) => {
  try {
    let updated;
    if (req.user.role === "user") {
      updated = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
      });
    } else if (req.user.role === "admin") {
      updated = await Admin.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
      });
    } else if (req.user.role === "coordinator") {
      updated = await Coordinator.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
      });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/profile/tech-transfer-logs", auth, async (req, res) => {
  try {
    const u = await User.findById(req.user.id).select("techTransferLogs");
    res.json(u.techTransferLogs || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete profile
router.delete("/", auth, async (req, res) => {
  try {
    if (req.user.role === "user") {
      await User.findByIdAndDelete(req.user.id);
    } else if (req.user.role === "admin") {
      await Admin.findByIdAndDelete(req.user.id);
    } else if (req.user.role === "coordinator") {
      await Coordinator.findByIdAndDelete(req.user.id);
    }
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/technology", auth, async (req, res) => {
  try {
    const { discussionMatter, specificOption } = req.body;

    // map full label to your schema’s category enum
    const categoryMap = {
      "Bakery Products": "Bakery",
      "Beverage Products": "Beverage",
      "Cereal Products": "Cereal",
      "Convenience Products": "Convenience",
      "Food Machinery": "Machinery",
      "Fruits & Vegetable Products": "FruitsVegetables",
      "Meat & Marine Products": "MeatMarine",
      "Microbiology & Fermentation": "Microbiology",
      "Plantation & Spice Products": "PlantationSpice",
      "Protein Specialty Products": "Protein",
    };
    const category = categoryMap[discussionMatter];
    if (!category) {
      return res
        .status(400)
        .json({ message: `Invalid discussionMatter: ${discussionMatter}` });
    }

    // only users have technologies
    if (req.user.role !== "user") {
      return res
        .status(403)
        .json({ message: "Only users can add technologies" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // push new tech
    user.onboarding.technologies.push({
      item: specificOption,
      category,
    });

    await user.save();
    // return full updated user (or you could send back just the technologies array)
    res.json(user);
  } catch (err) {
    console.error("Error adding technology:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

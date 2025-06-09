import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Coordinator from "../models/Coordinator.js";
import Dean from "../models/Dean.js";
import auth from "../middleware/auth.js";

console.log("⚙️  auth.js loaded, mounting /assigned-users");

const router = express.Router();

// ----- USER (Lead) REGISTRATION & LOGIN -----

// Register user (lead) – includes onboarding data from multi-step form
router.post("/register/user", async (req, res) => {
  try {
    const { name, email, password, onboarding, contact } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      onboarding,
      contact,
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, user });
    console.log("Received payload:", req.body);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("Error during user registration:", err);
  }
});

// Login user
// Login user
router.post("/login/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    // Use process.env.JWT_SECRET instead of "your_jwt_secret"
    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash the new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // Directly update the password without re-validating the whole document
    await User.updateOne({ _id: user._id }, { $set: { password: hashed } });

    return res.json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("reset-password error:", err);
    return res.status(500).json({ message: err.message });
  }
});

// ----- ADMIN REGISTRATION & LOGIN -----

// Register admin
router.post("/register/admin", async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Admin already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, contact, password: hashedPassword });
    await admin.save();
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/register/dean", async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    const existing = await Dean.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Dean already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const dean = new Dean({ name, email, contact, password: hashedPassword });
    await dean.save();
    const token = jwt.sign(
      { id: dean._id, role: "dean" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, dean });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/assigned-users", auth, async (req, res) => {
  console.log(">>> /auth/assigned-users called, user:", req.user);
  // 1) Must be a dean
  if (req.user.role !== "dean") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const deanId = req.user.id;
    // 2) Find all leads/users assigned to this dean
    const users = await User.find({
      "onboarding.details.coordinator": deanId,
    }).select("-password");

    // 3) Send them back
    res.json(users);
  } catch (err) {
    console.error("assigned-users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login admin
router.post("/login/admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----- COORDINATOR REGISTRATION & LOGIN -----

router.post("/register/coordinator", async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    const existing = await Coordinator.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Coordinator already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const coordinator = new Coordinator({
      name,
      email,
      contact,
      password: hashedPassword,
    });
    await coordinator.save();
    const token = jwt.sign(
      { id: coordinator._id, role: "coordinator" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, coordinator });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login coordinator
router.post("/login/coordinator", async (req, res) => {
  try {
    const { email, password } = req.body;
    const coordinator = await Coordinator.findOne({ email });
    if (!coordinator)
      return res.status(400).json({ message: "Coordinator not found" });
    const isMatch = await bcrypt.compare(password, coordinator.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: coordinator._id, role: "coordinator" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, coordinator });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login dean
router.post("/login/dean", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Try to find a “new” dean
    let dean = await Dean.findOne({ email });

    // 2) If not found, check for a promoted coordinator
    if (!dean) {
      dean = await Coordinator.findOne({ email, role: "dean" });
    }

    if (!dean) {
      return res.status(400).json({ message: "Dean not found" });
    }

    // 3) Password check
    const isMatch = await bcrypt.compare(password, dean.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4) Issue JWT
    const token = jwt.sign(
      { id: dean._id, role: "dean" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5) Return the profile (minus the password)
    const { password: _, ...safeDean } = dean.toObject();
    res.json({ token, dean: safeDean });
  } catch (err) {
    console.error("Dean login error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const { id, role } = req.user;

    let user = null;
    if (role === "dean") {
      // 1) new-style Deans
      user = await Dean.findById(id).select("-password");
      // 2) promoted Coordinators
      if (!user) {
        user = await Coordinator.findOne({ _id: id, role: "dean" }).select(
          "-password"
        );
      }
    } else {
      // other roles
      const Model =
        role === "admin" ? Admin : role === "coordinator" ? Coordinator : User;
      user = await Model.findById(id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

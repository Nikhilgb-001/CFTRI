import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Coordinator from "../models/Coordinator.js";

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
    // only allow coordinators who have been promoted to dean
    const dean = await Coordinator.findOne({ email, role: "dean" });
    if (!dean)
      return res
        .status(400)
        .json({ message: "Dean not found or not promoted yet" });

    const isMatch = await bcrypt.compare(password, dean.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: dean._id, role: "dean" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // return the dean record (you can alias it or omit sensitive fields)
    res.json({ token, dean });
  } catch (err) {
    console.error("Dean login error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Coordinator from "../models/Coordinator.js";

// Note: For simplicity, no password hashing is done. In production use bcrypt.

export const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    // Assuming the email is stored in details.email
    const { email, password } = req.body;
    const user = await User.findOne({ "details.email": email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    if (admin.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerCoordinator = async (req, res) => {
  try {
    const newCoordinator = new Coordinator(req.body);
    await newCoordinator.save();
    res.status(201).json(newCoordinator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginCoordinator = async (req, res) => {
  try {
    const { email, password } = req.body;
    const coordinator = await Coordinator.findOne({ email });
    if (!coordinator)
      return res.status(404).json({ error: "Coordinator not found" });
    if (coordinator.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(coordinator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

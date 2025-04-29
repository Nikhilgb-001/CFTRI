import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Coordinator from "../models/Coordinator.js";

const getModel = (role) => {
  if (role === "user") return User;
  if (role === "admin") return Admin;
  if (role === "coordinator") return Coordinator;
  return null;
};

export const getProfile = async (req, res) => {
  try {
    const { role, id } = req.params;
    const Model = getModel(role);
    if (!Model) return res.status(400).json({ error: "Invalid role" });
    const profile = await Model.findById(id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { role, id } = req.params;
    const Model = getModel(role);
    if (!Model) return res.status(400).json({ error: "Invalid role" });
    const updatedProfile = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { role, id } = req.params;
    const Model = getModel(role);
    if (!Model) return res.status(400).json({ error: "Invalid role" });
    await Model.findByIdAndDelete(id);
    res.status(200).json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

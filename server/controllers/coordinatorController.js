import User from "../models/User.js";

export const getAssignedUsers = async (req, res) => {
  try {
    const { coordinatorId } = req.params;
    const users = await User.find({ "details.coordinator": coordinatorId });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    user.status = status;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

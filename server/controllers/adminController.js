import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("details.coordinator");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignCoordinator = async (req, res) => {
  try {
    const { userId } = req.params;
    const { coordinatorId, task } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    user.details.coordinator = coordinatorId;
    user.task = task;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdminChartData = async (req, res) => {
  try {
    // Example aggregations; extend this as needed.
    const users = await User.find();
    const leadValues = users.map((u) => u.details.leadValue);
    const chartData = {
      leadValues,
      weeklyLogins: users.length, // Dummy value; implement real aggregation if needed
      startDates: users.map((u) => u.startDate),
      endDates: users.map((u) => u.endDate),
    };
    res.status(200).json(chartData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

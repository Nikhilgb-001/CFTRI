import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Coordinator from "../models/Coordinator.js";
import Dean from "../models/Dean.js";
import ActionLog from "../models/ActionLog.js";

const router = express.Router();

// Only admin can access these routes
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
};

// Get all user leads (for admin dashboard tab 1)
router.get("/users", auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().populate("onboarding.details.coordinator");
    console.log("Number of users found:", users.length);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all coordinators (for assigning in the admin dashboard)
router.get("/coordinators", auth, adminOnly, async (req, res) => {
  try {
    const coordinators = await Coordinator.find();
    res.json(coordinators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Assign a coordinator and task to a user
router.put("/users/:userId/assign", auth, adminOnly, async (req, res) => {
  try {
    const { coordinatorId, task } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        "onboarding.details.coordinator": coordinatorId,
        assignedTask: task,
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/chart-data", auth, adminOnly, async (req, res) => {
  try {
    // Total lead value
    const leadValues = await User.aggregate([
      {
        $group: {
          _id: null,
          totalLeadValue: { $sum: "$onboarding.details.leadValue" },
        },
      },
    ]);

    // Lead values by type
    const leadTypes = await User.aggregate([
      {
        $group: {
          _id: "$onboarding.details.type",
          totalValue: { $sum: "$onboarding.details.leadValue" },
        },
      },
      {
        $match: { _id: { $ne: null } }, // Exclude null types
      },
    ]);

    // Calculate daily registrations (as proxy for logins) for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // include today: 7 days total
    const dailyRegistrations = await User.aggregate([
      {
        $match: { createdAt: { $gte: sevenDaysAgo } },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Prepare arrays for 7-day labels and counts
    const weeklyLabels = [];
    const weeklyLogins = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(sevenDaysAgo.getDate() + i);
      const dayStr = day.toISOString().split("T")[0];
      weeklyLabels.push(dayStr);
      const record = dailyRegistrations.find((r) => r._id === dayStr);
      weeklyLogins.push(record ? record.count : 0);
    }

    // Calculate daily registrations for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    const monthlyRegistrations = await User.aggregate([
      {
        $match: { createdAt: { $gte: thirtyDaysAgo } },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const monthlyLabels = [];
    const monthlyLogins = [];
    for (let i = 0; i < 30; i++) {
      const day = new Date();
      day.setDate(thirtyDaysAgo.getDate() + i);
      const dayStr = day.toISOString().split("T")[0];
      monthlyLabels.push(dayStr);
      const record = monthlyRegistrations.find((r) => r._id === dayStr);
      monthlyLogins.push(record ? record.count : 0);
    }

    res.json({
      leadValues: leadValues[0]?.totalLeadValue || 0,
      leadTypes: leadTypes || [],
      weeklyLogins,
      weeklyLabels,
      monthlyLogins,
      monthlyLabels,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/users/:id", auth, adminOnly, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted", deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a coordinator
router.delete("/coordinators/:id", auth, adminOnly, async (req, res) => {
  try {
    const deletedCoordinator = await Coordinator.findByIdAndDelete(
      req.params.id
    );
    res.json({ message: "Coordinator deleted", deletedCoordinator });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user (edit)
router.put("/users/:id", auth, adminOnly, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/deans", auth, adminOnly, async (req, res) => {
  try {
    const deans = await Dean.find();
    res.json(deans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /admin/deans
// — create a new Dean
router.post("/deans", auth, adminOnly, async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    const dean = new Dean({ name, email, contact, password });
    await dean.save();
    res.status(201).json(dean);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /admin/coordinators/:coordId/assign-dean
// — assign (or re-assign) a Dean to one Coordinator
router.put(
  "/coordinators/:coordId/assign-dean",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const { deanId } = req.body;
      const updated = await Coordinator.findByIdAndUpdate(
        req.params.coordId,
        { dean: deanId },
        { new: true }
      ).populate("dean", "name email");
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// GET /admin/deans/:deanId/coordinators
// — return every Coordinator whose `dean` field matches
router.get("/deans/:deanId/coordinators", auth, adminOnly, async (req, res) => {
  try {
    const list = await Coordinator.find({ dean: req.params.deanId });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/users/:userId/action-logs", auth, adminOnly, async (req, res) => {
  try {
    const logs = await ActionLog.find({ userId: req.params.userId })
      .sort({ date: -1 })
      .lean();
    console.log(
      `[action-logs] for ${req.params.userId}:`,
      logs.length,
      "entries"
    );
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put(
  "/coordinators/:coordId/promote",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const updated = await Coordinator.findByIdAndUpdate(
        req.params.coordId,
        { role: "dean" },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ message: "Coordinator not found" });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/users/processed", auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ processed: true }).populate(
      "onboarding.details.coordinator",
      "name email"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/users/:userId/assign-dean", auth, adminOnly, async (req, res) => {
  try {
    const { deanId } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const dean = await Dean.findById(deanId);
    if (!dean) return res.status(404).json({ message: "Dean not found" });

    // 1) mark user processed without triggering full-model validation
    await User.updateOne({ _id: user._id }, { $set: { processed: true } });

    // 2) initialize dean.processedUsers if needed
    dean.processedUsers = Array.isArray(dean.processedUsers)
      ? dean.processedUsers
      : [];

    // 3) add user to dean’s processedUsers
    if (!dean.processedUsers.some((id) => id.equals(user._id))) {
      dean.processedUsers.push(user._id);
      await dean.save();
    }

    return res.json({ message: "User assigned to Dean", dean });
  } catch (err) {
    console.error("assign-dean error:", err);
    return res.status(500).json({ message: err.message });
  }
});

// → Allow a Dean to fetch their assigned users
router.get("/dean/processed-users", auth, async (req, res) => {
  try {
    // req.user.id is the Dean’s _id because of how your login issues the token
    const dean = await Dean.findById(req.user.id).populate(
      "processedUsers",
      "name email contact"
    );
    if (!dean) return res.status(404).json({ message: "Dean not found" });
    return res.json(dean.processedUsers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;

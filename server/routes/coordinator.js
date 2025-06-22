import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Lead from "../models/Lead.js";
// import { generateExcelReport } from "../utils/excelGenerator.js";
import {
  generateTechTransferReport,
  generateExcelReport,
} from "../utils/excelGenerator.js";
import ActionLog from "../models/ActionLog.js";

import Coordinator from "../models/Coordinator.js";
import bcrypt from "bcrypt";
import TechTransferFlow from "../models/TechTransferFlow.js";

const router = express.Router();

// UPDATED: Allow access for both coordinators and admin users.
const coordinatorOnly = (req, res, next) => {
  if (
    req.user.role !== "coordinator" &&
    req.user.role !== "admin" &&
    req.user.role !== "dean"
  ) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// GET users assigned to the logged-in coordinator (or all users if admin)
router.get("/users", auth, coordinatorOnly, async (req, res) => {
  try {
    let users;
    if (req.user.role === "admin") {
      users = await User.find();
    } else if (req.user.role === "dean") {
      if (req.query.coordinatorId) {
        users = await User.find({
          "onboarding.details.coordinator": req.query.coordinatorId,
        });
      } else {
        users = await User.find();
      }
    } else {
      users = await User.find({
        "onboarding.details.coordinator": req.user.id,
      });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET stats for dashboard
router.get("/stats", auth, coordinatorOnly, async (req, res) => {
  try {
    let users, leads;
    if (req.user.role === "admin") {
      users = await User.find();
      leads = await Lead.find();
    } else {
      users = await User.find({
        "onboarding.details.coordinator": req.user.id,
      });
      leads = await Lead.find({
        "onboarding.details.coordinator": req.user.id,
      });
    }

    // Calculate ECF (monthly and yearly)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const paymentLogs = await ActionLog.find({
      coordinator: req.user.id,
      actionType: "Payment Received",
    });

    const monthlyEMF = paymentLogs
      .filter((log) => {
        const d = new Date(log.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, log) => sum + (log.amount || 0), 0);

    const yearlyEMF = paymentLogs
      .filter((log) => new Date(log.date).getFullYear() === currentYear)
      .reduce((sum, log) => sum + (log.amount || 0), 0);

    const monthlyECF = leads
      .filter(
        (lead) =>
          new Date(lead.createdAt).getMonth() === currentMonth &&
          new Date(lead.createdAt).getFullYear() === currentYear
      )
      .reduce((sum, lead) => sum + (lead.onboarding.details.leadValue || 0), 0);

    const yearlyECF = leads
      .filter((lead) => new Date(lead.createdAt).getFullYear() === currentYear)
      .reduce((sum, lead) => sum + (lead.onboarding.details.leadValue || 0), 0);

    // Task status counts
    const taskStats = {
      pending: users.filter((u) => u.taskStatus === "Pending").length,
      inProgress: users.filter((u) => u.taskStatus === "In Progress").length,
      completed: users.filter((u) => u.taskStatus === "Completed").length,
    };

    res.json({
      userCount: users.length,
      monthlyECF,
      yearlyECF,
      taskStats,
      monthlyEMF, // ← NEW
      yearlyEMF,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate Excel report
router.get("/report", auth, coordinatorOnly, async (req, res) => {
  try {
    let users;
    if (req.user.role === "admin") {
      users = await User.find();
    } else {
      users = await User.find({
        "onboarding.details.coordinator": req.user.id,
      });
    }

    const reportData = await generateExcelReport(users);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=coordinator-report.xlsx"
    );

    res.send(reportData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ACTION LOG routes
// routes/coordinator.js (or wherever you define action-log)
router.post("/action-log", auth, coordinatorOnly, async (req, res) => {
  try {
    const {
      actionType,
      category,
      details,
      amount,
      transactionId,
      date,
      userId,
    } = req.body;

    // 1) Save the ActionLog document
    const actionLog = new ActionLog({
      coordinator: req.user.id,
      actionType,
      category,
      details,
      transactionId,
      amount,
      date: date || new Date(),
      userId: userId || null,
    });
    await actionLog.save();

    // 2) If it's a tech‐transfer entry, push into the user's onboarding.techTransferLogs
    if (category === "Technology" && userId) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          "onboarding.techTransferLogs": {
            actionType,
            date: date || new Date(),
            details,
            transactionId,
            amount,
          },
        },
      });
    }

    // 3) Return the new log
    res.status(201).json(actionLog);
  } catch (err) {
    console.error("Error saving action log:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/action-logs", auth, coordinatorOnly, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "admin" && req.query.coordinatorId) {
      query.coordinator = req.query.coordinatorId;
    } else {
      query.coordinator = req.user.id;
    }

    const logs = await ActionLog.find(query)
      .populate("userId", "name email") // Add this line to populate user data
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/users/:userId/status", auth, coordinatorOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId, "onboarding.details.coordinator": req.user.id },
      { taskStatus: status },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or not assigned to you" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/users/:userId", auth, coordinatorOnly, async (req, res) => {
  try {
    const { name, email, assignedTask } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.userId,
        "onboarding.details.coordinator": req.user.id, // ensure that the user is assigned to the coordinator
      },
      { name, email, assignedTask },
      { new: true } // returns the updated document
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or not assigned to you" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ASSIGN task to a user
router.put(
  "/users/:userId/assign-task",
  auth,
  coordinatorOnly,
  async (req, res) => {
    try {
      const { task, startDate, endDate } = req.body;

      const start = new Date(startDate);
      const end = new Date(endDate);

      // zero out the time on both
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        return res
          .status(400)
          .json({ message: "Start date cannot be in the past (by day)" });
      }
      if (end < start) {
        return res
          .status(400)
          .json({ message: "End date must be on or after the start date" });
      }

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
          "onboarding.details.coordinator": req.user.id,
        },
        {
          assignedTask: task,
          taskStartDate: startDate,
          taskEndDate: endDate,
          taskStatus: "Pending",
        },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found or not assigned to you" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/analytics", auth, coordinatorOnly, async (req, res) => {
  try {
    let users, leads;
    if (req.user.role === "admin") {
      users = await User.find();
      leads = await Lead.find();
    } else {
      users = await User.find({
        "onboarding.details.coordinator": req.user.id,
      });
      leads = await Lead.find({
        "onboarding.details.coordinator": req.user.id,
      });
    }

    // Calculate ECF (monthly and yearly)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyECF = leads
      .filter(
        (lead) =>
          new Date(lead.createdAt).getMonth() === currentMonth &&
          new Date(lead.createdAt).getFullYear() === currentYear
      )
      .reduce((sum, lead) => sum + (lead.onboarding.details.leadValue || 0), 0);

    const yearlyECF = leads
      .filter((lead) => new Date(lead.createdAt).getFullYear() === currentYear)
      .reduce((sum, lead) => sum + (lead.onboarding.details.leadValue || 0), 0);

    // Task status counts
    const taskStats = {
      pending: users.filter((u) => u.taskStatus === "Pending").length,
      inProgress: users.filter((u) => u.taskStatus === "In Progress").length,
      completed: users.filter((u) => u.taskStatus === "Completed").length,
    };

    // Technology details aggregation
    const techDetails = {};
    let totalAmounts = 0;

    users.forEach((user) => {
      const techs = (user.onboarding && user.onboarding.technologies) || [];
      const projectSubject =
        user.onboarding && user.onboarding.details
          ? user.onboarding.details.subject
          : null;
      techs.forEach((tech) => {
        if (tech.item) {
          if (!techDetails[tech.item]) {
            techDetails[tech.item] = {
              count: 0,
              totalAmount: 0,
              projects: new Set(),
            };
          }
          techDetails[tech.item].count += 1;
          techDetails[tech.item].totalAmount += tech.amount || 0;
          totalAmounts += tech.amount || 0;
          if (projectSubject) {
            techDetails[tech.item].projects.add(projectSubject);
          }
        }
      });
    });

    Object.keys(techDetails).forEach((key) => {
      techDetails[key].projects = Array.from(techDetails[key].projects);
    });

    // Total payment received from leads (using leadValue)
    const totalPaymentReceived = leads.reduce(
      (sum, lead) => sum + (lead.onboarding?.details?.leadValue || 0),
      0
    );

    res.json({
      taskStats,
      techDetails,
      totalAmounts,
      totalPaymentReceived,
      monthlyECF,
      yearlyECF,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /coordinator/coordinators
// — list every coordinator (for Dean dashboard)
router.get("/coordinators", auth, coordinatorOnly, async (req, res) => {
  try {
    // only a Dean or Admin should hit this
    if (req.user.role === "coordinator")
      return res.status(403).json({ message: "Access denied" });

    const all = await Coordinator.find().select("-password");
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /coordinator/coordinators
// — create a new coordinator (Dean only)
router.post("/coordinators", auth, coordinatorOnly, async (req, res) => {
  try {
    if (req.user.role === "coordinator")
      return res.status(403).json({ message: "Access denied" });

    const { name, email, contact, password } = req.body;
    const exists = await Coordinator.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Coordinator already exists" });

    const hash = await bcrypt.hash(password, 10);
    const coord = new Coordinator({ name, email, contact, password: hash });
    await coord.save();
    res.status(201).json({ ...coord.toObject(), password: undefined });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /coordinator/coordinators/:id
// — delete a coordinator (Dean only)
router.delete("/coordinators/:id", auth, coordinatorOnly, async (req, res) => {
  try {
    if (req.user.role === "coordinator")
      return res.status(403).json({ message: "Access denied" });

    const deleted = await Coordinator.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", id: deleted._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/action-log", auth, coordinatorOnly, async (req, res) => {
  try {
    const {
      actionType,
      category,
      details,
      amount,
      transactionId,
      date,
      userId,
    } = req.body;

    const actionLog = new ActionLog({
      coordinator: req.user.id,
      actionType,
      category,
      details,
      transactionId,
      amount,
      date: date || new Date(),
      userId: userId || null, // Add user reference
    });

    await actionLog.save();

    // If this is a tech transfer action, update the user's tech transfer status
    if (category === "Technology" && userId) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          techTransferLogs: {
            actionType,
            date: date || new Date(),
            details,
            transactionId,
            amount,
          },
        },
      });
    }

    res.status(201).json(actionLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/action-logs", auth, coordinatorOnly, async (req, res) => {
  const logs = await ActionLog.find(query)
    .populate("userId", "name email") // ← this gives you log.userId.name
    .sort({ createdAt: -1 });
  res.json(logs);
});

// router.post("/tech-transfer-flow", auth, coordinatorOnly, async (req, res) => {
//   try {
//     console.log(
//       "\n📥 [tech-transfer] request body:",
//       JSON.stringify(req.body, null, 2)
//     );

//     const { steps } = req.body;

//     const filled = Array.isArray(steps)
//       ? steps.filter((s) => s.date || s.details)
//       : [];

//     if (filled.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Please provide at least one step with data." });
//     }

//     // map & validate just the ones they filled in
//     const mapped = filled.map((s, i) => ({
//       name: s.name,
//       date: new Date(s.date),
//       details: s.details || "",
//     }));

//     const flow = new TechTransferFlow({ dean: req.user.id, steps: mapped });
//     const saved = await flow.save();

//     console.log("✅ [tech-transfer] saved flow:", saved._id);
//     res.status(201).json(saved);
//   } catch (err) {
//     // Print the full stack to your server console
//     console.error("❌ [tech-transfer] Error saving:", err.stack);

//     // In dev you can return the stack so you see it in the browser console
//     res.status(err.name === "ValidationError" ? 400 : 500).json({
//       message: err.message,
//       stack: err.stack,
//     });
//   }
// });

// routes/coordinator.js
router.post("/tech-transfer-flow", auth, coordinatorOnly, async (req, res) => {
  try {
    const { steps, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Must provide userId" });
    }
    const filled = Array.isArray(steps)
      ? steps.filter((s) => s.date || s.details)
      : [];
    if (filled.length === 0) {
      return res.status(400).json({ message: "Provide at least one step" });
    }
    const mapped = filled.map((s) => ({
      name: s.name,
      date: new Date(s.date),
      details: s.details || "",
    }));

    // 1) save the flow document
    const flow = new TechTransferFlow({
      dean: req.user.id,
      user: userId,
      steps: mapped,
    });
    const saved = await flow.save();

    // 2) push each step into the user's onboarding.techTransferLogs
    await Promise.all(
      mapped.map((step) =>
        User.findByIdAndUpdate(userId, {
          $push: {
            "onboarding.techTransferLogs": {
              actionType: step.name,
              date: step.date,
              details: step.details,
            },
          },
        })
      )
    );

    // 3) respond
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ [tech-transfer] Error saving:", err);
    res
      .status(err.name === "ValidationError" ? 400 : 500)
      .json({ message: err.message });
  }
});

// router.get("/tech-transfer-flow", auth, coordinatorOnly, async (req, res) => {
//   try {
//     const { coordinatorId } = req.query;
//     // If admin passed a coordinatorId, filter by that; otherwise default to req.user.id
//     const filter = coordinatorId
//       ? { dean: coordinatorId }
//       : { dean: req.user.id };
//     const flows = await TechTransferFlow.find(filter)
//       .populate("dean", "name email") // populate dean's name & email
//       .sort({ createdAt: -1 });
//     res.json(flows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// GET all tech-transfer flows (admins see all, others filtered by dean or coordinatorId)
router.get("/tech-transfer-flow", auth, coordinatorOnly, async (req, res) => {
  try {
    const { coordinatorId } = req.query;

    // Admin should see every flow; others get filtered
    let filter = {};
    if (req.user.role !== "admin") {
      filter = coordinatorId ? { dean: coordinatorId } : { dean: req.user.id };
    }

    const flows = await TechTransferFlow.find(filter)
      .populate("dean", "name email")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(flows);
  } catch (err) {
    console.error("Error fetching tech-transfer flows:", err);
    res.status(500).json({ message: err.message });
  }
});

router.delete(
  "/tech-transfer-flow/:id",
  auth,
  coordinatorOnly,
  async (req, res) => {
    try {
      // Allow admin to delete any, otherwise ensure dean owns it
      const filter =
        req.user.role === "admin"
          ? { _id: req.params.id }
          : { _id: req.params.id, dean: req.user.id };

      const deleted = await TechTransferFlow.findOneAndDelete(filter);
      if (!deleted) {
        return res.status(404).json({ message: "Flow not found or not yours" });
      }
      res.json({ message: "Deleted", id: deleted._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/tech-transfer-report", auth, coordinatorOnly, async (req, res) => {
  try {
    const { flowIds } = req.query;
    if (!flowIds) {
      return res
        .status(400)
        .json({ message: "Must provide flowIds query parameter" });
    }
    const ids = flowIds.split(",");
    // fetch only this dean’s flows, and populate dean’s contact info
    const flows = await TechTransferFlow.find({
      dean: req.user.id,
      _id: { $in: ids },
    }).populate(
      "dean",
      "name onboarding.details.address onboarding.details.contact"
    );

    // generate and send the XLSX
    const buffer = await generateTechTransferReport(flows);
    res
      .header(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
      .header(
        "Content-Disposition",
        "attachment; filename=tech-transfer-report.xlsx"
      )
      .send(buffer);
  } catch (err) {
    console.error("❌ tech-transfer-report error:", err.stack);
    res.status(500).json({ message: err.message });
  }
});

router.put("/users/:id/process-completed", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { processed: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    // optionally: create an ActionLog entry here
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

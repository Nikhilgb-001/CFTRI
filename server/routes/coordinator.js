import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Lead from "../models/Lead.js";
import {
  generateExcelReport,
  generateTechTransferReport,
} from "../utils/excelGenerator.js";
import ActionLog from "../models/ActionLog.js";
import TechTransferFlow from "../models/TechTransferFlow.js";

const router = express.Router();

// UPDATED: Allow access for both coordinators and admin users.
const coordinatorOnly = (req, res, next) => {
  if (req.user.role !== "coordinator" && req.user.role !== "admin") {
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
router.post("/action-log", auth, coordinatorOnly, async (req, res) => {
  try {
    const { actionType, category, details, transactionId, date } = req.body;

    const actionLog = new ActionLog({
      coordinator: req.user.id,
      actionType,
      category,
      details,
      transactionId,
      date: date || new Date(),
    });

    await actionLog.save();
    res.status(201).json(actionLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.get("/action-logs", auth, coordinatorOnly, async (req, res) => {
//   try {
//     const logs = await ActionLog.find({ coordinator: req.user.id }).sort({
//       createdAt: -1,
//     });
//     res.json(logs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// updated action logs

router.get("/action-logs", auth, coordinatorOnly, async (req, res) => {
  try {
    let query = {};
    // If the user is an admin and has provided a coordinatorId in the query parameters,
    // use that for filtering. Otherwise, restrict to the logged-in user's ID.
    if (req.user.role === "admin" && req.query.coordinatorId) {
      query.coordinator = req.query.coordinatorId;
    } else {
      query.coordinator = req.user.id;
    }

    const logs = await ActionLog.find(query).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE task status for a user assigned to the logged-in coordinator
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

      // if (new Date(startDate) < new Date()) {
      //   return res
      //     .status(400)
      //     .json({ message: "Start date cannot be in the past" });
      // }
      // if (new Date(endDate) < new Date(startDate)) {
      //   return res
      //     .status(400)
      //     .json({ message: "End date must be after start date" });
      // }

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

// NEW: Analytics endpoint aggregating various metrics
// router.get("/analytics", auth, coordinatorOnly, async (req, res) => {
//   try {
//     let users, leads;
//     if (req.user.role === "admin") {
//       users = await User.find();
//       leads = await Lead.find();
//     } else {
//       users = await User.find({
//         "onboarding.details.coordinator": req.user.id,
//       });
//       leads = await Lead.find({
//         "onboarding.details.coordinator": req.user.id,
//       });
//     }

//     // 1. Task status counts
//     const taskStats = {
//       pending: users.filter((u) => u.taskStatus === "Pending").length,
//       inProgress: users.filter((u) => u.taskStatus === "In Progress").length,
//       completed: users.filter((u) => u.taskStatus === "Completed").length,
//     };

//     // 2. Technology details aggregation
//     const techDetails = {};
//     let totalAmounts = 0;

//     users.forEach((user) => {
//       const techs = (user.onboarding && user.onboarding.technologies) || [];
//       const projectSubject =
//         user.onboarding && user.onboarding.details
//           ? user.onboarding.details.subject
//           : null;
//       techs.forEach((tech) => {
//         if (tech.item) {
//           if (!techDetails[tech.item]) {
//             techDetails[tech.item] = {
//               count: 0,
//               totalAmount: 0,
//               projects: new Set(),
//             };
//           }
//           techDetails[tech.item].count += 1;
//           techDetails[tech.item].totalAmount += tech.amount || 0;
//           totalAmounts += tech.amount || 0;
//           if (projectSubject) {
//             techDetails[tech.item].projects.add(projectSubject);
//           }
//         }
//       });
//     });

//     Object.keys(techDetails).forEach((key) => {
//       techDetails[key].projects = Array.from(techDetails[key].projects);
//     });

//     // 3. Total payment received from leads (using leadValue)
//     const totalPaymentReceived = leads.reduce(
//       (sum, lead) => sum + (lead.onboarding?.details?.leadValue || 0),
//       0
//     );

//     // 4. Weekly user logins (assumes a 'lastLogin' field on user)
//     const weeklyLogins = {};
//     for (let i = 0; i < 7; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       const dateKey = date.toISOString().split("T")[0];
//       weeklyLogins[dateKey] = 0;
//     }
//     users.forEach((user) => {
//       if (user.lastLogin) {
//         const loginDate = new Date(user.lastLogin).toISOString().split("T")[0];
//         if (weeklyLogins.hasOwnProperty(loginDate)) {
//           weeklyLogins[loginDate]++;
//         }
//       }
//     });

//     res.json({
//       taskStats,
//       techDetails,
//       totalAmounts,
//       totalPaymentReceived,
//       weeklyLogins,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// In your coordinator.js, update the analytics endpoint:

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

// router.get("/tech-transfer-report", auth, coordinatorOnly, async (req, res) => {
//   try {
//     // fetch same users as /report
//     const users =
//       req.user.role === "admin"
//         ? await User.find()
//         : await User.find({
//             "onboarding.details.coordinator": req.user.id,
//           });

//     // your util should accept both users and the techFlow dates
//     const reportBuffer = await generateTechTransferReport(
//       users
//       /* you could pass req.body.techFlow or pull from DB if you saved it */
//     );

//     res
//       .set(
//         "Content-Type",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       )
//       .set(
//         "Content-Disposition",
//         "attachment; filename=tech-transfer-report.xlsx"
//       )
//       .send(reportBuffer);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// GET the saved flow for this coordinator
router.get("/tech-transfer-flow", auth, coordinatorOnly, async (req, res) => {
  // try {
  //   const doc = await TechTransferFlow.findOne({ coordinator: req.user.id });
  //   res.json(doc?.flows || []);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }

  try {
    // if I'm an admin and passed a coordinatorId, use that; otherwise use my own
    const coordId =
      req.user.role === "admin" && req.query.coordinatorId
        ? req.query.coordinatorId
        : req.user.id;

    // fetch ALL flow docs for that coordinator
    const docs = await TechTransferFlow.find({ coordinator: coordId })
      // if you want to show the user’s name & contact in the frontend table:
      .populate(
        "user",
        "name onboarding.details.address onboarding.details.contact"
      );

    // send back an array of documents; each has { flows: [ … ], user }
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST (or upsert) the flow
router.post("/tech-transfer-flow", auth, coordinatorOnly, async (req, res) => {
  try {
    const { flows } = req.body; // array of { step, date, details }
    const doc = await TechTransferFlow.findOneAndUpdate(
      { coordinator: req.user.id },
      { flows },
      { new: true, upsert: true }
    );
    res.json(doc.flows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/tech-transfer-report", auth, coordinatorOnly, async (req, res) => {
  try {
    // allow admin to pass ?coordinatorId=
    const coordId =
      req.user.role === "admin" && req.query.coordinatorId
        ? req.query.coordinatorId
        : req.user.id;

    // fetch and populate the user who did each flow
    const docs = await TechTransferFlow.find({ coordinator: coordId })
      .populate("coordinator", "name")
      .populate(
        "user",
        "name onboarding.details.address onboarding.details.contact"
      );

    const buffer = await generateTechTransferReport(docs); // util in excelGenerator.js :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}

    res
      .setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
      .setHeader(
        "Content-Disposition",
        `attachment; filename=tech-transfer-report.xlsx`
      )
      .send(buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

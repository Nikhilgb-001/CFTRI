// import express from "express";
// import bcrypt from "bcrypt"; // Optional: if you want to hash password for leads
// import Lead from "../models/Lead.js";

// const router = express.Router();

// // Route to create a lead
// // router.post("/createLead", async (req, res) => {
// //   try {
// //     const { name, email, password, onboarding } = req.body;

// //     // Optionally check if a lead with this email already exists
// //     const existing = await Lead.findOne({ email });
// //     if (existing)
// //       return res.status(400).json({ message: "Lead already exists" });

// //     // Optionally hash the password if it's provided and required
// //     let hashedPassword;
// //     if (password) {
// //       hashedPassword = await bcrypt.hash(password, 10);
// //     }

// //     const lead = new Lead({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       onboarding,
// //     });

// //     await lead.save();
// //     res.status(201).json({ lead });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //     console.error("Error creating lead:", err);
// //   }
// // });

// router.post("/createLead", async (req, res) => {
//   try {
//     console.log("Received data for new lead:", req.body); // Log entire payload

//     const { name, email, password, onboarding } = req.body;

//     if (!name || !email || !password || !onboarding) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const existing = await Lead.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Lead already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const lead = new Lead({
//       name,
//       email,
//       password: hashedPassword,
//       onboarding,
//     });

//     await lead.save();
//     console.log("Lead created successfully:", lead);
//     res.status(201).json({ lead });
//   } catch (err) {
//     console.error("Error creating lead:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // Get all leads
// router.get("/all", async (req, res) => {
//   try {
//     const leads = await Lead.find();
//     res.json(leads);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedLead = await Lead.findByIdAndDelete(req.params.id);
//     res.json({ message: "Lead deleted", deletedLead });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update a lead (edit)
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updatedLead);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;

import express from "express";
import bcrypt from "bcrypt";
import Lead from "../models/Lead.js";

const router = express.Router();

// Create a lead
router.post("/createLead", async (req, res) => {
  try {
    console.log("Received data for new lead:", req.body);

    const { name, email, password, onboarding } = req.body;
    if (!name || !email || !password || !onboarding) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await Lead.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Lead already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const lead = new Lead({
      name,
      email,
      password: hashedPassword,
      onboarding,
    });

    await lead.save();
    console.log("Lead created successfully:", lead);
    res.status(201).json({ lead });
  } catch (err) {
    console.error("Error creating lead:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all leads
router.get("/all", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a lead
router.delete("/:id", async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted", deletedLead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update (edit) a lead
router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedLead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

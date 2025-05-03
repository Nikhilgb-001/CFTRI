// models/Dean.js
import mongoose from "mongoose";

const deanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Dean", deanSchema);

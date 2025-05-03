import mongoose from "mongoose";

const coordinatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    // dean: { type: mongoose.Schema.Types.ObjectId, ref: "Dean" },
    role: {
      type: String,
      enum: ["coordinator","dean"],
      default: "coordinator"
    },
    // (you can still keep a "dean" field if you want to assign one to each coordinator)
    dean: { type: mongoose.Schema.Types.ObjectId, ref: "Coordinator" },
  },
  { timestamps: true }
);

export default mongoose.model("Coordinator", coordinatorSchema);

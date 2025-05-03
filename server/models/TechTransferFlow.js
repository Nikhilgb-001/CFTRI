// import mongoose from "mongoose";

// const FlowItemSchema = new mongoose.Schema({
//   step:    { type: String, required: true },
//   date:    { type: Date,   required: true },
//   details: { type: String, default: "" },
// });

// const TechTransferFlowSchema = new mongoose.Schema({
//   coordinator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
//   flows:       { type: [FlowItemSchema], default: [] },
// }, { timestamps: true });

// export default mongoose.model("TechTransferFlow", TechTransferFlowSchema);

// models/TechTransferFlow.js
// import mongoose from "mongoose";

// const FlowItemSchema = new mongoose.Schema({
//   step: { type: String, required: true },
//   date: { type: Date, required: true },
//   details: { type: String, default: "" },
// });

// const TechTransferFlowSchema = new mongoose.Schema(
//   {
//     coordinator: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     flows: { type: [FlowItemSchema], default: [] },
//   },
//   { timestamps: true }
// );

// // ensure one doc per coordinator+user pair
// TechTransferFlowSchema.index({ coordinator: 1, user: 1 }, { unique: true });

// export default mongoose.model("TechTransferFlow", TechTransferFlowSchema);

// models/TechTransferFlow.js
import mongoose from "mongoose";

const StepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String, default: "" },
});

const TechTransferFlowSchema = new mongoose.Schema(
  {
    dean: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    steps: { type: [StepSchema], required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TechTransferFlow", TechTransferFlowSchema);

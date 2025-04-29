// import mongoose from "mongoose";

// const leadSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String },
//     onboarding: {
//       details: {
//         subject: { type: String },
//         discussionMatter: { type: String },
//         leadValue: { type: Number },
//         source: { type: String },
//         type: { type: String },
//         expectedCloseDate: { type: Date },
//       },
//       contactPersons: [
//         {
//           name: { type: String },
//           emailType: { type: String },
//           emailDetail: { type: String },
//           contactNumberType: { type: String },
//           mobileDetail: { type: String },
//           organization: { type: String },
//         },
//       ],
//       technologies: [
//         {
//           item: { type: String },
//           price: { type: Number },
//           quantity: { type: Number },
//           amount: { type: Number },
//         },
//       ],
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Lead", leadSchema);

import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    onboarding: {
      details: {
        subject: { type: String },
        discussionMatter: { type: String },
        leadValue: { type: Number },
        source: { type: String },
        type: { type: String },
        expectedCloseDate: { type: Date },
      },
      contactPersons: [
        {
          name: { type: String },
          emailType: { type: String },
          emailDetail: { type: String },
          contactNumberType: { type: String },
          mobileDetail: { type: String },
          organization: { type: String },
        },
      ],
      technologies: [
        {
          item: { type: String },
          price: { type: Number },
          quantity: { type: Number },
          amount: { type: Number },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);

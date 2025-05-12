import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String },

    onboarding: {
      details: {
        subject: { type: String },
        discussionMatter: {
          type: String,
          enum: [
            "Bakery Products",
            "Beverage Products",
            "Cereal Products",
            "Convenience Products",
            "Food Machinery",
            "Fruits & Vegetable Products",
            "Meat & Marine Products",
            "Microbiology & Fermentation",
            "Plantation & Spice Products",
            "Protein Specialty Products",
          ],
        },
        type: {
          type: String,
          enum: [
            "Industrial Collaboration",
            "Technological Transfer",
            "Start-up",
            "MNC",
            "Women Entrepreneurship",
            "FPO",
            "SHC",
            "MSME",
          ],
        },
        state: { type: String },
        place: { type: String },
        address: { type: String },
        gender: {
          type: String,
          enum: ["Male", "Female", "Other"],
        },
        country: { type: String },
        category: {
          type: String,
          enum: ["SC/ST", "General", "OBC"],
        },
        designImprovement: { type: String },
        specificOption: { type: String },
        expectedCloseDate: { type: Date },
        coordinator: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Coordinator",
        },
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
          // For storing the specific product/technology selected
          item: { type: String },
          // For storing which category this belongs to
          category: {
            type: String,
            enum: [
              "Bakery",
              "Beverage",
              "Cereal",
              "Convenience",
              "Machinery",
              "FruitsVegetables",
              "MeatMarine",
              "Microbiology",
              "PlantationSpice",
              "Protein",
            ],
          },
          // Additional fields if needed
          description: { type: String },
          price: { type: Number },
          quantity: { type: Number },
          amount: { type: Number },
        },
      ],
    },

    assignedTask: { type: String, default: "" },
    taskStatus: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

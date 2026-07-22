import mongoose from "mongoose";

const projectManagerSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Project Manager code is required"],
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Project Manager name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      default: "",
    },
    mobile: {
      type: String,
      trim: true,
      default: "",
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    zipCode: {
      type: String,
      trim: true,
      default: "",
    },
    ptft: {
      type: String,
      enum: ["PT", "FT"],
      default: "FT",
    },
    availability: {
      type: String,
      default: "Full Time",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ProjectManager", projectManagerSchema);

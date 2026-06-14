import mongoose from "mongoose";

const monthwiseSaleSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    "2019-20": { type: Number, default: 0 },
    "2020-21": { type: Number, default: 0 },
    "2021-22": { type: Number, default: 0 },
    "2022-23": { type: Number, default: 0 },
    "2023-24": { type: Number, default: 0 },
    "2024-25": { type: Number, default: 0 },
    "2025-26": { type: Number, default: 0 },
    "2026-27": { type: Number, default: 0 },
    INR: { type: Number, default: 0 },
    USD: { type: Number, default: 0 },
    EUR: { type: Number, default: 0 },
    GBP: { type: Number, default: 0 },
    CAD: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("MonthwiseSale", monthwiseSaleSchema);

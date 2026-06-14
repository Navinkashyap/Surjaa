import mongoose from "mongoose";

const dailyRevenueSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    isWeekend: { type: Boolean, default: false },
    total: { type: Number, default: 0 },
    inr: { type: Number, default: 0 },
    usd: { type: Number, default: 0 },
    eur: { type: Number, default: 0 },
    gbp: { type: Number, default: 0 },
    cad: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("DailyRevenue", dailyRevenueSchema);

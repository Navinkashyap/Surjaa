import mongoose from "mongoose";

const ValueSchema = new mongoose.Schema({
  val: { type: Number, default: 0 },
  curr: { type: String, default: "" },
  pos: { type: String, default: "pre" }
}, { _id: false });

const MonthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  values: [ValueSchema]
}, { _id: false });

const yearwiseFinanceSchema = new mongoose.Schema(
  {
    quarter: { type: String, required: true },
    label: { type: String, required: true },
    qBg: { type: String, required: true },
    isOdd: { type: Boolean, default: false },
    months: [MonthSchema]
  },
  { timestamps: true }
);

export default mongoose.model("YearwiseFinance", yearwiseFinanceSchema);

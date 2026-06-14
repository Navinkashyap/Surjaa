import express from "express";
import YearwiseFinance from "../models/YearwiseFinance.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const records = await YearwiseFinance.find();
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const { data } = req.body;
    await YearwiseFinance.deleteMany({});
    const records = await YearwiseFinance.insertMany(data);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
});

export default router;

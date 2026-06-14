import express from "express";
import DailyRevenue from "../models/DailyRevenue.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const records = await DailyRevenue.find();
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const { data } = req.body;
    await DailyRevenue.deleteMany({});
    const records = await DailyRevenue.insertMany(data);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
});

export default router;

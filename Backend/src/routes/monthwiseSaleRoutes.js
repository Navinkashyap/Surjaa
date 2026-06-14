import express from "express";
import MonthwiseSale from "../models/MonthwiseSale.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const records = await MonthwiseSale.find();
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const { data } = req.body;
    await MonthwiseSale.deleteMany({});
    const records = await MonthwiseSale.insertMany(data);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await MonthwiseSale.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

export default router;

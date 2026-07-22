import express from "express";
import bcrypt from "bcryptjs";
import Vendor from "../models/Vendor.js";

const router = express.Router();

const formatVendor = (vendor) => ({
  _id: vendor._id,
  code: vendor.code,
  name: vendor.name,
  email: vendor.email,
  mobile: vendor.mobile,
  dob: vendor.dob ? new Date(vendor.dob).toISOString().split("T")[0] : "",
  gender: vendor.gender,
  country: vendor.country,
  motherTongue: vendor.motherTongue,
  ptft: vendor.ptft,
  availability: vendor.availability,
  address: vendor.address,
  serviceQuality: vendor.serviceQuality,
  taskQuality: vendor.taskQuality,
  timelyDelivery: vendor.timelyDelivery,
  isActive: vendor.isActive,
  createdAt: vendor.createdAt,
  updatedAt: vendor.updatedAt,
});

// Get all vendors
router.get("/", async (_req, res, next) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors.map(formatVendor));
  } catch (error) {
    next(error);
  }
});

// Search vendors
router.get("/search", async (req, res, next) => {
  try {
    const query = req.query.q || "";
    const vendors = await Vendor.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { code: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
    res.json(vendors.map(formatVendor));
  } catch (error) {
    next(error);
  }
});

// Get vendor by ID
router.get("/:id", async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json(formatVendor(vendor));
  } catch (error) {
    next(error);
  }
});

// Create new vendor
router.post("/", async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.password && data.password.trim()) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const vendor = await Vendor.create(data);
    res.status(201).json(formatVendor(vendor));
  } catch (error) {
    next(error);
  }
});

// Update vendor
router.put("/:id", async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.password && data.password.trim()) {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json(formatVendor(vendor));
  } catch (error) {
    next(error);
  }
});

// Delete vendor
router.delete("/:id", async (req, res, next) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json({ message: "Vendor deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

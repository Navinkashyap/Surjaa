import express from "express";
import bcrypt from "bcryptjs";
import ProjectManager from "../models/ProjectManager.js";

const router = express.Router();

const formatProjectManager = (pm) => ({
  _id: pm._id,
  code: pm.code,
  name: pm.name,
  email: pm.email,
  mobile: pm.mobile,
  dob: pm.dob ? new Date(pm.dob).toISOString().split("T")[0] : "",
  gender: pm.gender,
  country: pm.country,
  state: pm.state,
  city: pm.city,
  zipCode: pm.zipCode,
  ptft: pm.ptft,
  availability: pm.availability,
  address: pm.address,
  isActive: pm.isActive,
  createdAt: pm.createdAt,
  updatedAt: pm.updatedAt,
});

// Get all project managers
router.get("/", async (_req, res, next) => {
  try {
    const projectManagers = await ProjectManager.find().sort({ createdAt: -1 });
    res.json(projectManagers.map(formatProjectManager));
  } catch (error) {
    next(error);
  }
});

// Search project managers
router.get("/search", async (req, res, next) => {
  try {
    const query = req.query.q || "";
    const projectManagers = await ProjectManager.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { code: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
    res.json(projectManagers.map(formatProjectManager));
  } catch (error) {
    next(error);
  }
});

// Get project manager by ID
router.get("/:id", async (req, res, next) => {
  try {
    const pm = await ProjectManager.findById(req.params.id);
    if (!pm) {
      return res.status(404).json({ message: "Project Manager not found" });
    }
    res.json(formatProjectManager(pm));
  } catch (error) {
    next(error);
  }
});

// Create new project manager
router.post("/", async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.password && data.password.trim()) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const pm = await ProjectManager.create(data);
    res.status(201).json(formatProjectManager(pm));
  } catch (error) {
    next(error);
  }
});

// Update project manager
router.put("/:id", async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.password && data.password.trim()) {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }
    const pm = await ProjectManager.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!pm) {
      return res.status(404).json({ message: "Project Manager not found" });
    }
    res.json(formatProjectManager(pm));
  } catch (error) {
    next(error);
  }
});

// Delete project manager
router.delete("/:id", async (req, res, next) => {
  try {
    const pm = await ProjectManager.findByIdAndDelete(req.params.id);
    if (!pm) {
      return res.status(404).json({ message: "Project Manager not found" });
    }
    res.json({ message: "Project Manager deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

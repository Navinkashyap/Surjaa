import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Vendor from "../models/Vendor.js";
import ProjectManager from "../models/ProjectManager.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "default_super_secret_key_123";

// VMS Login — checks Vendor and ProjectManager collections
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Try Vendor Manager first
    let user = await Vendor.findOne({ email: email.toLowerCase() });
    let role = "vendor_manager";

    // If not found, try Project Manager
    if (!user) {
      user = await ProjectManager.findOne({ email: email.toLowerCase() });
      role = "project_manager";
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.password) {
      return res.status(401).json({ message: "Password not set. Contact admin." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if user is active
    if (user.isActive === false) {
      return res.status(403).json({ message: "Your account is deactivated. Contact admin." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Forgot password placeholder
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  // For now, just acknowledge the request
  return res.json({ message: "If this email exists, a password reset link will be sent." });
});

export default router;

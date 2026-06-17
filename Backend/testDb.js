import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./src/models/Admin.js";

// OLD database connection string from previous render.yaml
const uri = "mongodb+srv://piyush_db_user:navin123@cluster0.iapkvik.mongodb.net/sadminperfectras?appName=Cluster0";

async function seedAdmin() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to OLD MongoDB");

    const email = "piyush23india@gmail.com";
    const password = "Piyush@123";

    let admin = await Admin.findOne({ email });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = new Admin({
        email,
        password: hashedPassword,
        role: "superadmin"
      });
      await admin.save();
      console.log("Admin created successfully in OLD DB!");
    } else {
      console.log("Admin already exists in OLD DB. Updating password...");
      admin.password = await bcrypt.hash(password, 10);
      await admin.save();
      console.log("Admin password updated in OLD DB!");
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}
seedAdmin();

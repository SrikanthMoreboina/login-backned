import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

router.post("/login", async (req, res) => {
  const { empId, password } = req.body;

  const user = await User.findOne({ empId });
  if (!user) {
    return res.status(401).json({ message: "Invalid empId" });
  }

  if (!user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user._id, empId: user.empId },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      empId: user.empId,
      name: user.name,
      designation: user.designation,
      year: user.year
    }
  });
});

export default router;

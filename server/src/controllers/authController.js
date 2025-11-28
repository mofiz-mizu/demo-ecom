import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash: hash,
  });

  res.json({
    user,
    token: generateToken(user),
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  res.json({
    user,
    token: generateToken(user),
  });
};

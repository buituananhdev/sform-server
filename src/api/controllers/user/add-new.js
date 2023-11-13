import { User } from "../../../models/index.js";
import bcrypt from "bcrypt";
export default async (req, res) => {
  try {
    const newUser = new User(req.body);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

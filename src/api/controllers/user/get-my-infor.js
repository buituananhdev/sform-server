import { User } from "../../../models/index.js";

export default async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('_id name email');

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

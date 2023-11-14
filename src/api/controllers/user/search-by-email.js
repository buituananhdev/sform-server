import { User } from "../../../models/index.js";

export default async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required in the query parameters" });
    }

    const regex = new RegExp(email, "i");
    const users = await User.find({ email: { $regex: regex }, _id: { $ne: req.user._id } }).limit(10);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with the provided email" });
    }

    const userList = users.map((user) => ({
      id: user._id,
      email: user.email,
      name: user.name
    }));

    res.json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

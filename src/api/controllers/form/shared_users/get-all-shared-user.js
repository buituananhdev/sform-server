import { Form } from "../../../../models/index.js";
export default async (req, res) => {
  try {
    const form = req.form;
    res.json({ shared_users: form.shared_users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

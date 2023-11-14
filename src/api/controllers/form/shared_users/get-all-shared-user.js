import { Form } from "../../../../models/index.js";
export default async (req, res) => {
  try {
    const formId = req.params.id;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json({ shared_users: form.shared_users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

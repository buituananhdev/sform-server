import { Form } from "../../../models/index.js";

export default async (req, res) => {
  try {
    const shortId = req.params.id;

    const existingForm = await Form.findOne({ shortId });

    if (existingForm) {
      res.status(200).json({ formId: existingForm._id });
    } else {
      res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

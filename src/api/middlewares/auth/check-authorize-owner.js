import { Form } from '../../../models/index.js';

export default async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    if (form.ownerId.toString() !== req.user._id) {
      return res.status(403).json({ message: "You do not have permission to view this data" });
    }
    req.form = form;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

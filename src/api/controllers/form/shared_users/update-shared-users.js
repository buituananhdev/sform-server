import { Form } from "../../../../models/index.js";
export default async (req, res) => {
  try {
    const formId = req.params.id;
    const { sharedUsers } = req.body;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    form.shared_users = sharedUsers;
    await form.save();

    res.json({ message: 'Shared users updated successfully', data: form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

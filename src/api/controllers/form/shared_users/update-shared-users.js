import { Form } from "../../../../models/index.js";
export default async (req, res) => {
  try {
    const formId = req.params.id;
    const { sharedUsers } = req.body;

    await Form.updateOne({ _id: formId }, { shared_users: sharedUsers })

    res.json({ message: 'Shared users updated successfully', data: sharedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

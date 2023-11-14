import { getUserIdFromToken } from '../../../utils/helpers/jwt-token-helper.js';
import { Form, User } from '../../../models/index.js';

export default async (req, res, next) => {
  try {
    const userId = getUserIdFromToken(req.headers["authorization"]);
    const formId = req.params.id;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    if(form.ownerId.toString() == userId) {
      next();
      return;
    }
    const user = await User.findById(userId);
    if (!form.shared_users || !form.shared_users.includes(user.email)) {
      return res.status(403).json({ message: "You do not have permission to view or submit this form" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

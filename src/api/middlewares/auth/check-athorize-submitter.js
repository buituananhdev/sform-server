import { Form, User } from '../../../models/index.js';

export default async (req, res, next) => {
  try {
    const formId = req.params.id;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    if(!form.requiredAuth) {
      req.form = form;
      next();
      return;
  }
  console.log(form)

    if (form.ownerId.toString() === req.user._id) {
      req.form = form;
      next();
      return;
    }

    const user = await User.findById(req.user._id);
    if (!form.shared_users || !form.shared_users.includes(user.email)) {
      return res.status(403).json({ message: "You do not have permission to view or submit this form" });
    }

    req.form = form;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


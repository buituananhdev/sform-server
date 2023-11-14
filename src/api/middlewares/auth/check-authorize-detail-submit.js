import { Submission } from '../../../models/index.js';

export default async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id).populate({
      path: 'formId',
      populate: {
        path: 'ownerId',
        model: 'User'
      }
    });

    if (!submission || !submission.formId) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const form = submission.formId;

    if (form.ownerId._id.toString() !== req.user._id && submission.userId.toString() !== req.user._id) {
      return res.status(403).json({ message: "You do not have permission to view this data" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

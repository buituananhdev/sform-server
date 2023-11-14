import { Form } from "../../../models/index.js";

export default async (req, res) => {
  try {
    const form = await Form.findById(req.params.id)
      .populate("ownerId", "email name")
      .populate({
        path: "questions",
        model: "Question",
      })
      .exec();

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    const {
      _id,
      ownerId,
      title,
      description,
      shortId,
      questions,
      shared_users,
    } = form;

    const formDetails = {
      id: _id,
      owner: {
        email: ownerId.email,
        name: ownerId.name,
      },
      title,
      description,
      shortId,
      required: shortId,
      questions: questions.map((question) => {
        const {
          _id,
          label,
          type,
          validation,
          file,
          options,
        } = question;

        const questionDetails = {
          id: _id,
          label,
          type,
        };

        if (validation) {
          questionDetails.validation = JSON.parse(validation);
        }

        if (type === "file") {
          questionDetails.file = file;
        } else if (type === "check_box" || type === "drop_down") {
          questionDetails.options = options;
        }

        return questionDetails;
      }),
      shared_users,
    };

    res.status(200).json(formDetails);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

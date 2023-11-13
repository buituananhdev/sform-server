import { Form } from "../../../models/index.js";
import { getUserIdFromToken } from "../../../utils/helpers/jwt-token-helper.js";

export default async (req, res) => {
  try {
    console.log('check')
    const userId = getUserIdFromToken(req.headers["authorization"]);
    console.log('checkkkk', userId)
    const forms = await Form.find({ ownerId: userId })
      .populate("ownerId")
      .populate({
        path: "questions",
        model: "Question",
      })
      .exec();

    const formsDetails = forms.map((form) => {
      return {
        id: form._id,
        title: form.title,
        description: form.description,
        questions: form.questions.map((question) => {
          const questionDetails = {
            id: question._id,
            label: question.label,
            type: question.type,
            required: question.required,
          };

          if (question.validation) {
            questionDetails.validation = JSON.parse(question.validation);
          }

          if (question.type === "file") {
            questionDetails.file = question.file;
          } else if (
            question.type === "check_box" ||
            question.type === "drop_down"
          ) {
            questionDetails.options = question.options;
          }

          return questionDetails;
        }),
      };
    });

    res.json(formsDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

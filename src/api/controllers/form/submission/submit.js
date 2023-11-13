import { Form, Question, Answer, Submission } from "../../../../models/index.js";
import { getUserIdFromToken } from "../../../../utils/helpers/jwt-token-helper.js";
export default async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers["authorization"]);
    const formId = req.params.id;
    const { answers } = req.body;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    const submission = new Submission({
      formId,
      userId,
    });

    await submission.save();

    answers.forEach(async (answer) => {
      const { questionId, value } = answer;

      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      const newAnswer = new Answer({
        questionId,
        submissionId: submission._id,
        user: userId,
        value,
      });

      await newAnswer.save();
    });

    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

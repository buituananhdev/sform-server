import { Question, Answer, Submission, User } from "../../../../models/index.js";

export default async (req, res) => {
  try {
    const formId = req.params.id;
    const { answers } = req.body;

    const form = req.form;
    const user = await User.findById(req.user._id);
    if (!form.shared_users || !form.shared_users.includes(user.email)) {
      return res.status(403).json({ message: "You do not have permission to submit this form" });
    }

    const submission = new Submission({
      formId,
      userId: req.user._id,
    });

    await submission.save();

    const answerPromises = answers.map(async (answer) => {
      const { questionId, value } = answer;

      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      const newAnswer = new Answer({
        questionId,
        submissionId: submission._id,
        user: req.user._id,
        value,
      });

      await newAnswer.save();

      submission.answers.push(newAnswer._id);
    });

    await Promise.all(answerPromises);

    const savedSumission = await submission.save();

    res.json({ message: "Form submitted successfully", data: savedSumission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

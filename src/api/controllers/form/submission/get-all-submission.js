import {
  Form,
  Submission,
  Answer
} from "../../../../models/index.js";
export default async (req, res) => {
  try {
    // Lấy form thông qua form ID
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Lấy tất cả các submissions của form đó
    const submissions = await Submission.find({ formId: form._id })
      .populate("userId", "email name") // Thay 'userId' bằng tên reference field của User trong Submission model
      .populate({
        path: "answers",
        model: "Answer",
        populate: {
          path: "questionId",
          model: "Question",
        },
      })
      .exec();

    // Tạo một mảng chứa thông tin của từng submission
    const submissionsDetails = submissions.map((submission) => {
      return {
        id: submission._id,
        user: {
          email: submission.userId.email,
          name: submission.userId.name,
        },
        answers: submission.answers.map((answer) => {
          return {
            questionLabel: answer.questionId.label,
            value: answer.value,
          };
        }),
        createdAt: submission.createdAt,
        updatedAt: submission.updatedAt,
      };
    });

    // Trả về kết quả dưới dạng JSON
    res.json(submissionsDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

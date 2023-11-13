import { Submission, Answer } from "../../../../models/index.js";
export default async (req, res) => {
  try {
    // Lấy submission thông qua submission ID
    const submission = await Submission.findById(req.params.id)
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
    
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    console.log(submission);
    // Tạo đối tượng submissionDetails theo định dạng yêu cầu
    const submissionDetails = {
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

    // Trả về kết quả dưới dạng JSON
    res.json(submissionDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

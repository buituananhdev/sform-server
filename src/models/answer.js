import mongoose from "mongoose";
const { Schema, model } = mongoose;

const answerSchema = new Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    submissionId: { type: mongoose.Schema.Types.ObjectId, ref: "Submission" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    value: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

const Answer = model("Answer", answerSchema);
export default Answer;

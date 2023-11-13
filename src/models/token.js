import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tokenSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  access_token: { type: String },
  refresh_token: { type: String },
  expiresIn: { type: Number },
  createdAt: { type: Number },
});

const Token = model("Token", tokenSchema);

export default Token;

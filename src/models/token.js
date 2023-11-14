import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String },
  expiresIn: { type: Date },
  status: { type: Boolean, default: true }
},
  {
    timestamps: true
  });

const Token = model('Token', tokenSchema);

export default Token;
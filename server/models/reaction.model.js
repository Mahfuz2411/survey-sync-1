import mongoose, { Schema } from "mongoose";

const reactionSchema = new Schema({
  surveyId: {
    type: String,
    required: true,
  },
  usersFullName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  positive: {
    type: Boolean,
    required: true,
  }
});

export const ReactionModel = mongoose.model("reactions", likeSchema);
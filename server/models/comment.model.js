import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  surveyId: {
    type: String,
    required: true,
  },
  userFullName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  }
});

export const CommentModel = mongoose.model("comments", commentSchema);

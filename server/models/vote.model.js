import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema({
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

export const VoteModel = mongoose.model("votes", voteSchema);
import mongoose, { Schema } from "mongoose";

const surveySchema = new Schema({
  surveyorID: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
  },
  userImg: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: Boolean,
    required: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
  },
  question: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
  },
  yesVoted: {
    type: Number,
  },
  noVoted: {
    type: Number,
  },
  likeCount: {
    type: Number,
  }
});

export const SurveyModel = mongoose.model("surveys", surveySchema);

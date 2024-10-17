import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  img: {
    type: String,
    required: true
  },
  access: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  yesVoted: {
    type: Number,
  },
  noVoted: {
    type: Number,
  },
  likeCount: {
    type: Number,
  },
  disLikeCount: {
    type: Number,
  },
});

userSchema.post('save', function(doc, next) {
  doc.password = undefined
  return next()
});


userSchema.statics.findUserById = async (id) => {
  return await UserModel.findById(id);
}

export const UserModel = mongoose.model("users", userSchema);
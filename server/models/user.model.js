import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  access: {
    type: String,
    required: true
  }
});

export const UserModel = mongoose.model("users", userSchema);

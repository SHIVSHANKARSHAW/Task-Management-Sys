import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    required: true,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const User = mongoose.model("User", userSchema);

export default User;
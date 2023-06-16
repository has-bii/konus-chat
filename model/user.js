import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: [true, "Email already in used"],
    lowercase: true,
    trim: true,
    required: [true, "Email is required!"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  image: {
    type: String,
    default: "",
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);

import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Fullname is required!"],
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
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", userSchema);

export default User;

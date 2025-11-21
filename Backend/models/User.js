import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // no duplicate emails
    },

    password: {
      type: String,
      required: true,
      minlength: 6, // simple security measure
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

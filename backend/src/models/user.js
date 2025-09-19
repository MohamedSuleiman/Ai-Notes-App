import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

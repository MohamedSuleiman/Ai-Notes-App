import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expiresAT: {
      type: date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("token", tokenSchema);

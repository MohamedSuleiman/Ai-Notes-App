import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("token", tokenSchema);

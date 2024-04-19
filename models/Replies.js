import mongoose, { Schema } from "mongoose";

const RepliesSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    commentId: { type: Schema.Types.ObjectId, ref: "Comments", required: true },
    reply: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);
export default mongoose.model("Replies", RepliesSchema);

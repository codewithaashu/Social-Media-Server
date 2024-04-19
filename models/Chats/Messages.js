import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chats",
    },
    message: {
      type: String,
    },
    mediaSrc: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Messages", MessageSchema);

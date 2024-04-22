import mongoose, { Schema } from "mongoose";

//each chat data contains sender and reciever id as a members array and last message id
const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array, //in case of one-to-one chat it contains sender and reciver id
      required: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Messages",
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chats", ChatSchema);

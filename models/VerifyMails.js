import mongoose, { Schema } from "mongoose";

//create the schema for verify mail
const VerifyMailSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
  token: { type: String, required: true },
  messageId: { type: String, required: true },
  createdAt: { type: Date, expires: "1h", default: Date.now },
});

const VerifyMails = mongoose.model("VerifyMails", VerifyMailSchema);
export default VerifyMails;

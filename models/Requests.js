import mongoose, { Schema } from "mongoose";

const RequestSchema = new mongoose.Schema({
  requestFrom: { type: Schema.Types.ObjectId, required: true, ref: "Users" }, //User's id of  user
  requestTo: { type: Schema.Types.ObjectId, required: true, ref: "Users" }, //User's id of user
  status: {
    type: String,
    enum: ["Pending", "Accept", "Deny"],
    default: "Pending",
  },
});
export default mongoose.model("Requests", RequestSchema);

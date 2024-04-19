import mongoose from "mongoose";
const VerifyOTPSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  OTP: { type: String, required: true },
  createdAt: { type: Date, expires: "5m", default: Date.now },
});
export default mongoose.model("VerifyOTPs", VerifyOTPSchema);

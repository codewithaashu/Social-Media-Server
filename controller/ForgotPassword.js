import Users from "../models/Users.js";
import SendOTP from "../utils/SendOTP.js";

const ForgotPassword = async (req, res) => {
  try {
    //get the email from url
    const { email } = req.params;
    //check there is any user exist with this email or not
    //if user doesn't exist
    const userExist = await Users.findOne({ email, verified: true });
    if (!userExist) {
      return res.status(401).json({ message: "Invalid Email", success: false });
    }
    //send OTP  on email
    await SendOTP(userExist, res);
  } catch (err) {
    return res.status(500).json({
      message: "Error on reset password, try again",
      success: false,
    });
  }
};
export default ForgotPassword;

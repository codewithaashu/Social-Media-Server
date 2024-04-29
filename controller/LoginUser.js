import Users from "../models/Users.js";
import CompareString from "../utils/CompareString.js";
import GenerateToken from "../utils/GenerateToken.js";

const LoginUser = async (req, res) => {
  try {
    //accept email and password from  request body
    const { email, password } = req.body;
    //user exist or not with email and password
    const userExist = await Users.findOne({ email });
    //if user doesn't exist with email
    if (!userExist) {
      return res
        .status(401)
        .json({ message: "User doesn't exist", success: false });
    }
    //if user exist
    //check user is verified or not
    //if user is not verified
    if (!userExist.verified) {
      return res
        .status(403)
        .json({ message: "Verify your email.", success: false });
    }
    //if user verified
    //check password
    const isValidPassword = await CompareString(password, userExist.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Invalid Creditiantial", success: false });
    }

    //generate token using user's id and when we will decode the token it will return user's id
    //save token in cookie for authentication and send response to client side
    const token = GenerateToken(userExist._id);
    return res
      .cookie("access_token", token, {
        httpOnly: false,
        sameSite: "None",
        secure: true,
        partitioned: true,
        domain: ".vercel.app",
      })
      .status(200)
      .json({ message: "Login successfully.", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default LoginUser;

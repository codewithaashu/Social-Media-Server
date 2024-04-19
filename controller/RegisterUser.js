import Users from "../models/Users.js";
import HashString from "../utils/HashString.js";
import SendVerificationMail from "../utils/SendVerificationMail.js";

const RegisterUser = async (req, res) => {
  try {
    //accept data from frontend
    const { email, password } = req.body;

    //check user already exist or not
    const userExist = await Users.findOne({ email });

    //if user is exist
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "User is already registered",
      });
    }

    //if user doesn't exist

    //bcrypt the password
    const hashedPassword = await HashString(password);

    //create new user in Users collection;
    const user = await Users.create({ ...req.body, password: hashedPassword });

    //send verification mail  to user
    await SendVerificationMail(user, res);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
export default RegisterUser;

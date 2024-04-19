import Users from "../models/Users.js";

const GetUserDetails = async (req, res) => {
  try {
    //get the user id from request
    const { userId } = req;
    //get the user
    const user = await Users.findById(userId)
      .select("-password")
      .populate("friends", "firstName lastName profileUrl profession");
    //return back as a response
    return res
      .status(200)
      .json({ message: "User fetch successfully", success: true, user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, success: false, user: null });
  }
};
export default GetUserDetails;

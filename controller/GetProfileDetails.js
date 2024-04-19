import Posts from "../models/Posts.js";
import Users from "../models/Users.js";

const GetProfileDetails = async (req, res) => {
  try {
    //get the profile's userId from the params
    const { userId } = req.params;
    //get the user
    const user = await Users.findById(userId)
      .select("-password")
      .populate("friends", "firstName lastName profession profileUrl location");
    //if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false, userDetails: null });
    }
    //return the post of user
    const posts = await Posts.find({ userId })
      .populate("comments", "comment")
      .populate("userId", "firstName lastName profileUrl profession")
      .sort("-createdAt");
    return res.status(200).json({
      message: "User fetch successfully",
      success: true,
      userDetails: { user, posts },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, success: false, userDetails: null });
  }
};
export default GetProfileDetails;

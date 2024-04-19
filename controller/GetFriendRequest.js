import Requests from "../models/Requests.js";

const GetFriendRequest = async (req, res) => {
  try {
    //get the user's id from request
    const { userId } = req;
    //get the friend request from Requests model  using the userId as a parameter
    const requests = await Requests.find({ requestTo: userId })
      .populate("requestFrom", "firstName lastName profileUrl profession")
      .sort("-createdAt");
    return res.status(200).json({
      message: "Friend request fetched successfully",
      success: true,
      requests,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default GetFriendRequest;

import Replies from "../models/Replies.js";

const GetAllReply = async (req, res) => {
  try {
    //get commentId from params
    const { commentId } = req.params;
    const replies = await Replies.find({ commentId })
      .populate("userId", "firstName lastName profileUrl")
      .sort("-createdAt");
    return res.status(200).json({
      message: "Fetch Replies Successfully!",
      success: true,
      replies,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default GetAllReply;

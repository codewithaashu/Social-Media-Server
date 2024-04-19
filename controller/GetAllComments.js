import Comments from "../models/Comments.js";

const GetAllComments = async (req, res) => {
  try {
    //get the post id from params
    const { postId } = req.params;
    //fetch all comments of that post
    const comments = await Comments.find({ postId })
      .populate("userId", "firstName lastName profileUrl")
      .sort("-createdAt");
    return res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      comments,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default GetAllComments;

import Posts from "../models/Posts.js";

const PostDetails = async (req, res) => {
  try {
    //get postId from params
    const { postId } = req.params;
    //get post
    const post = await Posts.findById(postId)
      .sort("-createdAt")
      .populate("userId", "firstName lastName profileUrl")
      .populate("comments", "comment createdAt likes");
    //get comments
    // const comments = await Comment.find({post:postId}).sort({createdAt:-1});
    return res
      .status(200)
      .json({ message: "Post details successfully fetch", succes: true, post });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default PostDetails;

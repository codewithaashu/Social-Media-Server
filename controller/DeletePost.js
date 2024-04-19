import Posts from "../models/Posts.js";

const DeletePost = async (req, res) => {
  try {
    //get the post id from params
    const { postId } = req.params;
    //delete the post
    await Posts.findByIdAndDelete(postId, { new: true });
    return res.status(200).json({
      message: "Post deleted successfully.",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default DeletePost;

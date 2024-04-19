import Comments from "../models/Comments.js";
import Posts from "../models/Posts.js";

const CommentOnPost = async (req, res) => {
  try {
    //get the postId comment from req.body
    const { postId, comment } = req.body;
    //get the user's id from request object
    const { userId } = req;

    //create the comment
    const newComment = await Comments.create({
      comment,
      postId,
      userId,
    });

    //push comment id into comments array of post
    const post = await Posts.findById(postId);
    post.comments.push(newComment._id);
    await post.save();

    return res.status(201).json({
      message: "Post comment successfully.",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default CommentOnPost;

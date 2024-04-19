import Comments from "../models/Comments.js";

const LikeComment = async (req, res) => {
  try {
    //get the comment id from  req.params
    const { commentId } = req.params;
    //get the userId from request object
    const { userId } = req;

    //get comment info
    const comment = await Comments.findOne({ _id: commentId });
    //add the user's id  to likes array in comments collection
    //if user's id doesn't exist in likes then add the user's id in it. i.e. like comment
    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
      const updatedComment = await comment.save();
      return res.status(201).json({
        message: "Comment Liked Successfully!",
        likeCount: updatedComment.likes.length,
        likes: true,
        success: true,
      });
    }

    //user has already liked this comment so remove his/her id from likes and send response that you have dislike the comment
    comment.likes = comment.likes.filter((curr) => {
      return curr != userId; //remove userId from likes if already present
    });
    const updatedComment = await comment.save();
    return res.status(201).json({
      message: "Comment Disliked Successfully!",
      likeCount: updatedComment.likes.length,
      likes: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default LikeComment;

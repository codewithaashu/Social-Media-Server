import Comments from "../models/Comments.js";
import Replies from "../models/Replies.js";

const ReplyComment = async (req, res) => {
  try {
    //get the comment and commentId from request body
    const { reply, commentId } = req.body;
    //get the user's id from request
    const { userId } = req;

    //create the Replies
    const replies = await Replies.create({
      reply,
      commentId,
      userId,
    });

    //get the comment
    const comment = await Comments.findById(commentId);
    //add the replies id in comment's array field
    comment.replies.push(replies._id);
    const updatedComment = await comment.save();
    return res
      .status(201)
      .json({ message: "Reply on comment successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default ReplyComment;

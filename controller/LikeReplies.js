import Replies from "../models/Replies.js";

const LikeReplies = async (req, res) => {
  try {
    //get the reply id from  req.params
    const { replyId } = req.params;
    //get the userId from request object
    const { userId } = req;
    //get replies info
    const replies = await Replies.findOne({ _id: replyId });
    //add the user's id  to likes array in replies collection
    //if user's id doesn't exist in likes then add the user's id in it. i.e. like replies
    if (!replies.likes.includes(userId)) {
      replies.likes.push(userId);
      const updatedReplies = await replies.save();
      return res.status(201).json({
        message: "Replies Liked Successfully!",
        likeCount: updatedReplies.likes.length,
        likes: true,
        success: true,
      });
    }

    //user has already liked this reply so remove his/her id from likes and send response that you have dislike the reply
    replies.likes = replies.likes.filter((curr) => {
      return curr != userId; //remove userId from likes if already present
    });
    const updatedReplies = await replies.save();
    return res.status(201).json({
      message: "Replies Disliked Successfully!",
      likeCount: updatedReplies.likes.length,
      likes: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default LikeReplies;

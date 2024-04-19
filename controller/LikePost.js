import Posts from "../models/Posts.js";

const LikePost = async (req, res) => {
  try {
    //get the post id from params
    const { postId } = req.params;
    //get the userId from request object
    const { userId } = req;

    //get post info
    const post = await Posts.findOne({ _id: postId });
    //add the user's id  to likes array in posts collection
    //if user's id doesn't exist in likes then add the user's id in it. i.e. like post
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      const updatedPost = await post.save();
      return res.status(201).json({
        message: "Post Liked Successfully!",
        likeCount: updatedPost.likes.length,
        likes: true,
        success: true,
      });
    }

    //user has already liked this post so remove his/her id from likes and send response that you have dislike the post
    post.likes = post.likes.filter((curr) => {
      return curr != userId; //remove userId from likes if already present
    });
    const updatedPost = await post.save();
    return res.status(201).json({
      message: "Post Disliked Successfully!",
      likeCount: updatedPost.likes.length,
      likes: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default LikePost;

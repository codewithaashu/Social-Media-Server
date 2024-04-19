import Posts from "../models/Posts.js";

const GetUserPosts = async (req, res) => {
  try {
    //get the user's id from params
    const { userId } = req.params;
    //fetch all post of that userId and also populate the document of user model.
    //populate method takes two argument first one is foreign key and set of fields i.e. we want to show
    //in populate method we have to pass the set of fields that we want to show. if we do not pass . it populate all the fields. you can remove a field by '-'.
    const posts = await Posts.find({ userId })
      .sort("-createdAt")
      .populate("userId", "firstName lastName profileUrl")
      .populate("comments", "comment createdAt likes");
    return res
      .status(200)
      .json({ message: "Post fetch successfully", success: true, posts });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default GetUserPosts;

import Posts from "../models/Posts.js";
import Users from "../models/Users.js";

const GetAllPosts = async (req, res) => {
  try {
    //get the user's id i.e. decode from cookies
    const { userId } = req;
    //get the friends of users
    const { friends } = await Users.findById(userId);
    //write the query
    const query = { userId: { $in: [userId, ...friends] } }; //it return the array of id of user and their friends
    //get the user's and their friends post
    let posts = await Posts.find(query)
      .sort("-createdAt")
      .populate("userId", "email profileUrl firstName lastName");
    //if user and his/her friends post is not found
    if (posts.length === 0) {
      posts = await Posts.find({})
        .sort("-createdAt")
        .populate("userId", "email profileUrl firstName lastName")
        .limit(10);
    }
    return res
      .status(200)
      .json({ message: "Post fetch successfully", success: true, posts });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default GetAllPosts;
//populate method takes two argument first one is foreign key and set of fields i.e. we want to show
//in populate method we have to pass the set of fields that we want to show. if we do not pass . it populate all the fields. you can remove a field by '-'.

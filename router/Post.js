import express from "express";
import CreatePost from "../controller/CreatePost.js";
import DeletePost from "../controller/DeletePost.js";
import LikePost from "../controller/LikePost.js";
import CommentOnPost from "../controller/CommentOnPost.js";
import GetUserPosts from "../controller/GetUserPosts.js";
import GetAllPosts from "../controller/GetAllPosts.js";
import Authentication from "../middleware/Authentication.js";
import GetAllComments from "../controller/GetAllComments.js";
import PostDetails from "../controller/PostDetails.js";

const PostRouter = express.Router();

PostRouter.get("/:userId", Authentication, GetUserPosts);
PostRouter.get("/details/:postId", Authentication, PostDetails);
PostRouter.get("/", Authentication, GetAllPosts);
PostRouter.post("/create", Authentication, CreatePost);
PostRouter.delete("/delete/:postId", DeletePost);
PostRouter.put("/like/:postId", Authentication, LikePost);
PostRouter.post("/comment", Authentication, CommentOnPost);
PostRouter.get("/comments/:postId", Authentication, GetAllComments);

export default PostRouter;

import express from "express";
import LikeComment from "../controller/LikeComment.js";
import ReplyComment from "../controller/ReplyComment.js";
import Authentication from "../middleware/Authentication.js";
import GetAllReply from "../controller/GetAllReply.js";
import LikeReplies from "../controller/LikeReplies.js";

//create an instance of router
const CommentRouter = express.Router();

CommentRouter.put("/like/:commentId", Authentication, LikeComment);
CommentRouter.post("/add-reply", Authentication, ReplyComment);
CommentRouter.get("/replies/:commentId", Authentication, GetAllReply);
CommentRouter.put("/replies/like/:replyId", Authentication, LikeReplies);
export default CommentRouter;

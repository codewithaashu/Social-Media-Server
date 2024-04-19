import mongoose, { Schema } from "mongoose";

//create the schema for comments
const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "Users" }], //array of Users'id who liked this post
    postId: { type: Schema.Types.ObjectId, ref: "Posts", required: true }, //id's of Post that this comment is related to
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true }, //User's id who posted this comment
    replies: [{ type: Schema.Types.ObjectId, ref: "Replies" }], //array of reply's comments id
  },
  { timestamps: true }
);

export default mongoose.model("Comments", CommentSchema);

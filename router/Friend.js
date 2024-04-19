import express from "express";
import SendRequest from "../controller/SendRequest.js";
import AcceptRequest from "../controller/AcceptRequest.js";
import SuggestedFriends from "../controller/SuggestedFriends.js";
import Authentication from "../middleware/Authentication.js";
import GetFriendRequest from "../controller/GetFriendRequest.js";
import RequestList from "../controller/RequestList.js";

const FriendRouter = express.Router();

FriendRouter.get("/request", Authentication, GetFriendRequest);
FriendRouter.get("/requests", Authentication, RequestList);
FriendRouter.post("/request-send", Authentication, SendRequest);
FriendRouter.put(
  "/request-accept/:requestId/:status",
  Authentication,
  AcceptRequest
);
FriendRouter.get("/suggested", Authentication, SuggestedFriends);

export default FriendRouter;

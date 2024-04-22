import express from "express";
import GetAllChats from "../controller/Chats/GetAllChats.js";
import Authentication from "../middleware/Authentication.js";
import SendMessage from "../controller/Chats/SendMessage.js";
import GetAllMessages from "../controller/Chats/GetAllMessages.js";
import BlockUnblockUser from "../controller/Chats/BlockUnblockUser.js";
import DeleteChats from "../controller/Chats/DeleteChats.js";

const ChatRouter = express.Router();

ChatRouter.get("/", Authentication, GetAllChats);
ChatRouter.post("/message", Authentication, SendMessage);
ChatRouter.get("/message/:id", Authentication, GetAllMessages);
ChatRouter.put("/block", Authentication, BlockUnblockUser);
ChatRouter.put("/delete/:id", Authentication, DeleteChats);

export default ChatRouter;

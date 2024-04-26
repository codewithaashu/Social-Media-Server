import Chats from "../../models/Chats/Chats.js";
import Messages from "../../models/Chats/Messages.js";

const SendMessage = async (req, res) => {
  try {
    //get userId (which is also a sender) from req object
    const { userId } = req;
    //get message,mediaSrc and recieverId from req.body
    const { message, mediaSrc, recieverId } = req.body;

    //get the chatId using recieverId and userId
    let chatId = await Chats.findOne({
      members: { $all: [userId, recieverId] },
    });
    //if chatId doesn't exist, i.e. user send message first time then create a chat
    if (!chatId) {
      const chat = await Chats.create({
        members: [userId, recieverId],
      });
      chatId = chat._id;
    }
    //if chat is blocked by reciever then don't send message
    if (chatId?.isBlock) {
      return res
        .status(404)
        .json({ message: "User has been block", success: false });
    }

    //create message
    const newMessage = await Messages.create({
      message,
      mediaSrc,
      chatId,
      sender: userId,
    });

    //update last message
    await Chats.findByIdAndUpdate(chatId, {
      lastMessage: newMessage._id,
    });

    return res.status(201).json({
      message: "Message sent successfully",
      success: true,
      newMessage,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export default SendMessage;

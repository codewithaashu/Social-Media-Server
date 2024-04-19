import Chats from "../../models/Chats/Chats.js";
import Messages from "../../models/Chats/Messages.js";

const GetAllMessages = async (req, res) => {
  try {
    //get userId from req object
    const { userId } = req;
    //get other chat member id from req.params
    const member = req.params.id;
    //get the chatId
    const chatId = await Chats.findOne({
      members: { $all: [userId, member] },
    });
    //if chatId doesn't exist
    if (!chatId) {
      return res.status(404).json({
        message: "Chat not found.",
        success: false,
        messages: [],
      });
    }
    //get all messages corresponding to the chatId
    const messages = await Messages.find({ chatId });
    return res.status(200).json({
      message: "Messages successfully fetched.",
      success: true,
      messages,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export default GetAllMessages;

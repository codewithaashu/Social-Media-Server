import Chats from "../../models/Chats/Chats.js";

const DeleteChats = async (req, res) => {
  try {
    //get userId from req object
    const { userId } = req;
    //get other chat member id from req.params
    const memberId = req.params.id;
    //get the chat
    const chat = await Chats.findOne({
      members: { $all: [userId, memberId] },
    });
    //if chat doesn't exist
    if (!chat) {
      return res.status(404).json({
        message: "Chat not found.",
        success: false,
      });
    }
    //if chat exist, delete chat
    await Chats.findByIdAndDelete(chat._id);
    //send updated chats
    const query = { members: { $in: [userId] } }; //get a data in which members array contain userId
    const chats = await Chats.find(query).populate("lastMessage", "message");
    //return response
    return res
      .status(200)
      .json({ message: "Chat deleted successfully", success: true, chats });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export default DeleteChats;

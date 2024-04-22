import Chats from "../../models/Chats/Chats.js";

const BlockUnblockUser = async (req, res) => {
  try {
    //get userId from req object
    const { userId } = req;
    //get other chat member id and status from req.body
    const { memberId, status } = req.body;
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
    //block the user
    const updatedChat = await Chats.findByIdAndUpdate(
      chat._id,
      {
        isBlock: status,
      },
      { new: true }
    );
    return res.status(200).json({
      message: `User ${updatedChat.isBlock ? "Block" : "Unblock"} successfully`,
      success: true,
      chat: updatedChat,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export default BlockUnblockUser;

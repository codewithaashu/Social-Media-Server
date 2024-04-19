import Chats from "../../models/Chats/Chats.js";

const GetAllChats = async (req, res) => {
  try {
    //get usrr id from request object
    const { userId } = req;

    //get all chats of user
    const query = { members: { $in: [userId] } }; //get a data in which members array contain userId
    const chats = await Chats.find(query).populate("lastMessage", "message");
    return res
      .status(200)
      .json({ message: "Chats successfully fetched.", chats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default GetAllChats;

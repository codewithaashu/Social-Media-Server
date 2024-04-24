import Users from "../models/Users.js";

const SuggestedFriends = async (req, res) => {
  try {
    //get userId from request
    const { userId } = req;
    //get the user's friend
    const { friends } = await Users.findById(userId);
    //write the query for suggested peoples
    const query = { _id: { $nin: [...friends, userId] } };
    //fetch users who is not user's friend and user's itself.
    const suggestedFriends = await Users.find(query)
      .select("profileUrl firstName lastName profession")
      .limit(10);
    return res.status(200).json({
      message: "Suggested friends fetched successfully",
      success: true,
      suggestedFriends,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default SuggestedFriends;

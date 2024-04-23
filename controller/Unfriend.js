import Users from "../models/Users.js";

const Unfriend = async (req, res) => {
  try {
    //get the userId from req object
    const { userId } = req;
    //get the friendsId from req params
    const { friendId } = req.params;
    //remove friendId from user's friends array
    const user = await Users.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    )
      .select("-password")
      .populate("friends", "firstName lastName profileUrl profession location");
    //remove userId from friend's friends array
    const friends = await Users.findByIdAndUpdate(
      friendId,
      { $pull: { friends: userId } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Unfriend successfully", success: true, user });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default Unfriend;

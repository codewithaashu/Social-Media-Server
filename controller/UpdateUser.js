import Users from "../models/Users.js";

const UpdateUser = async (req, res) => {
  try {
    //get the userId from request object
    const { userId } = req;
    //update user
    const updateUser = await Users.findByIdAndUpdate(userId, req.body, {
      new: true,
    })
      .select("-password")
      .populate("friends", "firstName lastName profileUrl profession");
    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      user: updateUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default UpdateUser;

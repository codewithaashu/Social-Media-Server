import Requests from "../models/Requests.js";

const SendRequest = async (req, res) => {
  try {
    //accept the requestTo user from req.body
    const { requestTo } = req.body;
    //get the user's id from request
    const { userId } = req;
    //check if the user is already sent a friend request
    const query = {
      $or: [
        { requestTo, requestFrom: userId },
        { requestTo: userId, requestFrom: requestTo },
      ],
    };
    const requestExist = await Requests.findOne(query);
    if (requestExist) {
      return res
        .status(409)
        .json({ message: "Friend request already sent", success: false });
    }
    //create the friend request
    const request = await Requests.create({
      requestFrom: userId,
      requestTo,
    });
    await request.save();
    return res.status(200).json({
      message: "Friend request has been sent successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default SendRequest;

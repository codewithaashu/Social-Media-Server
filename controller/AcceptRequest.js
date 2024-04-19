import Requests from "../models/Requests.js";
import Users from "../models/Users.js";

const AcceptRequest = async (req, res) => {
  try {
    //get the requestId and status from params
    const { requestId, status } = req.params;

    //get the user's id from request object
    const { userId } = req;

    //get the request and change the friendRequest according to status
    const friendRequest = await Requests.findById(requestId);

    //if request doesn't exist
    if (!friendRequest) {
      return res.status(404).json({
        message: "Request not found",
        success: false,
      });
    }

    //if request exist
    if (status === "Accept") {
      //push the user's id in friends array of sender
      const sender = await Users.findById(friendRequest.requestFrom); //get the sender
      sender.friends.push(userId);
      await sender.save();
      //push the sender user's id in friends array of users
      const users = await Users.findById(userId); //get the user
      users.friends.push(friendRequest.requestFrom);
      await users.save();
    }

    //delete the request
    await Requests.findByIdAndDelete(requestId);

    //send response
    return res.status(200).json({
      message: `Friend request has been ${
        status === "Accept" ? "accepted" : "denied"
      }`,
      success: true,
      status,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default AcceptRequest;

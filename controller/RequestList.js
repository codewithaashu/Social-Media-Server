import Requests from "../models/Requests.js";

const RequestList = async (req, res) => {
  try {
    //get userId from request object
    const { userId } = req;
    //get all request that is send by user
    const requests = await Requests.find({ requestFrom: userId });
    return res.status(200).json({
      message: "Request details fetch successfully",
      success: true,
      requests,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default RequestList;

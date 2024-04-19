import Users from "../models/Users.js";
import VerifyMails from "../models/VerifyMails.js";
const VerifyMail = async (req, res) => {
  try {
    //get the id and token from api url
    const { id, token } = req.params;
    //check if there any request in VerifyMail collection
    const verifyMailRequestExist = await VerifyMails.findOne({
      userId: id,
      token,
    });
    //if request doesn't exist
    if (!verifyMailRequestExist) {
      return res.redirect("/auth/verified?success=false");
    }
    //if request exist
    //update the verified field of users with true
    await Users.findByIdAndUpdate(id, { verified: true }, { new: true });
    //delete the verify mail request
    const mailId = verifyMailRequestExist._id.toString();
    await VerifyMails.findByIdAndDelete(mailId);
    return res.redirect("/auth/verified?success=true");
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export default VerifyMail;

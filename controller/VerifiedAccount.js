import path from "path";
const VerifiedAccount = async (req, res) => {
  const { success } = req.query;
  //get the root directory
  const pathLocation = path.resolve();
  if (success === "false") {
    res.sendFile(path.join(pathLocation, "/static/UnVerifiedMail.html"));
    return;
  }
  res.sendFile(path.join(pathLocation, "/static/VerifiedMail.html"));
};
export default VerifiedAccount;

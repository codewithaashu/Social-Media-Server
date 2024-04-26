import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./");
const LogoutUser = async (req, res) => {
  try {
    //in development mode
    if (process.env.NODE_ENV === "production") {
      localStorage.removeItem("access_token");
    }
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logout successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export default LogoutUser;

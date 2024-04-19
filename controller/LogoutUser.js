const LogoutUser = async (req, res) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logout successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export default LogoutUser;

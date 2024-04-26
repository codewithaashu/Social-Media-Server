import jwt from "jsonwebtoken";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./");
const Authentication = (req, res, next) => {
  //to authenticate the user, check the token in cookie

  //check token in cookie
  let token = req.cookies.access_token;

  //in development mode
  if (process.env.NODE_ENV === "production") {
    token = localStorage.getItem("access_token");
  }
  //if token doesn't  exist go to login page with error message "Please Login First"
  if (!token)
    return res.status(401).json({
      message: "You are not logged in! Please log in first",
      success: false,
    });

  //if token exist, then  verify it and decode the token to get the user info.
  //we generate the jwt using user's id, so user's id is decode from jwt.
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //add userId to request object
  req.userId = id;
  //go to the next middleware function
  next();
};
export default Authentication;

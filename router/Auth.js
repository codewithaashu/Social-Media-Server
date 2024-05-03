//to create a router, we have to import  the express module
import express from "express";
import RegisterUser from "../controller/RegisterUser.js";
import LoginUser from "../controller/LoginUser.js";
import VerifyMail from "../controller/VerifyMail.js";
import VerifiedAccount from "../controller/VerifiedAccount.js";
import ForgotPassword from "../controller/ForgotPassword.js";
import ResetPassword from "../controller/ResetPassword.js";
import LogoutUser from "../controller/LogoutUser.js";
import GetUserDetails from "../controller/GetUserDetails.js";
import Authentication from "../middleware/Authentication.js";
import UpdateUser from "../controller/UpdateUser.js";
import GetProfileDetails from "../controller/GetProfileDetails.js";
import SearchUserList from "../controller/SearchUserList.js";
import {
  gfgStats,
  githubStats,
  leetcodeStats,
} from "../controller/fetchCodingProfile.js";

//create an instance of AuthRouter
const AuthRouter = express.Router();

//create the Routes

//you can create sub route as below also
// AuthRouter.route("/register").post(RegisterUser);

//or you can also create sub-route as below
AuthRouter.post("/register", RegisterUser);
AuthRouter.post("/login", LoginUser);
AuthRouter.get("/verify/:id/:token", VerifyMail);
AuthRouter.get("/verified", VerifiedAccount);
AuthRouter.get("/forgot-password/:email", ForgotPassword);
AuthRouter.put("/reset-password", ResetPassword);
AuthRouter.get("/logout", LogoutUser);
AuthRouter.get("/user", Authentication, GetUserDetails);
AuthRouter.get("/user/gfg-stats/:username", Authentication, gfgStats);
AuthRouter.get("/user/leetcode-stats/:username", Authentication, leetcodeStats);
AuthRouter.get("/user/github-stats/:username", Authentication, githubStats);
AuthRouter.get("/profile/:userId", Authentication, GetProfileDetails);
AuthRouter.get("/search-user/:keyword", Authentication, SearchUserList);
AuthRouter.put("/update-user", Authentication, UpdateUser);

//export the AuthRouter

export default AuthRouter;

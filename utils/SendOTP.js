import { Resend } from "resend";
import VerifyOTPs from "../models/VerifyOTPs.js";

const SendOTP = async (user, res) => {
  const APP_URL = process.env.APP_URL;
  //destructure user field from user object
  const { firstName, lastName, email, _id } = user;
  //check otpRequest exist or not
  const otpRequestExist = await VerifyOTPs.findOne({ userEmail: email });

  if (otpRequestExist) {
    return res.status(409).json({
      message: "OTP already sent. Check your email. ",
      success: false,
    });
  }
  //generate OTP
  const OTP = Math.floor(100000 + Math.random() * 900000);
  //create an instance of resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  //send email
  const resp = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["ashish.ranjanbca2021175@imsnoida.com", email],
    subject: "Reset Password",
    html: `<h4 style="text-align:center;font-size:18px;line-height:28px;color:#1c2d38;font-weight:600;letter-spacing:0">Reset Password</h4><p style="font-size:16px;line-height:28px;color:#001e2b;font-weight:400;letter-spacing:0;margin:36px 32px 33px">Hi ${
      firstName + " " + lastName
    }, <br>To reset your password, the six digit OTP is : </p><table width="100%" style="width:100%!important"><tbody><tr><td align="center"><p style="font-family:Helvetica,Arial,sans-serif;text-align:center;color:#0444A4;display:block;font-size:20px;font-weight:bold;text-decoration:none;letter-spacing:normal;cursor:pointer" >${OTP}</p></td></tr></tbody></table><p style="font-size:16px;line-height:28px;color:#001e2b;font-weight:400;letter-spacing:0;margin:36px 32px 33px">This OTP will expire after 5 minutes. To request another <br>OTP, please <a style="color:#0444A4" href=${
      APP_URL + "/forgot-password"
    } target="_blank">click here</a> to resend OTP.</p>`,
  });
  //if there is any error to sending mail
  if (resp.error) {
    return res.status(401).json({ success: false, message: resp.error });
  }
  //if there is no error
  //store the OTP in database
  await VerifyOTPs.create({
    userEmail: email,
    OTP: "" + OTP + "",
  });
  return res
    .status(201)
    .json({ success: true, message: "OTP sent successfully" });
};
export default SendOTP;

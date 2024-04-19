import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import VerifyMails from "../models/VerifyMails.js";
const SendVerificationMail = async (user, res) => {
  const APP_URL = process.env.APP_URL;
  const { firstName, lastName, email, _id } = user;
  const token = uuidv4();
  //create the verify link
  const verifyLink = `${
    process.env.SERVER_URL
  }/auth/verify/${_id.toString()}/${token}`;

  //create an instance of resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  //send email
  const resp = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["ashish.ranjanbca2021175@imsnoida.com", email],
    subject: "Verify Your FunBook Account",
    html: `<h4 style="text-align:center;font-size:18px;line-height:28px;color:#1c2d38;font-weight:600;letter-spacing:0">Email Address Verification</h4><p style="font-size:16px;line-height:28px;color:#001e2b;font-weight:400;letter-spacing:0;margin:36px 32px 33px">Hi ${
      firstName + " " + lastName
    }, <br>To finish setting up your account and start using FunBook, please verify your email address. </p><table width="100%" style="width:100%!important"><tbody><tr><td align="center"><a style="font-family:Helvetica,Arial,sans-serif;width:159px;text-align:center;padding:12px 0;background-color:#0444A4;border:1px solid #0444A4;border-radius:3px;display:block;color:#ffffff;font-size:18px;font-weight:normal;text-decoration:none;letter-spacing:normal;cursor:pointer" href=${verifyLink} target="_blank">Verify Email</a></td></tr></tbody></table><p style="font-size:16px;line-height:28px;color:#001e2b;font-weight:400;letter-spacing:0;margin:36px 32px 33px">This link will expire after 1 hour. To request another verification<br>link, please <a style="color:#0444A4" href=${
      APP_URL + "/login"
    } target="_blank">log in</a> to prompt a re-send link.</p>`,
  });
  //if there is any error to sending mail
  if (resp.error) {
    return res.status(401).json({ success: false, message: resp.error });
  }
  //if there is no error
  //store the verification token in database
  await VerifyMails.create({
    userId: _id,
    token,
    messageId: resp?.data?.id,
  });
  return res.status(201).json({ success: true, message: "Verify your email" });
};
export default SendVerificationMail;

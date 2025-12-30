import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import VerifyMails from "../models/VerifyMails.js";

const SendVerificationMail = async (user, res) => {
  try {
    const APP_URL = process.env.APP_URL;
    const { firstName, lastName, email, _id } = user;

    const token = uuidv4();
    const verifyLink = `${
      process.env.SERVER_URL
    }/auth/verify/${_id.toString()}/${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify Your FunBook Account",
      html: `
        <h4 style="text-align:center;font-size:18px;color:#1c2d38;">
          Email Address Verification
        </h4>

        <p style="font-size:16px;color:#001e2b;">
          Hi ${firstName} ${lastName}, <br/><br/>
          To finish setting up your account and start using FunBook,
          please verify your email address.
        </p>

        <div style="text-align:center;margin:30px;">
          <a href="${verifyLink}" target="_blank"
            style="background:#0444A4;color:#fff;padding:12px 20px;
            text-decoration:none;border-radius:4px;font-size:18px;">
            Verify Email
          </a>
        </div>

        <p style="font-size:16px;color:#001e2b;">
          This link will expire after 1 hour.<br/>
          To request another verification link, please
          <a href="${APP_URL}/login" style="color:#0444A4;">log in</a>.
        </p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    await VerifyMails.create({
      userId: _id,
      token,
      messageId: info.messageId,
    });

    return res.status(201).json({
      success: true,
      message: "Verify your email",
    });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send verification email",
    });
  }
};

export default SendVerificationMail;

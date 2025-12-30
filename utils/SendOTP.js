import nodemailer from "nodemailer";
import VerifyOTPs from "../models/VerifyOTPs.js";

const SendOTP = async (user, res) => {
  try {
    const APP_URL = process.env.APP_URL;
    const { firstName, lastName, email } = user;

    const otpRequestExist = await VerifyOTPs.findOne({ userEmail: email });
    if (otpRequestExist) {
      return res.status(409).json({
        success: false,
        message: "OTP already sent. Check your email.",
      });
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

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
      subject: "Reset Password",
      html: `
        <h4 style="text-align:center;font-size:18px;color:#1c2d38;">
          Reset Password
        </h4>

        <p style="font-size:16px;color:#001e2b;">
          Hi ${firstName} ${lastName}, <br/><br/>
          To reset your password, the six digit OTP is:
        </p>

        <div style="text-align:center;margin:20px 0;">
          <p style="font-size:22px;font-weight:bold;color:#0444A4;">
            ${OTP}
          </p>
        </div>

        <p style="font-size:16px;color:#001e2b;">
          This OTP will expire after 5 minutes.<br/>
          To request another OTP,
          <a href="${APP_URL}/forgot-password" style="color:#0444A4;">
            click here
          </a>.
        </p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    await VerifyOTPs.create({
      userEmail: email,
      OTP: String(OTP),
      messageId: info.messageId,
    });

    return res.status(201).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("OTP Email Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

export default SendOTP;

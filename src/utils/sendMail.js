import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";
import { ApiResponse } from "./ApiResponse.js";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "eugenia46@ethereal.email",
    pass: "XtWsRgJ5XRYZVCwk6X",
  },
});

const sendMail = asyncHandler(async (req, res) => {
  const { userEmail, activationLink } = req.body;

  const mailOptions = {
    from: "sidric6@gmail.com",
    to: userEmail,
    subject: "Activate Your Account",
    html: `<p>Hello,</p><p>Click the following link to activate your account: <a href="${activationLink}">${activationLink}</a></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json(new ApiResponse(200, info.response, "Activation email sent"));
  } catch (error) {
    console.error("Error sending activation email:", error);
  }
});

export { sendMail };

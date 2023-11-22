import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = (to, subject, password, company) => {
  const htmlTemplate = `
    <div>
      <p>Hello ${to} Your account was successfully created by <strong>${company}</strong>.</p>
      <p>Your one-time login credentials are:</p>
      <ul>
        <li><strong>Username:</strong> ${to}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Please login and update your password as soon as possible using the link below:</p>
      <a href="https://icon-x-kra.vercel.app">Login Link</a>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to,
    subject,
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

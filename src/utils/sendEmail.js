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

export const sendEmail = (to, subject, password, organization, clientKey) => {
  const htmlTemplate = `
    <div style={{font-size:16px}}>
      <p>Hello ${to}, Your account was successfully created for <strong>${organization}</strong>.</p>
      <p>Your one-time login credentials are:</p>
      <ul>
        <li><strong>Email:</strong> ${to}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>

      <p> Your generated API credentials are as follows, 
      this will be used for making an API calls to our service</p>

      <ul>
        <li><strong>CLIENT KEY:</strong> ${clientKey}</li>
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

export const sendCustomEmail = (to, subject, key, value) => {
  const htmlTemplate2 = `
    <div style={{font-size:16px}}>
      <p>Hello ${to}, Hello Here is the API credentials!!!</strong>.</p>
      <ul>
        <li><strong>CLIENT SECRET:</strong> ${key}</li>
        <li><strong>Organization:</strong> ${value}</li>
      </ul>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to,
    subject,
    html: htmlTemplate2,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dns = require("dns").promises;
const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error("Error hasing password");
  }
};

const unhashPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error unhashing password");
  }
};

const sendToken = ({ id, user_email, user_ward }) => {
  try {
    return jwt.sign(
      {
        id,
        user_email,
        user_ward,
      },
      process.env.DEV_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error sending token");
  }
};

const sendSignUpToken = (email) => {
  try {
    return jwt.sign({ email }, process.env.DEV_SECRET_KEY, { expiresIn: "1d" });
  } catch (error) {
    console.error(error);
    throw new Error("Error sending token");
  }
};

const verifyToken = async () => {
  try {
    const token = req.cookies.userDetails;
  } catch (error) {
    throw new Error("Error invalid Token");
  }
};

const checkMX = async (email) => {
  try {
    const domain = email.split("@")[1];
    const records = await dns.resolveMx(domain);
    console.log(domain);
    return records && records.length > 0;
  } catch (error) {
    console.error("Invalid Email");
    return false;
  }
};

const sendVerifyEmail = async (to, token) => {
  try {
    const url = `${process.env.DOMAIN_URL}/auth/verify-email?token=${token}`;
    return emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Verify Email",
      text: "Hello and welcome! Verify your email and proceed to the wonderous amazing services we provide you and your team! :D",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Hello and welcome to WardManager!</h2>
        <p>Verify your email and proceed to the wonderous amazing services we provide you and your team! :D 🎉</p>
        <a 
          href="${url}" 
          style="
            display: inline-block;
            padding: 10px 20px;
            margin-top: 10px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          "
        >
          Verify Email
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #777;">
          If the button above doesn’t work, copy and paste this link into your browser:<br/>
          <a href="${url}">${url}</a>
        </p>
      </div>
    `,
    });
  } catch (error) {
    console.error(error);
    console.error("Error sending Verification email.");
    return error;
  }
};

module.exports = {
  hashPassword,
  unhashPassword,
  sendToken,
  verifyToken,
  checkMX,
  sendVerifyEmail,
  sendSignUpToken,
};

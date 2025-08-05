const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dns = require("dns");
const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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

const checkMX = (email) => {
  try {
    const domain = email.split("@")[1];
    const records = dns.resolveMx(domain);
    return records && records.length > 0;
  } catch (error) {
    console.error("Invalid Email");
    return false;
  }
};

const sendVerifyEmail = async (to, token) => {
  try {
    const url = `https://wardmanager.onrender.com/auth/verify-email?token=${token}`;
    return emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Verify Email",
      text: "Hello and welcome! Verify your email and proceed to the wonderous amazing services we provide you and your team! :D !",
      html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
    });
  } catch (error) {
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

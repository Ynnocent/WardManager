const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const verifyToken = async () => {
    try {
        const token = req.cookies.userDetails;
    } catch (error) {
        throw new Error("Error invalid Token");
    }
}
module.exports = { 
    hashPassword,
    unhashPassword,
    sendToken,
    verifyToken
};

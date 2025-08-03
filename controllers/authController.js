const mongoDb = require("../db/connect");
const authUtil = require("../utils/authUtil");

const loginInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const db = await mongoDb.getDB();
    const userCollection = db.collection("Users");

    const userDetails = await userCollection.findOne({ email });

    if (!userDetails) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isPasswordValid = await authUtil.unhashPassword(
      password,
      userDetails.hashedPassword
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const userPayload = {
      id: userDetails._id,
      user_email: userDetails.email,
      user_ward: userDetails.user_ward,
    };
    

    const authToken = authUtil.sendToken(userPayload);

    return res.status(200).json({
      message: "Successful Login",
      authToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Error logging in user" });
  }
};


const logOutUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const db = await mongoDb.getDB();
    const userCollection = db.collection("Users");

    const userDetails = await userCollection.findOne({ email });

    if (!userDetails) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isPasswordValid = await authUtil.unhashPassword(
      password,
      userDetails.hashedPassword
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

  } catch (error) {}
};

const createUser = async (req, res) => {
  try {
    const { email, password, user_ward } = req.body;
    const hashedPassword = await authUtil.hashPassword(password);

    const newUser = { email, hashedPassword, user_ward };
    const db = await mongoDb.getDB();
    const userCollection = await db.collection("Users");

    await userCollection.insertOne(newUser);

    res.status(200).json({
      message: "Successfully created a new user",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating new user",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const db = await mongoDb.getDB();
    const userCollection = await db.collection("Users");
  } catch (error) {}
};

module.exports = {
  loginInUser,
  logOutUser,
  getAllUsers,
  createUser,
};

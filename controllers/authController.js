const userModel = require("../models/usersModel.js");

const loginInUser = (req, res) => {
  try {
  } catch (error) {}
};

const logOutUser = (req, res) => {
  try {
  } catch (error) {}
};

const createUser = (req, res) => {
  try {
    userModel.addUser(req.body);
  } catch (error) {}
};

const getAllUsers = (req, res) => {
  try {
    res.json(userModel.getUsers());
  } catch (error) {}
};

module.exports = {
  loginInUser,
  logOutUser,
  getAllUsers,
  createUser,
};

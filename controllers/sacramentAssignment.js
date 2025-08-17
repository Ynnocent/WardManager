const mongoDb = require("../db/connect");
const authUtil = require("../utils/authUtil");

const createSacramentAssignment = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding sacrament assignment",
    });
  }
};

const addSacramentAssHistory = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding sacrament assignment to history",
    });
  }
};

const updateMemberPrayer = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const updateMemberTalk = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
  createSacramentAssignment,
  addSacramentAssHistory,
};

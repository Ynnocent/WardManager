const mongoDB = require("../db/connect.js");
const gospelTopics = require("../temp/gospel_topics_json.json");

// ====================== GET ======================
const totalActiveMembers = async (req, res) => {
  try {
    const db = await mongoDB.getDB();
    const memberCollection = await db.collection("Members");
    const results = await memberCollection.countDocuments({ status: "Active" });
    res.status(200).json({
      message: "Successfully queried total active members",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to query total active members",
    });
  }
};

const totalMembers = async (req, res) => {
  try {
    const db = await mongoDB.getDB();
    const memberCollection = await db.collection("Members");
    const results = await memberCollection.countDocuments();
    res.status(200).json({
      message: "Successfully queried total members",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to query total members",
    });
  }
};

const totalLessActiveMembers = async (req, res) => {
  try {
    const db = await mongoDB.getDB();
    const memberCollection = await db.collection("Members");
    const results = await memberCollection.countDocuments({
      status: "Less Active",
    });
    res.status(200).json({
      message: "Successfully queried total less active members",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to query total less active members",
    });
  }
};

const totalByOrg = async (req, res) => {
  try {
    const org = req.query.org;
    const db = await mongoDB.getDB();
    const memberCollection = await db.collection("Members");
    const results = await memberCollection.countDocuments({
      org: org,
    });
    res.status(200).json({
      message: "Successfully queried total less active members",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to query total less active members",
    });
  }
}

const totalGospelTopic = async (req, res) => {
  try {
    const db = await mongoDB.getDB();
    const memberCollection = await db.collection("GospelTopics");
    const results = await memberCollection.countDocuments();
    res.status(200).json({
      message: "Successfully queried total members",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error getting total Gospel Topic"
    })
  }
}

// ====================== POST =====================

// ====================== PUT ======================

// ====================== DELETE ===================

module.exports = {
  totalActiveMembers,
  totalLessActiveMembers,
  totalMembers,
  totalByOrg,
  totalGospelTopic
};

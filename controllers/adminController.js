const mongoDB = require("../db/connect.js");
const ObjectID = require("mongodb").ObjectId;

// ====================== GET ======================
const getMemberList = async (req, res) => {
  try {
    const db = await mongoDB.getDB();
    let results = db.collection("Members").find();
    results.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting members",
    });
  }
};

const getConferenceTalks = (req, res) => {
  try {
    res.send("General Conference Talks");
  } catch (error) {
    res.status(500).json({
      message: "Error getting conference talks",
    });
  }
};

const getMember = async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const userId = ObjectID.createFromHexString(id);

  try {
    const db = await mongoDB.getDB();
    const memberCollection = db.collection("Members");

    const user = await memberCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error getting member",
    });
  }
};

// ====================== POST ======================
const addMember = async (req, res) => {
  try {
    const { fname, lname, gender, age, birthDate, phoneNumber, email } =
      req.body;

    const newMember = {
      fname,
      lname,
      gender,
      age,
      birthDate,
      phoneNumber,
      email,
    };

    const db = await mongoDB.getDB();
    const memberCollection = db.collection("Members");
    await memberCollection.insertOne(newMember);

    console.log(newMember);

    res.status(200).json({
      message: "Success adding a new member",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding member",
    });
  }
};

// ====================== PUT ======================
const updateMember = async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const userId = ObjectID.createFromHexString(id);
  const { fname, lname, gender, age, birthDate, phoneNumber, email } = req.body;

  if (
    !fname ||
    !lname ||
    !gender ||
    !age ||
    !birthDate ||
    !phoneNumber ||
    !email
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const updatedMember = {
    fname,
    lname,
    gender,
    age,
    birthDate,
    phoneNumber,
    email,
  };

  try {
    const db = await mongoDB.getDB();
    const memberCollection = db.collection("Members");
    const result = memberCollection.updateOne(
      { _id: userId },
      { $set: updatedMember }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(result, { message: "Sucessfully updated member" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating member",
    });
  }
};

// ====================== DELETE ======================
const deleteMember = async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const userId = ObjectID.createFromHexString(id);

  try {
    const db = await mongoDB.getDB();
    const memberCollection = db.collection("Members");
    const result = memberCollection.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting member",
    });
  }
};

module.exports = {
  getMemberList,
  getConferenceTalks,
  getMember,
  addMember,
  updateMember,
  deleteMember,
};

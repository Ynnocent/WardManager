const mongoDb = require("../db/connect");
const authUtil = require("../utils/authUtil");
const ObjectID = require("mongodb").ObjectId;
const emailerUtil = require("../utils/emailerUtil");

// ====================== GET ======================
const getGospelTopics = async (req, res) => {
  try {
    const db = await mongoDb.getDB();
    const gospelCollection = await db.collection("GospelTopics");
    const results = await gospelCollection.find();
    results.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(lists);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Getting Gospel Topics",
    });
  }
};

const getMembersByOrg = async (req, res) => {
  try {
    const org = req.query.org;
    const db = await mongoDb.getDB();
    const memberCollection = await db.collection("Members");

    let results;

    if (org == "All") {
      results = memberCollection.find();
      results.toArray().then((lists)=>{
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json(lists);
      })
    } else {
      results = memberCollection.find({
        org: org,
      });

      results.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json(lists);
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Getting Members by Org",
    });
  }
};

const getMemberByStatus = async (req, res) => {
  try {
    const status = req.query.status;

    const db = await mongoDb.getDB();

    const memberCollection = await db.collection("Members");

    const results = memberCollection.find({
      status: status,
    });

    results.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({
        message: "Success getting members by status",
        data: lists,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Getting Members by Status",
    });
  }
};
// ====================== POST =====================
const createSacramentAssignment = async (req, res, next) => {
  try {
    // IDs that are just strings
    const presidingMember = req.body.presidingMember;
    const openingPrayerMember = req.body.openingPrayerMember;
    const closingPrayerMember = req.body.closingPrayerMember;
    const emailTemplate = req.body.emailTemplate;

    const firstSpeakerMember = JSON.parse(req.body.firstSpeakerMember);
    const secondSpeakerMember = JSON.parse(req.body.secondSpeakerMember);
    const thirdSpeakerMember = JSON.parse(req.body.thirdSpeakerMember);

    const presidingMemberUID = ObjectID.createFromHexString(presidingMember);

    const firstSpeakerMemberUID = ObjectID.createFromHexString(
      firstSpeakerMember.MemberId
    );
    const secondSpeakerMemberUID = ObjectID.createFromHexString(
      secondSpeakerMember.MemberId
    );
    const thirdSpeakerMemberUID = ObjectID.createFromHexString(
      thirdSpeakerMember.MemberId
    );

    const openingPrayerMemberUID =
      ObjectID.createFromHexString(openingPrayerMember);
    const closingPrayerMemberUID =
      ObjectID.createFromHexString(closingPrayerMember);

    const db = await mongoDb.getDB();
    const memberCollection = await db.collection("Members");

    // Send Email to Speakers and Prayers

    const firstSpeakerMemberResult = await memberCollection.findOne({
      _id: firstSpeakerMemberUID,
    });
    // emailerUtil.sendEmailSpeakerAssignment(
    //   firstSpeakerMember.email,
    //   firstSpeakerMemberResult
    // ); // Email to, and the member object

    const secondSpeakerMemberResult = await memberCollection.findOne({
      _id: secondSpeakerMemberUID,
    });
    // emailerUtil.sendEmailSpeakerAssignment(
    //   secondSpeakerMemberResult.email,
    //   secondSpeakerMemberResult
    // ); // Email to, and the member object

    const thirdSpeakerMemberResult = await memberCollection.findOne({
      _id: thirdSpeakerMemberUID,
    });
    // emailerUtil.sendEmailSpeakerAssignment(
    //   thirdSpeakerMemberResult.email,
    //   thirdSpeakerMemberResult
    // ); // Email to, and the member object

    const openingPrayerMemberResult = await memberCollection.findOne({
      _id: openingPrayerMemberUID,
    });
    // emailerUtil.sendEmailPrayerAssignment(
    //   openingPrayerMemberResult.email,
    //   openingPrayerMemberResult
    // ); // Email to, and the member object

    const closingPrayerMemberResult = await memberCollection.findOne({
      _id: closingPrayerMemberUID,
    });
    // emailerUtil.sendEmailPrayerAssignment(
    //   closingPrayerMemberResult.email,
    //   closingPrayerMemberResult
    // ); // Email to, and the member object

    await memberCollection.updateMany(
      { _id: { $in: [openingPrayerMemberUID, closingPrayerMemberUID] } },
      { $push: { prayerHistory: { dateAdded: new Date() } } }
    );

    await memberCollection.updateOne(
      { _id: firstSpeakerMemberUID },
      {
        $push: {
          talkHistory: {
            topic: firstSpeakerMember.Topic,
            dateAdded: new Date(),
          },
        },
      }
    );

    await memberCollection.updateOne(
      { _id: secondSpeakerMemberUID },
      {
        $push: {
          talkHistory: {
            topic: secondSpeakerMember.Topic,
            dateAdded: new Date(),
          },
        },
      }
    );

    await memberCollection.updateOne(
      { _id: thirdSpeakerMemberUID },
      {
        $push: {
          talkHistory: {
            topic: thirdSpeakerMember.Topic,
            dateAdded: new Date(),
          },
        },
      }
    );

    return res
      .status(200)
      .json({ message: "Successfully Created Sacrament Assignment" });
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

// ====================== PUT ======================

// ====================== DELETE ===================

module.exports = {
  createSacramentAssignment,
  addSacramentAssHistory,
  getGospelTopics,
  getMembersByOrg,
  getMemberByStatus,
};

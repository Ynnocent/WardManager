const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getMembers", adminController.getMemberList);
router.get("/getConferenceTalks", adminController.getConferenceTalks);

module.exports = router;

const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const adminController = require("../controllers/adminController");

/** TO DO
 * - Token Verification
 * - Credential Verification
 * - Data Validation
 */


//GET
router.get("/getMembers", adminController.getMemberList);
router.get("/getMember/:id", adminController.getMember);
router.get("/getConferenceTalks", adminController.getConferenceTalks);
router.get("/getMemberRecordsPDF/:id", adminController.getMembershipRecordPDF);

//POST
router.post("/addMember", adminController.addMember);
router.post("/addMemberRecords", upload.single("pdfFile"),adminController.addMembershipRecord);

//PUT
router.put("/updateMember/:id", adminController.updateMember);

//DELETE
router.delete("/deleteMember/:id", adminController.deleteMember);

module.exports = router;

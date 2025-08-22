const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const adminController = require("../controllers/adminController");
const memberRecordsConverter = require("../utils/memberRecordConverter");
const sacramentAssignmentController = require("../controllers/sacramentAssignment");
const metricController = require("../controllers/metricController");


//================================ GET =================================
router.get("/getMembers", adminController.getMemberList); // Get all members objects
router.get("/getMember", adminController.getMember); // Get one member objects
router.get("/getConferenceTalks", adminController.getConferenceTalks); // Get all Conference Talks
router.get("/getMembersOrg", sacramentAssignmentController.getMembersByOrg); // Get member objects by organization
router.get("/getMemberStatus", sacramentAssignmentController.getMemberByStatus); // Get member objects by status

router.get("/getTotalActive", metricController.totalActiveMembers); // Get total active member count
router.get("/getTotalLessActive", metricController.totalLessActiveMembers); // Get total less active member count
router.get("/getTotal", metricController.totalMembers); // Get total member count
router.get("/getTotalOrg", metricController.totalByOrg); // Get total by organization member count
router.get("/getTotalGospelTopic", metricController.totalGospelTopic); // Get total gospel topic count

router.get("/getGospelTopics", sacramentAssignmentController.getGospelTopics); // Get gospel topics
router.get("/getMemberRecordsPDF/:id", adminController.getMembershipRecordPDF); // Get one member record pdf

router.get("/convertRecords/:id", memberRecordsConverter.convertPDFToJSON); // Convert record pdf to json

//================================ POST ================================
router.post("/addMember", adminController.addMember); // Add one member
router.post("/addMemberRecords", upload.single("pdfFile"),adminController.addMembershipRecord); // Add member record pdf
router.post("/createSacramentAssignment", sacramentAssignmentController.createSacramentAssignment); // Create sacrament assignment

//================================ PUT =================================
router.put("/updateMember/:id", adminController.updateMember); // Update one member

//================================ DELETE ==============================
router.delete("/deleteMember/:id", adminController.deleteMember); // Delete one member

module.exports = router;

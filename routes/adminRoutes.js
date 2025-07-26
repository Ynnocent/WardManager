const express = require("express");
const router = express.Router();
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

//POST
router.post("/addMember", adminController.addMember);

//PUT
router.put("/updateMember/:id", adminController.updateMember);

//DELETE
router.delete("/deleteMember/:id", adminController.deleteMember);

module.exports = router;

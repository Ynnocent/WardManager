const router = require("express").Router();
const authController = require("../controllers/authController");

//================================ GET =================================
router.get("/verify-email", authController.verifyNewUser); // Verify Email
router.get("/getAllUsers", authController.getAllUsers); // Get all users

//================================ POST ================================
router.post("/createUser", authController.createUser); // Create account
router.post("/login", authController.loginInUser); // Login account


module.exports = router;

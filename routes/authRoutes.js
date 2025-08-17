const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/verify-email", authController.verifyNewUser);

router.post("/createUser", authController.createUser);
router.post("/login", authController.loginInUser);


module.exports = router;

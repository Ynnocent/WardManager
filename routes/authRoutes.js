const router = require("express").Router();
const authController = require("../controllers/authController");
router.get("/", (req, res) => {
    res.json({
        message: "Test"
    })
})
router.post("/createUser", authController.createUser);
router.post("/login", authController.loginInUser);
module.exports = router;

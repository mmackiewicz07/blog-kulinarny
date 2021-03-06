const router = require("express").Router();
const authController = require("../controllers/authController");
const auth = require("../middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", auth, authController.getUser);

module.exports = router;
const express = require("express");
const userController = require("../controllers/user-controller");
const { authenticateToken } = require("../middelwares/authMiddleware");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh", authenticateToken, userController.refresh);
router.post("/logout", userController.logout);

module.exports = router;

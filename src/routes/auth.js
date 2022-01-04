const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/logout", controller.logout);
router.get("/user", controller.me);

module.exports = router;

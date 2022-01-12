const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/userController");

router.get("/:id", usersCtrl.getUsersById);
router.get("/", usersCtrl.getUsers);
router.put("/:id", usersCtrl.updateUsersById);

module.exports = router;

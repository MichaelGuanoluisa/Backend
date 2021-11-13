const express = require("express");
const router = express.Router();
const controller = require('../controllers/userController');
const {verifyToken, isAdmin} = require("../middlewares/authorization");
const {checkRolesExisted} = require('../middlewares/verification');

router.post('/', [verifyToken, isAdmin, checkRolesExisted], controller.createUser);


module.exports = router;
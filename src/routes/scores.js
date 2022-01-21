const express = require("express");
const router = express.Router();
const scoreCtrl = require("../controllers/scoreController");
const {
  verifyToken,
  isAdmin,
  isUser,
} = require("../middlewares/authorization");

router.post("/", [verifyToken, isUser], scoreCtrl.createScore);
router.get("/", [verifyToken], scoreCtrl.getScore);
router.put("/:id", [verifyToken, isUser], scoreCtrl.updateScoreById);
router.delete("/:id", [verifyToken, isAdmin], scoreCtrl.deleteScoreById);

module.exports = router;

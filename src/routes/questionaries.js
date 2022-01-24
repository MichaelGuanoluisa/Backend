const express = require("express");
const router = express.Router();
const questionaryCtrl = require("../controllers/questionaryController");
const { verifyToken, isAdmin } = require("../middlewares/authorization");

router.post("/", [verifyToken, isAdmin], questionaryCtrl.createQuestionary);
router.get("/", questionaryCtrl.getQuestionary);
router.get("/:id", questionaryCtrl.getQuestionaryById);
router.put(
  "/:id",
  [verifyToken, isAdmin],
  questionaryCtrl.updateQuestionaryById
);
router.delete(
  "/:id",
  [verifyToken, isAdmin],
  questionaryCtrl.deleteQuestionaryById
);

module.exports = router;

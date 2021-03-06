const express = require("express");
const router = express.Router();
const { verifyToken, isUser } = require("../middlewares/authorization");
const eventsInsCtrl = require("../controllers/eventsInscriptionController");

router.put("/:id", [verifyToken, isUser], eventsInsCtrl.createInscription);
router.get("/", [verifyToken, isUser], eventsInsCtrl.getInscriptions);
router.delete(
  "/:id",
  [verifyToken, isUser],
  eventsInsCtrl.deleteInscriptionById
);

module.exports = router;

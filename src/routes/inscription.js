const express = require("express");
const router = express.Router();
const {
  verifyToken,
  isAdmin,
  isUser,
} = require("../middlewares/authorization");
const eventsInsCtrl = require("../controllers/eventsInscriptionController");

router.post("/", [verifyToken, isUser], eventsInsCtrl.createInscription);
router.get("/", [verifyToken, isUser], eventsInsCtrl.getInscriptions);
router.get("/all", [verifyToken, isAdmin], eventsInsCtrl.getAllInscriptions);
router.delete(
  "/:id",
  [verifyToken, isUser],
  eventsInsCtrl.deleteInscriptionById
);

module.exports = router;

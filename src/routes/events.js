const express = require("express");
const router = express.Router();
const eventsCtrl = require("../controllers/eventsController");
const { verifyToken, isAdmin } = require("../middlewares/authorization");

router.get("/", eventsCtrl.getEvents);
router.get("/:id", eventsCtrl.getEventsById);
router.post(
  "/",
  [verifyToken, isAdmin],
  eventsCtrl.fileUpload,
  eventsCtrl.createEvents
);
router.put(
  "/:id",
  [verifyToken, isAdmin],
  eventsCtrl.fileUpload,
  eventsCtrl.updateEventsById
);
router.delete("/:id", [verifyToken, isAdmin], eventsCtrl.deleteEventsById);

module.exports = router;

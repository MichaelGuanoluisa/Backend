const express = require("express");
const router = express.Router();
const donationsCtrl = require("../controllers/donationsController");
const {
  verifyToken,
  isAdmin,
  isUser,
} = require("../middlewares/authorization");

router.get("/", donationsCtrl.getDonations);
router.get("/:id", donationsCtrl.getDonationsById);
router.post(
  "/",
  [verifyToken, isUser],
  donationsCtrl.fileUpload,
  donationsCtrl.createDonations
);
router.put(
  "/:id",
  [verifyToken, isAdmin],
  donationsCtrl.fileUpload,
  donationsCtrl.updateDonationsById
);
router.delete(
  "/:id",
  [verifyToken, isAdmin],
  donationsCtrl.deleteDonationsById
);

module.exports = router;

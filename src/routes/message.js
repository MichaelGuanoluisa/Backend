const express = require("express");
const router = express.Router();
const messagesCtrl = require("../controllers/messagesController");
const { verifyToken, isAdmin } = require("../middlewares/authorization");
const { validateCreate } = require("../validators/info");

router.get("/", messagesCtrl.getMessages);
router.post(
  "/",
  [verifyToken, isAdmin],
  validateCreate,
  messagesCtrl.fileUpload,
  messagesCtrl.createMessages
);
router.get("/:id", messagesCtrl.getMessages);
router.put(
  "/:id",
  [verifyToken, isAdmin],
  messagesCtrl.fileUpload,
  messagesCtrl.updateMessagesById
);
router.delete("/:id", [verifyToken, isAdmin], messagesCtrl.deleteMessagesById);

module.exports = router;

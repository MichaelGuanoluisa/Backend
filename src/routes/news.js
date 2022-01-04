const express = require("express");
const router = express.Router();
const newsCtrl = require("../controllers/newsController");
const { verifyToken, isAdmin } = require("../middlewares/authorization");

router.get("/", newsCtrl.getNews);
router.get("/:id", newsCtrl.getNewsById);
router.post(
  "/",
  [verifyToken, isAdmin],
  newsCtrl.fileUpload,
  newsCtrl.createNews
);
router.put(
  "/:id",
  [verifyToken, isAdmin],
  newsCtrl.fileUpload,
  newsCtrl.updateNewsById
);
router.delete("/:id", [verifyToken, isAdmin], newsCtrl.deleteNewsById);

module.exports = router;

const express = require("express");
const router = express.Router();
const videosCtrl = require("../controllers/videosController");
const { verifyToken, isAdmin } = require("../middlewares/authorization");

router.get("/", [verifyToken], videosCtrl.getVideos);
router.get("/:id", [verifyToken], videosCtrl.getVideosById);
router.post("/", [verifyToken, isAdmin], videosCtrl.createVideos);
router.put("/:id", [verifyToken, isAdmin], videosCtrl.updateVideosById);
router.delete("/:id", [verifyToken, isAdmin], videosCtrl.deleteVideosById);

module.exports = router;

const express = require("express");
const router = express.Router();
const albumsCtrl = require("../controllers/albumsController");
const { verifyToken, isAdmin } = require("../middlewares/authorization");
const { validateCreate } = require("../validators/album");
const multipart = require("connect-multiparty");
const multipartMidd = multipart();

router.get("/", albumsCtrl.getAlbums);
router.post(
  "/",
  [verifyToken, isAdmin],
  validateCreate,
  albumsCtrl.fileUpload,
  albumsCtrl.createAlbums
);
router.get("/:id", albumsCtrl.getAlbumsById);
router.put(
  "/:id",
  [verifyToken, isAdmin],
  albumsCtrl.fileUpload,
  albumsCtrl.updateAlbumsById
);
router.delete("/:id", [verifyToken, isAdmin], albumsCtrl.deleteAlbumsById);

module.exports = router;

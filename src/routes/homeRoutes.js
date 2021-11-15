const express = require("express");
const router = express.Router();
const newsCtrl = require("../controllers/newsController");
const messagesCtrl = require("../controllers/messagesController");
const albumsCtrl = require("../controllers/albumsController");
const videosCtrl = require("../controllers/videosController");
const eventsCtrl = require("../controllers/eventsController");
const { verifyToken, isAdmin } = require("../middlewares/authorization");
const multer = require("multer");
const Album = require("../models/album");
const News = require("../models/news");
const Message = require("../models/messages");
const Events = require("../models/events");

//
//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

//
//
//
// ------------------- rutas de noticias
router.get("/news", newsCtrl.getNews);
router.get("/news/:id", newsCtrl.getNewsById);
router.post(
  "/news",
  [verifyToken, isAdmin],
  upload.single("file"),
  (req, res) => {
    const data = req.body;
    const photo = req.file;
    console.log(photo);
    const { title, description, imgURL } = data;
    //crear un dato noticia en la base de datos
    const newNews = new News({
      title,
      description,
    });
    newNews.imgURL = `${photo.path}`;
    newNews.save();
    res.send({ message: "registro de noticias realizado con exito" });
  }
);
router.put("/news/:id", [verifyToken, isAdmin], newsCtrl.updateNewsById);
router.delete("/news/:id", [verifyToken, isAdmin], newsCtrl.deleteNewsById);

//
//
//
//--------------rutas de mensajes biblicos
router.get("/messages", messagesCtrl.getMessages);
router.post(
  "/messages",
  [verifyToken, isAdmin],
  upload.single("file"),
  (req, res) => {
    const data = req.body;
    const photo = req.file;
    const { title, description, imgURL } = data;
    //crear un dato mensaje en la base de datos
    const newMessages = new Message({
      title,
      description,
    });
    newMessages.imgURL = `${photo.path}`;
    newMessages.save();
    res.send({ message: "registro de mensaje realizado con exito" });
  }
);
router.get("/messages/:id", messagesCtrl.getMessages);
router.put(
  "/messages/:id",
  [verifyToken, isAdmin],
  messagesCtrl.updateMessagesById
);
router.delete(
  "/messages/:id",
  [verifyToken, isAdmin],
  messagesCtrl.deleteMessagesById
);

//
//
//
//-----------------rutas album
router.get("/albums", albumsCtrl.getAlbums);
router.post(
  "/albums",
  [verifyToken, isAdmin],
  upload.single("file"),
  (req, res) => {
    //crear un dato album en la base de datos
    const data = req.body;
    const photo = req.file;
    const { title, description, imgURL } = data;
    const newAlbum = new Album({
      title,
      description,
    });
    newAlbum.imgURL = `${photo.path}`;
    newAlbum.save();
    res.send({ message: "registro de album realizado con exito" });
  }
);
router.get("/albums/:id", albumsCtrl.getAlbumsById);
router.put("/albums/:id", [verifyToken, isAdmin], albumsCtrl.updateAlbumsById);
router.delete(
  "/albums/:id",
  [verifyToken, isAdmin],
  albumsCtrl.deleteAlbumsById
);

//
//
//
// ----------------rutas de videos
router.get("/videos", videosCtrl.getVideos);
router.get("/videos/:id", videosCtrl.getVideosById);
router.post("/videos", [verifyToken, isAdmin], videosCtrl.createVideos);
router.put("/videos/:id", [verifyToken, isAdmin], videosCtrl.updateVideosById);
router.delete(
  "/videos/:id",
  [verifyToken, isAdmin],
  videosCtrl.deleteVideosById
);

//
//
//
//--------------- rutas de eventos admin
router.get("/events", eventsCtrl.getEvents);
router.get("/events/:id", eventsCtrl.getEventsById);
router.post(
  "/events",
  [verifyToken, isAdmin],
  upload.single("file"),
  (req, res) => {
    const data = req.body;
    const photo = req.file;
    const { title, description, imgURL, ubication, schedule, cost } = data;
    //Crear un evento
    const newEvents = new Events({
      title,
      description,
      ubication,
      schedule,
      cost,
    });
    newEvents.imgURL = `${photo.path}`;
    newEvents.save();
    res.send({ message: "registro de evento realizado con exito" });
  }
);
router.put("/events/:id", [verifyToken, isAdmin], eventsCtrl.updateEventsById);
router.delete(
  "/events/:id",
  [verifyToken, isAdmin],
  eventsCtrl.deleteVideosById
);

module.exports = router;

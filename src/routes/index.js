const express = require("express");
const router = express.Router();
const newsCtrl = require("../controllers/newsController");
const messagesCtrl = require("../controllers/messagesController");
const albumsCtrl = require("../controllers/albumsController");
const videosCtrl = require("../controllers/videosController");
const eventsCtrl = require("../controllers/eventsController");
const donationsCtrl = require("../controllers/donationsController");
const usersCtrl = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/authorization");
const controller = require("../controllers/authController");
const cors = require("cors");


//
//
//
// ------------------- rutas auth
router.post("/auth/register", controller.register);
router.post("/auth/login", controller.login);
router.get("/auth/logout", controller.logout);

//
//
//
// ------------------- rutas auth
router.get("/user/:id", cors(), usersCtrl.getUsersById);
router.put("/user/:id", cors(), usersCtrl.updateUsersById);


//
//
//
// ------------------- rutas de noticias
router.get("/news", newsCtrl.getNews);
router.get("/news/:id", newsCtrl.getNewsById);
router.post("/news", [verifyToken, isAdmin], newsCtrl.fileUpload, newsCtrl.createNews);
router.put("/news/:id", [verifyToken, isAdmin], newsCtrl.fileUpload, newsCtrl.updateNewsById);
router.delete("/news/:id", [verifyToken, isAdmin], newsCtrl.deleteNewsById);

//
//
//
//--------------rutas de mensajes biblicos
router.get("/messages", messagesCtrl.getMessages);
router.post("/messages", [verifyToken, isAdmin], messagesCtrl.fileUpload, messagesCtrl.createMessages);
router.get("/messages/:id", messagesCtrl.getMessages);
router.put("/messages/:id", [verifyToken, isAdmin], messagesCtrl.fileUpload, messagesCtrl.updateMessagesById);
router.delete("/messages/:id", [verifyToken, isAdmin], messagesCtrl.deleteMessagesById);

//
//
//
//-----------------rutas album
router.get("/albums", albumsCtrl.getAlbums);
router.post("/albums", [verifyToken, isAdmin], albumsCtrl.fileUpload, albumsCtrl.createAlbums);
router.get("/albums/:id", albumsCtrl.getAlbumsById);
router.put("/albums/:id", [verifyToken, isAdmin], albumsCtrl.fileUpload, albumsCtrl.updateAlbumsById);
router.delete("/albums/:id", [verifyToken, isAdmin], albumsCtrl.deleteAlbumsById);

//
//
//
// ----------------rutas de videos
router.get("/videos", videosCtrl.getVideos);
router.get("/videos/:id", videosCtrl.getVideosById);
router.post("/videos", [verifyToken, isAdmin], videosCtrl.createVideos);
router.put("/videos/:id", [verifyToken, isAdmin], videosCtrl.updateVideosById);
router.delete("/videos/:id", [verifyToken, isAdmin], videosCtrl.deleteVideosById);

//
//
//
//--------------- rutas de eventos admin
router.get("/events", eventsCtrl.getEvents);
router.get("/events/:id", eventsCtrl.getEventsById);
router.post("/events", [verifyToken, isAdmin], eventsCtrl.fileUpload, eventsCtrl.createEvents);
router.put("/events/:id", [verifyToken, isAdmin], eventsCtrl.fileUpload, eventsCtrl.updateEventsById);
router.delete("/events/:id", [verifyToken, isAdmin], eventsCtrl.deleteEventsById);

//
//
//
//--------------- rutas de donaciones admin
router.get("/donations", donationsCtrl.getDonations);
router.get("/donations/:id", );
router.post("/donations", [verifyToken, isAdmin], donationsCtrl.fileUpload, donationsCtrl.createDonations);
router.put("/donations/:id", [verifyToken, isAdmin], donationsCtrl.fileUpload, donationsCtrl.updateDonationsById);
router.delete("/donations/:id", [verifyToken, isAdmin], donationsCtrl.deleteDonationsById);

module.exports = router;

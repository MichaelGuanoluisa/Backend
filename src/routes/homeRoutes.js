const express = require("express");
const router = express.Router();
const newsCtrl = require('../controllers/newsController');
const messagesCtrl = require('../controllers/messagesController');
const albumsCtrl = require('../controllers/albumsController');
const {verifyToken, isAdmin} = require("../middlewares/authorization");
const multer = require("multer");
const Album = require("../models/album");
const News = require("../models/news");
const Message = require("../models/messages");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `${Date.now()}.${ext}`);

        const data = req.body;
        const { title, description, imgURL } = data;
        const newAlbum = new Album({
            title,
            description,
        });
        newAlbum.imgURL = `uploads/${Date.now()}.${ext}`;
        newAlbum.save();

        const newNews = new News({
            title,
            description,
        });
        newNews.imgURL = `uploads/${Date.now()}.${ext}`;
        newNews.save();

        const newMessages = new Message({
            title,
            description,
        });
        newMessages.imgURL = `uploads/${Date.now()}.${ext}`;
        newMessages.save();
    },
});

const upload = multer({ storage });

// rutas de noticias
router.get('/news', newsCtrl.getNews)
router.get('/news/:id', newsCtrl.getNewsById)
router.post('/news', [verifyToken, isAdmin], upload.single("file"), (req, res) =>{
    res.send({"message": "registro realizado con exito"});
})
router.put('/news/:id', [verifyToken, isAdmin], newsCtrl.updateNewsById)
router.delete('/news/:id', [verifyToken, isAdmin], newsCtrl.deleteNewsById)

//rutas de mensajes biblicos
router.get('/messages', messagesCtrl.getMessages)
router.post('/messages', [verifyToken, isAdmin], upload.single("file"), (req, res) =>{
    res.send({"message": "registro realizado con exito"});
})
router.get('/messages/:id', messagesCtrl.getMessages)
router.put('/messages/:id', [verifyToken, isAdmin], messagesCtrl.updateMessagesById)
router.delete('/messages/:id', [verifyToken, isAdmin], messagesCtrl.deleteMessagesById)

//rutas album
router.get('/albums', albumsCtrl.getAlbums)
router.post('/albums', [verifyToken, isAdmin], upload.single("file"), (req, res) =>{
    res.send({"message": "registro realizado con exito"});
})
router.get('/albums/:id', albumsCtrl.getAlbumsById)
router.put('/albums/:id', [verifyToken, isAdmin], albumsCtrl.updateAlbumsById)
router.delete('/albums/:id', [verifyToken, isAdmin], albumsCtrl.deleteAlbumsById)

module.exports = router;
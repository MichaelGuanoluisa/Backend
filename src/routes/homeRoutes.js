const express = require("express");
const router = express.Router();
const newsCtrl = require('../controllers/newsController');
const messagesCtrl = require('../controllers/messagesController');
const albumsCtrl = require('../controllers/albumsController');
const {verifyToken, isAdmin} = require("../middlewares/authorization");

// rutas de noticias
router.get('/news', newsCtrl.getNews)
router.get('/news/:id', newsCtrl.getNewsById)
router.post('/news', [verifyToken, isAdmin], newsCtrl.createNews)
router.put('/news/:id', [verifyToken, isAdmin], newsCtrl.updateNewsById)
router.delete('/news/:id', [verifyToken, isAdmin], newsCtrl.deleteNewsById)

//rutas de mensajes biblicos
router.get('/messages', messagesCtrl.getMessages)
router.post('/messages', [verifyToken, isAdmin], messagesCtrl.createMessages)
router.get('/messages/:id', messagesCtrl.getMessages)
router.put('/messages/:id', [verifyToken, isAdmin], messagesCtrl.updateMessagesById)
router.delete('/messages/:id', [verifyToken, isAdmin], messagesCtrl.deleteMessagesById)

//rutas album
router.get('/albums', albumsCtrl.getAlbums)
router.post('/albums', [verifyToken, isAdmin], albumsCtrl.createAlbums)
router.get('/albums/:id', albumsCtrl.getAlbumsById)
router.put('/albums/:id', [verifyToken, isAdmin], albumsCtrl.updateAlbumsById)
router.delete('/albums/:id', [verifyToken, isAdmin], albumsCtrl.deleteAlbumsById)

module.exports = router;
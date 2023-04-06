const { ChatRoomMiddleware } = require('../middlewares/chatroom');

const router = require('express').Router();

router.post('/create', ChatRoomMiddleware.createChatroom);

module.exports = router;

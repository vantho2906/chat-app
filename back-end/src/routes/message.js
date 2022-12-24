const { MessageMiddleware } = require('../middlewares/message');

const router = require('express').Router();

router.post('/:chatRoomId', MessageMiddleware.getMessages);
router.post('/add/:chatRoomId', MessageMiddleware.addMessage);
router.post('/edit/:chatRoomId', MessageMiddleware.editMessage);
router.post('/delete/:chatRoomId', MessageMiddleware.deleteMessage);

module.exports = router;

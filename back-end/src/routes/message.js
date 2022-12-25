const { MessageMiddleware } = require('../middlewares/message');

const router = require('express').Router();

router.post('/:chatRoomId', MessageMiddleware.getMessages);
router.post('/add/:chatRoomId', MessageMiddleware.addMessage);
router.post('/edit/:msgId', MessageMiddleware.editMessage);
router.post('/delete/:msgId', MessageMiddleware.deleteMessage);

module.exports = router;

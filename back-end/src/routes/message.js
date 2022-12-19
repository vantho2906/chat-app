const { getMessages, addMessage } = require("../controllers/mesage");

const router = require("express").Router();

router.post("/:chatRoomId", getMessages);
router.post("/add/:chatRoomId", addMessage);

module.exports = router;

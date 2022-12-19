const { getFriendRequests, sendFriendRequest, acceptFriendRequest, cancelledFriendRequest } = require("../controllers/friendInvitation");

const router = require("express").Router();

router.get("/:userId", getFriendRequests);
router.post("/send/", sendFriendRequest);
router.post("/accept/:inviteId", acceptFriendRequest);
router.post("/cancelled/:inviteId", cancelledFriendRequest);

module.exports = router;

const { FriendInvitationMiddleware } = require('../middlewares/friendInvitation');

const router = require('express').Router();

router.get('/:userId', FriendInvitationMiddleware.getFriendRequests);
router.post('/send/', FriendInvitationMiddleware.sendFriendRequest);
router.post('/accept/:inviteId', FriendInvitationMiddleware.acceptFriendRequest);
router.post(
  '/cancelled/:inviteId',
  FriendInvitationMiddleware.cancelledFriendRequest
);

module.exports = router;

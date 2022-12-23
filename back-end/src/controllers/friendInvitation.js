const User = require('../models/user');
const ChatRoom = require('../models/chatRoom');
const Message = require('../models/message');
const FriendInvitation = require('../models/friendInvitation');
const { InviteStatus } = require('../utils/inviteStatus');

module.exports = {
  sendFriendRequest: async (req, res, next) => {
    const { myId, receiverId } = req.body;
    const myUser = await User.findById(myId);
    if (!myUser) return res.status(400).send({ message: 'User not found' });
    const yourUser = await User.findById(receiverId);
    if (!yourUser) return res.status(400).send({ message: 'User not found' });
    const invitation = FriendInvitation.create({
      senderId: myId,
      receiverId: receiverId,
    });
    return res.status(200).send({ message: 'Send invitation successfully!' });
  },

  getFriendRequests: async (req, res, next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ message: 'User not found' });
    const invitations = await FriendInvitation.find({
      receiverId: userId,
      status: InviteStatus.processing(),
    }).sort({ updateAt: 'desc' });
    return res
      .status(200)
      .send({ message: 'Get friend requests successfully', data: invitations });
  },

  acceptFriendRequest: async (req, res, next) => {
    const inviteId = req.params.inviteId;
    const invitation = await FriendInvitation.findById(inviteId);
    if (!invitation || invitation.status != InviteStatus.processing())
      res.status(400).send({ message: 'Invitation not found' });
    invitation.status = InviteStatus.agreed;
    await ChatRoom.create({
      userIds: [invitation.senderId, invitation.receiverId],
    });
    const sender = await User.findByIdAndUpdate(invitation.senderId, {
      $push: { friendIdsList: invitation.receiverId },
    });
    if (!sender) return res.status(400).send({ message: 'User not found' });
    const receiver = await User.findByIdAndUpdate(invitation.receiverId, {
      $push: { friendIdsList: invitation.senderId },
    });
    if (!receiver) return res.status(400).send({ message: 'User not found' });
    await invitation.save();
    return res.status(200).send({ message: 'Accept invitation successfully!' });
  },

  cancelledFriendRequest: async (req, res, next) => {
    const inviteId = req.params.inviteId;
    const invitation = await FriendInvitation.findById(inviteId);
    if (!invitation || invitation.status != InviteStatus.processing())
      res.status(400).send({ message: 'Invitation not found' });
    invitation.status = InviteStatus.cancelled;
    await invitation.save();
    return res
      .status(200)
      .send({ message: 'Cancelled invitation successfully!' });
  },
};

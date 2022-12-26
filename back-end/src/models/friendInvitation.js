const User = require('../entities/user');
const ChatRoom = require('../entities/chatRoom');
const FriendInvitation = require('../entities/friendInvitation');
const { InviteStatus } = require('../utils/inviteStatus');
const { ResponseAPI } = require('../utils/response');

class FriendInvitationModel {
  static async sendFriendRequest(myId, receiverId) {
    // const { myId, receiverId } = req.body;
    const myUser = await User.findById(myId);
    if (!myUser) return new ResponseAPI(400, { message: 'User not found' });
    const yourUser = await User.findById(receiverId);
    if (!yourUser) return new ResponseAPI(400, { message: 'User not found' });
    if (myUser.friendIdsList.includes(receiverId))
      return new ResponseAPI(400, { message: 'Already friend' });
    const invitation = FriendInvitation.create({
      senderId: myId,
      receiverId: receiverId,
    });
    return new ResponseAPI(200, { message: 'Send invitation successfully!' });
  }

  static async getFriendRequests(userId) {
    // const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return new ResponseAPI(400, { message: 'User not found' });
    const invitations = await FriendInvitation.find({
      receiverId: userId,
      status: InviteStatus.processing(),
    }).sort({ updateAt: 'desc' });
    if (invitations.length == 0)
      return new ResponseAPI(400, {
        message: 'No friend requests available',
      });
    return new ResponseAPI(200, {
      message: 'Get friend requests successfully',
      data: invitations,
    });
  }

  static async getAllRequestsUserSend(userId) {
    const user = await User.findById(userId);
    if (!user) return new ResponseAPI(400, { message: 'User not found' });
    const invitations = await FriendInvitation.find({
      senderId: userId,
      status: InviteStatus.processing(),
    }).sort({ updateAt: 'desc' });
    if (invitations.length == 0)
      return new ResponseAPI(400, {
        message: 'No friend requests available',
      });
    return new ResponseAPI(200, {
      message: 'Get friend requests successfully',
      data: invitations,
    });
  }

  static async acceptFriendRequest(inviteId) {
    // const inviteId = req.params.inviteId;
    const invitation = await FriendInvitation.findById(inviteId);
    if (!invitation || invitation.status != InviteStatus.processing())
      new ResponseAPI(400, { message: 'Invitation not found' });
    invitation.status = InviteStatus.agreed;
    await ChatRoom.create({
      userIds: [invitation.senderId, invitation.receiverId],
    });
    const sender = await User.findByIdAndUpdate(invitation.senderId, {
      $push: { friendIdsList: invitation.receiverId },
    });
    if (!sender) return new ResponseAPI(400, { message: 'User not found' });
    const receiver = await User.findByIdAndUpdate(invitation.receiverId, {
      $push: { friendIdsList: invitation.senderId },
    });
    if (!receiver) return new ResponseAPI(400, { message: 'User not found' });
    if (sender.friendIdsList.includes(receiver._id.toString()))
      return new ResponseAPI(400, { message: 'Already friend' });
    await invitation.save();
    return new ResponseAPI(200, { message: 'Accept invitation successfully!' });
  }

  static async cancelledFriendRequest(inviteId) {
    // const inviteId = req.params.inviteId;
    const invitation = await FriendInvitation.findById(inviteId);
    if (!invitation || invitation.status != InviteStatus.processing())
      new ResponseAPI(400, { message: 'Invitation not found' });
    invitation.status = InviteStatus.cancelled;
    await invitation.save();
    return new ResponseAPI(200, {
      message: 'Cancelled invitation successfully!',
    });
  }
}

exports.FriendInvitationModel = FriendInvitationModel;

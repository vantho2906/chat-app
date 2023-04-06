const User = require('../entities/user');
const ChatRoom = require('../entities/chatRoom');
const FriendInvitation = require('../entities/friendInvitation');
const { InviteStatus } = require('../utils/inviteStatus');
const { ResponseAPI } = require('../utils/response');
const { UserModel } = require('./user');
const friendInvitation = require('../entities/friendInvitation');

class FriendInvitationModel {
  static async sendFriendRequest(myId, receiverId) {
    // const { myId, receiverId } = req.body;
    const myUser = await User.findById(myId);
    if (!myUser) return new ResponseAPI(400, { message: 'User not found' });
    const yourUser = await User.findById(receiverId);
    if (!yourUser) return new ResponseAPI(400, { message: 'User not found' });
    if (myUser.friendIdsList.includes(receiverId))
      return new ResponseAPI(400, { message: 'Already friend' });
    const findInvitation = await FriendInvitation.findOne({
      senderId: myId,
      receiverId: receiverId,
    });
    if (findInvitation) {
      if (findInvitation.status == 'processing')
        return new ResponseAPI(400, { message: 'Already send before' });
      else if (findInvitation.status == 'agreed')
        return new ResponseAPI(400, 'Already friend');
      else {
        findInvitation.status = 'processing';
        findInvitation.save();
        return new ResponseAPI(200, {
          message: 'Send invitation successfully!',
        });
      }
    } else {
      const invitation = await FriendInvitation.create({
        senderId: myId,
        receiverId: receiverId,
      });
      return new ResponseAPI(200, {
        message: 'Send invitation successfully!',
      });
    }
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

  static async getAllRequestsUserSendAndRequest(userId) {
    const user = await User.findById(userId);
    if (!user) return new ResponseAPI(400, { message: 'User not found' });
    const invitations = await FriendInvitation.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
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
    invitation.status = InviteStatus.agreed();
    const doc = await ChatRoom.create({
      userIds: [invitation.senderId, invitation.receiverId],
    });
    await User.findByIdAndUpdate(invitation.senderId.toString(), {
      $push: { chatroom: doc._id },
    });
    await User.findByIdAndUpdate(invitation.receiverId.toString(), {
      $push: { chatroom: doc._id },
    });
    const sender = await User.findByIdAndUpdate(
      invitation.senderId.toString(),
      {
        $push: { friendIdsList: invitation.receiverId },
      }
    );
    if (!sender) return new ResponseAPI(400, { message: 'User not found' });
    const receiver = await User.findByIdAndUpdate(
      invitation.receiverId.toString(),
      {
        $push: { friendIdsList: invitation.senderId.toString() },
      }
    );
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
      return new ResponseAPI(400, { message: 'Invitation not found' });
    invitation.status = InviteStatus.cancelled();
    await invitation.save();
    return new ResponseAPI(200, {
      message: 'Cancelled invitation successfully!',
    });
  }

  static async unFriend(myId, yourId) {
    const me = await User.findById(myId);
    if (!me) return new ResponseAPI(400, { message: 'User not found' });
    const your = await User.findById(yourId);
    if (!your) return new ResponseAPI(400, { message: 'User not found' });
    if (!me.friendIdsList.includes(yourId))
      return new ResponseAPI(400, { message: 'Not friend yet!' });
    if (!your.friendIdsList.includes(myId))
      return new ResponseAPI(400, { message: 'Not friend yet!' });
    me.friendIdsList.push(myId);
    your.friendIdsList.push(yourId);
    const invitation = await friendInvitation.find({
      senderId: { $in: [myId, yourId] },
      receiverId: { $in: [myId, yourId] },
    });
    for (let i = 0; i < invitation.length; i++) {
      await invitation[i].delete();
    }
    return new ResponseAPI(200, { message: 'Unfriend successfully!' });
  }
}

exports.FriendInvitationModel = FriendInvitationModel;

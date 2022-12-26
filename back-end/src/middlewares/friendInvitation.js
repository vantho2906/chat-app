const { FriendInvitationModel } = require('../models/friendInvitation');

class FriendInvitationMiddleware {
  static async sendFriendRequest(req, res, next) {
    const { myId, receiverId } = req.body;
    const result = await FriendInvitationModel.sendFriendRequest(
      myId,
      receiverId
    );
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async getFriendRequests(req, res, next) {
    const userId = req.params.userId;
    const result = await FriendInvitationModel.getFriendRequests(userId);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async getAllRequestsUserSend(req, res, next) {
    const userId = req.params.userId;
    const result = await FriendInvitationModel.getAllRequestsUserSend(userId);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async acceptFriendRequest(req, res, next) {
    const inviteId = req.params.inviteId;
    const result = await FriendInvitationModel.acceptFriendRequest(inviteId);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async cancelledFriendRequest(req, res, next) {
    const inviteId = req.params.inviteId;
    const result = await FriendInvitationModel.cancelledFriendRequest(inviteId);
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.FriendInvitationMiddleware = FriendInvitationMiddleware;

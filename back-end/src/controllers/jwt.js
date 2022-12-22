const jwt = require('jsonwebtoken');
const { getCurrentUser } = require('./user');
const secret = process.env.JWT_SECRET;

module.exports = {
  checkJwt: async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
      return res.status(400).send({ message: 'Please login!' });
    }
    token = token.replace('Bearer ', '');
    let jwtPayload;
    jwt.verify(token, secret, (err, payload) => {
      if (err)
        return res
          .status(400)
          .send({ message: 'Unauthorized: Authentication required!' });
      jwtPayload = payload;
    });
    const currentUser = await getCurrentUser(jwtPayload.userId);
    if (!currentUser)
      return res
        .status(400)
        .send({ message: 'Unauthorized: Authentication required!' });
    res.locals.user = currentUser;
    const { userId, email } = jwtPayload;
    const newToken = jwt.sign({ userId, email }, secret);
    res.setHeader('Authorization', newToken);
    return next();
  },
};

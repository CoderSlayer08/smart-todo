const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Not authorized, no token', 401);
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return errorResponse(res, 'Not authorized, token failed', 401);
  }

  req.user = { id: decoded.id };
  next();
};

module.exports = { protect };

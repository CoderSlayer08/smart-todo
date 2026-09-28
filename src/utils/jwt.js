const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'fallback_secret_for_demo_purposes_only', {
    expiresIn: '7d'
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_demo_purposes_only');
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};

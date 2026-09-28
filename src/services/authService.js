const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { generateToken } = require('../utils/jwt');

const register = async (name, email, password) => {
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(12);
  const password_hash = await bcrypt.hash(password, salt);

  const newUser = await userModel.createUser({
    name,
    email,
    password_hash
  });

  const token = generateToken(newUser.id);
  
  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    },
    token
  };
};

const login = async (email, password) => {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id);
  
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token
  };
};

const getMe = async (userId) => {
  const user = await userModel.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = {
  register,
  login,
  getMe
};

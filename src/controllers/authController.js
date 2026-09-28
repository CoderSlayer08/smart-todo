const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return errorResponse(res, 'Please provide all fields', 400);
    }
    
    const data = await authService.register(name, email, password);
    return successResponse(res, data, 'User registered successfully', 201);
  } catch (error) {
    if (error.message === 'User already exists') {
      return errorResponse(res, error.message, 400);
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return errorResponse(res, 'Please provide email and password', 400);
    }
    
    const data = await authService.login(email, password);
    return successResponse(res, data, 'Login successful');
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      return errorResponse(res, error.message, 401);
    }
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    return successResponse(res, { user }, 'User retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};

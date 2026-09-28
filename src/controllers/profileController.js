const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { successResponse, errorResponse } = require('../utils/response');

const getProfile = async (req, res, next) => {
  try {
    const user = await userModel.findUserById(req.user.id);
    return successResponse(res, user, 'Profile retrieved successfully');
  } catch (error) { next(error); }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, currentPassword, newPassword } = req.body;
    let updateData = {};
    
    if (name) updateData.name = name;
    
    if (newPassword && currentPassword) {
      const fullUser = await userModel.findUserById(req.user.id);
      if (!fullUser) throw new Error('User not found');
      
      const isMatch = await bcrypt.compare(currentPassword, fullUser.password_hash);
      if (!isMatch) return errorResponse(res, 'Invalid current password', 400);
      
      const salt = await bcrypt.genSalt(12);
      updateData.password_hash = await bcrypt.hash(newPassword, salt);
    }
    
    if (Object.keys(updateData).length > 0) {
      const updatedUser = await userModel.updateUser(req.user.id, updateData);
      return successResponse(res, updatedUser, 'Profile updated successfully');
    }
    
    return successResponse(res, null, 'No changes made');
  } catch (error) { next(error); }
};

module.exports = {
  getProfile,
  updateProfile
};

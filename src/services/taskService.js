const taskModel = require('../models/taskModel');

const createTask = async (userId, taskData) => {
  return await taskModel.createTask({
    ...taskData,
    user_id: userId
  });
};

const getTasks = async (userId, filters) => {
  return await taskModel.findTasksByUser(userId, filters);
};

const getTaskById = async (taskId, userId) => {
  const task = await taskModel.findTaskByIdAndUser(taskId, userId);
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

const updateTask = async (taskId, userId, updateData) => {
  await getTaskById(taskId, userId); // Ensure it exists and belongs to user
  return await taskModel.updateTask(taskId, userId, updateData);
};

const deleteTask = async (taskId, userId) => {
  await getTaskById(taskId, userId);
  return await taskModel.deleteTask(taskId, userId);
};

const completeTask = async (taskId, userId) => {
  await getTaskById(taskId, userId);
  return await taskModel.updateTask(taskId, userId, { 
    status: 'completed',
    completed_at: new Date().toISOString()
  });
};

const uncompleteTask = async (taskId, userId) => {
  await getTaskById(taskId, userId);
  return await taskModel.updateTask(taskId, userId, { 
    status: 'pending',
    completed_at: null
  });
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask,
  uncompleteTask
};

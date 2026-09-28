const taskService = require('../services/taskService');
const { successResponse, errorResponse } = require('../utils/response');

const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, category, due_date, status } = req.body;
    if (!title) {
      return errorResponse(res, 'Title is required', 400);
    }
    
    const task = await taskService.createTask(req.user.id, {
      title, description, priority, category, due_date, status
    });
    
    return successResponse(res, task, 'Task created successfully! 🎉', 201);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { status, priority, category } = req.query;
    const tasks = await taskService.getTasks(req.user.id, { status, priority, category });
    return successResponse(res, tasks, 'Tasks retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id);
    return successResponse(res, task, 'Task retrieved successfully');
  } catch (error) {
    if (error.message === 'Task not found') {
      return errorResponse(res, 'Task not found', 404);
    }
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
    return successResponse(res, task, 'Task updated successfully');
  } catch (error) {
    if (error.message === 'Task not found') {
      return errorResponse(res, 'Task not found', 404);
    }
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    return successResponse(res, null, 'Task deleted.');
  } catch (error) {
    if (error.message === 'Task not found') {
      return errorResponse(res, 'Task not found', 404);
    }
    next(error);
  }
};

const completeTask = async (req, res, next) => {
  try {
    const task = await taskService.completeTask(req.params.id, req.user.id);
    return successResponse(res, task, 'Task marked as completed');
  } catch (error) {
    if (error.message === 'Task not found') {
      return errorResponse(res, 'Task not found', 404);
    }
    next(error);
  }
};

const uncompleteTask = async (req, res, next) => {
  try {
    const task = await taskService.uncompleteTask(req.params.id, req.user.id);
    return successResponse(res, task, 'Task marked as pending');
  } catch (error) {
    if (error.message === 'Task not found') {
      return errorResponse(res, 'Task not found', 404);
    }
    next(error);
  }
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

const db = require('../config/mockDb');
const crypto = require('crypto');

const createTask = async (taskData) => {
  const newTask = {
    id: crypto.randomUUID(),
    ...taskData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  db.tasks.push(newTask);
  return newTask;
};

const findTasksByUser = async (userId, filters = {}) => {
  let tasks = db.tasks.filter(t => t.user_id === userId);
  
  if (filters.status) tasks = tasks.filter(t => t.status === filters.status);
  if (filters.priority) tasks = tasks.filter(t => t.priority === filters.priority);
  if (filters.category) tasks = tasks.filter(t => t.category === filters.category);
  
  return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

const findTaskByIdAndUser = async (taskId, userId) => {
  const task = db.tasks.find(t => t.id === taskId && t.user_id === userId);
  if (!task) throw new Error('Task not found');
  return task;
};

const updateTask = async (taskId, userId, updateData) => {
  const index = db.tasks.findIndex(t => t.id === taskId && t.user_id === userId);
  if (index === -1) throw new Error('Task not found');
  db.tasks[index] = { ...db.tasks[index], ...updateData, updated_at: new Date().toISOString() };
  return db.tasks[index];
};

const deleteTask = async (taskId, userId) => {
  const index = db.tasks.findIndex(t => t.id === taskId && t.user_id === userId);
  if (index === -1) throw new Error('Task not found');
  const deleted = db.tasks.splice(index, 1);
  return deleted[0];
};

module.exports = {
  createTask,
  findTasksByUser,
  findTaskByIdAndUser,
  updateTask,
  deleteTask
};

const db = require('../config/mockDb');
const crypto = require('crypto');

const createUser = async (userData) => {
  const newUser = {
    id: crypto.randomUUID(),
    ...userData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  db.users.push(newUser);
  return newUser;
};

const findUserByEmail = async (email) => {
  return db.users.find(u => u.email === email) || null;
};

const findUserById = async (id) => {
  return db.users.find(u => u.id === id) || null;
};

const updateUser = async (id, updateData) => {
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) throw new Error('User not found');
  db.users[index] = { ...db.users[index], ...updateData, updated_at: new Date().toISOString() };
  return db.users[index];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser
};

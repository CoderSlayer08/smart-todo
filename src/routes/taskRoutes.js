const express = require('express');
const { 
  createTask, getTasks, getTaskById, updateTask, deleteTask, completeTask, uncompleteTask 
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All task routes are protected

router.route('/')
  .post(createTask)
  .get(getTasks);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/complete', completeTask);
router.patch('/:id/uncomplete', uncompleteTask);

module.exports = router;

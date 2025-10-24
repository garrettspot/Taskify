const express = require('express');
const { body } = require('express-validator');
const { 
  getTasks, 
  createTask, 
  getTask, 
  updateTask, 
  deleteTask, 
  toggleTask 
} = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All task routes are protected
router.use(authenticateToken);

// Get all tasks for authenticated user
router.get('/', getTasks);

// Create new task
router.post('/', [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title too long'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description too long'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format')
], createTask);

// Get single task
router.get('/:id', getTask);

// Update task
router.put('/:id', [
  body('title').optional().isLength({ max: 100 }).withMessage('Title too long'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description too long'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
  body('completed').optional().isBoolean().withMessage('Completed must be boolean')
], updateTask);

// Delete task
router.delete('/:id', deleteTask);

// Toggle task completion
router.patch('/:id/toggle', toggleTask);

module.exports = router;

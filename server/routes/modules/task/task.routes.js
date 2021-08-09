const express = require('express');
require('dotenv').config();

const router = express.Router();
const { check } = require('express-validator');
const requestValidator = require('../../../middleware/requestValidator');
const authValidator = require('../../../middleware/authValidator');

const {
  getTasksByProjectAction,
  addTaskAction,
  updateTaskAction,
  deleteTaskAction,
  updateTaskStatusAction,
  deleteAllTasksAction,
} = require('./task.actions');

// Get tasks by project
router.get('/:_id', authValidator, getTasksByProjectAction);

// Add task to a project
router.post(
  '/:projectId',
  authValidator,
  check('name', 'Name is required').notEmpty(),
  requestValidator,
  addTaskAction,
);

// Update task
router.put(
  '/:_id',
  authValidator,
  check('name', 'Name is required').notEmpty(),
  requestValidator,
  updateTaskAction,
);

// Delete task from project
router.delete('/:_id', authValidator, requestValidator, deleteTaskAction);

// Delete all tasks from project
router.delete('/:projectId/all', authValidator, requestValidator, deleteAllTasksAction);

// Update task status
router.put(
  '/:_id/status',
  authValidator,
  requestValidator,
  updateTaskStatusAction,
);

module.exports = router;

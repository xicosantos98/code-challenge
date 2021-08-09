const express = require('express');
require('dotenv').config();

const router = express.Router();
const { check } = require('express-validator');
const requestValidator = require('../../../middleware/requestValidator');
const authValidator = require('../../../middleware/authValidator');

const {
  addUserAction,
  getUserDetailsAction,
  authenticateUserAction,
} = require('./user.actions');

// Get user details by id
router.get('/', authValidator, getUserDetailsAction);

// Add new user
router.post(
  '/register',
  check('name', 'Name is required').notEmpty(),
  check('username', 'Username is required').notEmpty(),
  check(
    'password',
    'Please enter a password with 6 or more characters',
  ).isLength({ min: 4 }),
  requestValidator,
  addUserAction,
);

// Authenticate user & get token
router.post(
  '/login',
  check('username', 'Username is required').exists(),
  check('password', 'Password is required').exists(),
  requestValidator,
  authenticateUserAction,
);

module.exports = router;

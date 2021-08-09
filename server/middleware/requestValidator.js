const { validationResult } = require('express-validator');

// Check for missing parameters and send errors as response
const requestValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: true, messages: errors.array() });
    return;
  }

  next();
};

module.exports = requestValidator;

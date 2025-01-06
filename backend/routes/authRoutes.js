const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();



// Registration Route with log for debugging
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    console.log('Register route hit');
    next();  // Proceed to the next middleware, which is authController.register
  },
  authController.register
);

// Login Route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

// Protected Route Example
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route!', user: req.user });
});


module.exports = router;

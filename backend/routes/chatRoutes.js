const express = require('express');
const { check } = require('express-validator');
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

const router = express.Router();

// Send Message Route
router.post(
  '/send',
  [auth, [check('text', 'Message text is required').not().isEmpty()]],
  chatController.sendMessage
);

// Get User Messages Route

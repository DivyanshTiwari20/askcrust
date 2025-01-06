const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Make sure the User model is correctly set up
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registration Controller
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    // Debugging: Log the user to check if it was fetched correctly
    console.log('User found:', user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Debugging: Check the received password and stored hashed password
    console.log('Received password:', password);
    console.log('Stored password hash:', user.password);

    // **Ensure password trimming**: Remove unintended spaces
    const trimmedPassword = password.trim();
    console.log('Trimmed password:', trimmedPassword);

    // Compare the received password with the stored hashed password
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);

    // Debugging: Log the result of password comparison
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const payload = {
      user: {
        id: user._id, // Include the user's ID in the JWT payload
      },
    };

    // Generate token with 1-hour expiration
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token in response
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
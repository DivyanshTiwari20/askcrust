const Message = require('../models/Message');

// Send a new message
exports.sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = new Message({
      sender: req.user.userId,
      content,
    });
    await message.save();
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (error) {
    res.status(400).json({ error: 'Failed to send message' });
  }
};

// Get message history
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'username');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve messages' });
  }
};

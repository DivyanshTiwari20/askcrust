const Message = require('../models/Message');

// Send Message
exports.sendMessage = async (req, res) => {
  const { text } = req.body;

  try {
    const message = new Message({
      user: req.user.id,
      text,
    });

    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get User Messages
exports.getUserMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

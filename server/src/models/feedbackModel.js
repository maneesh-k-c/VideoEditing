const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  login_id: { type: mongoose.Types.ObjectId, ref: 'login_tb' },
  editor_id: { type: mongoose.Types.ObjectId, ref: 'editor_tb' },
  feedback: { type: String, require: true },
});

var feedbackData = mongoose.model('user_tb', feedbackSchema);

module.exports = feedbackData;
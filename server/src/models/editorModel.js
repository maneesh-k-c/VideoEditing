const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({
  login_id: { type: mongoose.Types.ObjectId, ref: 'login_tb' },
  name: { type: String, require: true },
  mobile: { type: String, require: true },
  address: { type: String, require: true },
  tools: { type: String, require: true },
});

var editorData = mongoose.model('editor_tb', editorSchema);

module.exports = editorData;
const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({
  login_id: { type: mongoose.Types.ObjectId, ref: 'login_tb' },
  name: { type: String, require: true },
  mobile: { type: String, require: true },
  email: { type: String, require: true },
  upi: { type: String, require: true },
  qualification: { type: String, require: true },
  image: { type: [String], require: true },
});

var editorData = mongoose.model('editor_tb', editorSchema);

module.exports = editorData;
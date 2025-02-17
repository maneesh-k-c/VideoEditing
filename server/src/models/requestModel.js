const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  login_id: { type: mongoose.Types.ObjectId, ref: 'login_tb' },
  editor_login_id: { type: mongoose.Types.ObjectId, ref: 'login_tb' },
  content_type: { type: String, require: true },
  content_url: { type: [String], require: true },
  description: { type: String, require: true },
  payment:{ type: String},
  status: { type: String, require: true },
});

var requestData = mongoose.model('request_tb', requestSchema);

module.exports = requestData;
const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema({
  request_id: { type: mongoose.Types.ObjectId, ref: 'request_tb' },
  editor_login_id: { type: mongoose.Types.ObjectId, ref: 'login_tb' },
  status: { type: String, require: true },
});

var approvalData = mongoose.model('approval_tb', approvalSchema);

module.exports = approvalData;
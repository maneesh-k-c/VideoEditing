const mongoose = require('mongoose');

const outPutSchema = new mongoose.Schema({
  request_id: { type: mongoose.Types.ObjectId, ref: 'request_tb' },
  editor_login_id: { type: mongoose.Types.ObjectId, ref: 'login_tb' },
  content_type: { type: String, require: true },
  content_url: { type: [String], require: true },
  out_put_url: { type: String, require: true },
  description: { type: String, require: true },
  status: { type: String, require: true },
});

var outputData = mongoose.model('output_tb', outPutSchema);

module.exports = outputData;
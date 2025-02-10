const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    users: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user_tb' }, // Refers to user_tb collection
            editor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'editor_tb' }, // Refers to editor_tb collection
        },
    ],
    messages: [
        {
            sender: String,
            text: String,
            status:String,
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const chatData = mongoose.model('chat_tb', chatSchema);

module.exports = chatData;

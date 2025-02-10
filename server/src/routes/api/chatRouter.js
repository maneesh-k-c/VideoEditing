const express = require('express');
const chatData = require('../../models/chatModel');
const { default: mongoose } = require('mongoose');
const chatRouter = express.Router()

chatRouter.post('/send-message', async (req, res) => {
    const { user_id, editor_id, sender, text } = req.body;

    // Validate request data
    if (!user_id || !editor_id || !sender || !text ) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        // Convert user_id and editor_id to ObjectId
        const userId = new mongoose.Types.ObjectId(user_id);
        const editorId = new mongoose.Types.ObjectId(editor_id);

        // Check if a chat already exists between the user and the editor
        let chat = await chatData.findOne({
            users: { $elemMatch: { user_id: userId, editor_id: editorId } },
        });

        if (!chat) {
            // If no chat exists, create a new chat
            chat = new chatData({
                users: [{ user_id: userId, editor_id: editorId }],
                messages: [],
            });
        }

        // Add the new message to the chat
        chat.messages.push({
            sender,
            text,
            status:'sent',
        });

        // Save the chat
        await chat.save();

        res.status(200).json({
            message: 'message sent',
            chat,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

chatRouter.get('/chat/:userId/:editorId', async (req, res) => {
    const { userId, editorId } = req.params;
    let chat = await chatData.findOne({
        users: { $elemMatch: { user_id: userId, editor_id: editorId } },
    });
    res.json(chat ? chat.messages : []);
});

module.exports = chatRouter
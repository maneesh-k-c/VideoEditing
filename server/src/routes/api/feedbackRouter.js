const express = require("express");
const feedbackData = require("../../models/feedBackModel");
const feedbackRouter = express.Router();

feedbackRouter.post('/add-feedback', async (req, res, next) => {
    try {
      
        let data = {
            login_id: req.body.login_id,
            editor_id: req.body.editor_id,
            feedback: req.body.feedback
        };
        const result = await feedbackData(data).save();

        if (result) {
            return res.status(200).json({
                Success: true,
                Error: false,
                data: result,
                Message: 'Feedback added',
            });
        } else {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Failed to add feedback',
            });
        }
    } catch (error) {
        return res.status(500).json({
            Success: false,
            Error: true,
            Message: 'Something went wrong',
        });
    }
});

feedbackRouter.post('/view-feedback', async (req, res, next) => {
    try {
      const result = await feedbackData.find().populate('login_id').populate('editor_id');

        if (result) {
            return res.status(200).json({
                Success: true,
                Error: false,
                data: result,
            });
        } else {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Failed to view feedback',
            });
        }
    } catch (error) {
        return res.status(500).json({
            Success: false,
            Error: true,
            Message: 'Something went wrong',
        });
    }
});



module.exports = feedbackRouter;
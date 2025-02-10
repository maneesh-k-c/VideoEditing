const express = require("express");
const requestData = require("../../models/requestModel");
const approvalData = require("../../models/approvalModel");
const editorRouter = express.Router();

editorRouter.get('/view_pending_request', async (req, res) => {
    try {
        const requestDatas = await requestData.find({ status: 'pending' });
        if (requestDatas) {
            return res.status(200).json({
                Success: true,
                Error: false,
                Data: requestDatas,
                Message: 'Request has been fetched',
            });
        }
        else {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Failed while fetching request',
            })
        }
    } catch (error) {
        return res.status(500).json({
            Success: false,
            Error: true,
            Message: 'Something went wrong',
        });
    }
})

editorRouter.get('/view_single_request/:id', async (req, res) => {
    try {
        const requestDatas = await requestData.findOne({ _id: req.params.id });
        if (requestDatas) {
            return res.status(200).json({
                Success: true,
                Error: false,
                Data: requestDatas,
                Message: 'Request has been fetched',
            });
        }
        else {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Failed while fetching request',
            })
        }
    } catch (error) {
        return res.status(500).json({
            Success: false,
            Error: true,
            Message: 'Something went wrong',
        });
    }
})

editorRouter.post('/accept_request', async (req, res) => {
    try {
        const id = req.body.id;
        const updateData = await requestData.updateOne({ _id: id }, { $set: { editor_login_id: req.body.editor_login_id, status: accepted } });
        if (updateData.modifiedCount == 1) {
            return res.status(200).json({
                Success: true,
                Error: false,
                Message: 'Request has been accepeted',
            });
        } else {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Failed while accepting request',
            })
        }
    } catch (error) {
        return res.status(500).json({
            Success: false,
            Error: true,
            Message: 'Something went wrong',
        });
    }

})

editorRouter.post('/request_for_approval', async (req, res) => {
    try {
        const data = {
            request_id: req.body.request_id,
            editor_login_id: req.body.editor_login_id,
            status: 'waiting'
        }
        const find = await approvalData.findOne({request_id: req.body.request_id,editor_login_id: req.body.editor_login_id})
        if(find){
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'waiting for response',
            })
        }
        const updateData = await approvalData(data).save();
        if (updateData) {
            return res.status(200).json({
                Success: true,
                Error: false,
                Message: 'Request has been sent',
            });
        } else {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Failed while sending request',
            })
        }
    } catch (error) {
        return res.status(500).json({
            Success: false,
            Error: true,
            Message: 'Something went wrong',
        });
    }

})






module.exports = editorRouter;
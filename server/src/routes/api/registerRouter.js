const express = require('express');
const loginData = require('../../models/loginModel');
const userData = require('../../models/userModel');
const editorData = require('../../models/editorModel');
const registerRouter = express.Router();

// user role 1
// editor role 2

registerRouter.post('/user', async (req, res, next) => {
    try {

        const oldEmail = await loginData.findOne({ username: req.body.username });
        if (oldEmail) {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Username already exist, Please Log In',
            });
        }
        const oldPhone = await userData.findOne({ mobile: req.body.mobile });
        if (oldPhone) {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Mobile number already exist',
            });
        }

        // const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let log = {
            username: req.body.username,
            password: req.body.password,
            role: 'user',
            status: 'pending'
        };

        console.log(log);
        const result = await loginData(log).save();
        console.log(result);
        let reg = {
            login_id: result._id,
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email
        };
        const result2 = await userData(reg).save();

        if (result2) {
            return res.json({
                Success: true,
                Error: false,
                data: result2,
                Message: 'Registration Successful',
            });
        } else {
            return res.json({
                Success: false,
                Error: true,
                Message: 'Registration Failed',
            });
        }
    } catch (error) {
        return res.status(400).json({
            Success: false,
            Error: true,
            Message: 'Something went wrong',
        });
    }
});


registerRouter.post('/editor', async (req, res, next) => {
    try {
        const oldEmail = await loginData.findOne({ username: req.body.username });
        if (oldEmail) {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Username already exist, Please Log In',
            });
        }
        const oldPhone = await userData.findOne({ mobile: req.body.mobile });
        if (oldPhone) {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Mobile number already exist',
            });
        }

        // const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let log = {
            username: req.body.username,
            password: req.body.password,
            role: 'editor',
            status: 'approved'
        };
        const result = await loginData(log).save();
        console.log(result);
        let reg = {
            login_id: result._id,
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            qualification: req.body.qualification,
        };
        const result2 = await editorData(reg).save();

        if (result2) {
            return res.json({
                Success: true,
                Error: false,
                data: result2,
                Message: 'Registration Successful',
            });
        } else {
            return res.json({
                Success: false,
                Error: true,
                Message: 'Registration Failed',
            });
        }
    } catch (error) {
        return res.json({
            Success: false,
            Error: true,
            Message: 'Something went wrong',
        });
    }
});


registerRouter.post('/checklogin', async (req, res) => {
    try {
        const oldUser = await loginData.findOne({ username: req.body.username })
        if (!oldUser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'No user exists'
            });
        }
        if (oldUser.password == req.body.password) {
            if (oldUser.status == 'approved') {
                return res.status(200).json({
                    success: false,
                    error: true,
                    data: oldUser
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'waiting for admins approval'
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Wrong password'
            });
        }



    } catch (error) {

    }
});

registerRouter.get('/all-editors', async (req, res) => {
    try {

        const clients = await editorData.find().populate('login_id')
        if (clients) {
            return res.status(200).json({
                success: false,
                error: true,
                data: clients
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'No data'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong  '
        });
    }
})
registerRouter.get('/approve-editor/:id', async (req, res) => {
    try {

        const clients = await loginData.updateOne({_id:req.params.id},{$set:{status:'approved'}})
        if (clients.modifiedCount==1) {
            return res.status(200).json({
                success: false,
                error: true,
                message: 'Editor Approved'
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'No data'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong  '
        });
    }
})
registerRouter.get('/delete-editor/:id', async (req, res) => {      
    try {

        const clients = await editorData.deleteOne({ login_id: req.params.id })
        if (clients) {
            const loginDatas = await loginData.deleteOne({ _id: req.params.id })
            return res.status(200).json({
                success: false,
                error: true,
                data: 'Editor deletedd'
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Error deleting Editor'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong'
        });
    }
})
registerRouter.get('/all-users', async (req, res) => {
    try {

        const clients = await userData.find().populate('login_id')
        if (clients) {
            return res.status(200).json({
                success: false,
                error: true,
                data: clients
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'No data'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong  '
        });
    }
})
registerRouter.get('/approve-user/:id', async (req, res) => {
    try {

        const clients = await loginData.updateOne({_id:req.params.id},{$set:{status:'approved'}})
        if (clients.modifiedCount==1) {
            return res.status(200).json({
                success: false,
                error: true,
                message: 'Client Approved'
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'No data'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong  '
        });
    }
})
registerRouter.get('/delete-user/:id', async (req, res) => {
    try {

        const clients = await userData.deleteOne({ login_id: req.params.id })
        if (clients) {
            const loginDatas = await loginData.deleteOne({ _id: req.params.id })
            return res.status(200).json({
                success: false,
                error: true,
                data: 'Client deletedd'
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Error deleting Client'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong'
        });
    }
})

registerRouter.get('/all-collection', async (req, res) => {
    try {

        const clients = await userData.find()
        const editor = await editorData.find()
        
        if (clients) {
            const collection = {
                user:clients.length,
                editor:editor.length,
            }
            console.log(collection);
            return res.status(200).json({
                success: false,
                error: true,
                data: collection
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'No data'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong  '
        });
    }
})




module.exports = registerRouter;
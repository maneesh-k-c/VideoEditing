const express = require('express');
const loginData = require('../../models/loginModel');
const userData = require('../../models/userModel');
const editorData = require('../../models/editorModel');
const registerRouter = express.Router();

// user role 1
// editor role 2

registerRouter.post('/user', async (req, res, next) => {
    try {
        const oldEmail = await loginData.findOne({ email: req.body.email });
        if (oldEmail) {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Email already exist, Please Log In',
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

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let log = {
            email: req.body.email,
            password: hashedPassword,
            role: 1,
            status: 1
        };
        const result = await loginData(log).save();
        console.log(result);
        let reg = {
            login_id: result._id,
            name: req.body.name,
            mobile: req.body.mobile,
            address: req.body.address
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
        return res.json({
            Success: false,
            Error: true,
            Message: 'Something went wrong',
        });
    }
});


registerRouter.post('/editor', async (req, res, next) => {
    try {
        const oldEmail = await loginData.findOne({ email: req.body.email });
        if (oldEmail) {
            return res.status(400).json({
                Success: false,
                Error: true,
                Message: 'Email already exist, Please Log In',
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

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let log = {
            email: req.body.email,
            password: hashedPassword,
            role: 1,
            status: 1
        };
        const result = await loginData(log).save();
        console.log(result);
        let reg = {
            login_id: result._id,
            name: req.body.name,
            mobile: req.body.mobile,
            address: req.body.address,
            tools: req.body.tools,
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




module.exports = registerRouter;
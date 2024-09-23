const express = require("express");
const userData = require("../../models/userModel");
const loginData = require("../../models/loginModel");
const userRouter = express.Router();


userRouter.get('/profile/:loginId', async (req, res) => {
    try {
      const id = req.params.loginId;
      const user = await userData.findOne({ login_id: id }).populate('login_id');
      if (user) {
        return res.status(200).json({
          Success: true,
          Error: false,
          data: user,
          Message: 'Data Found',
        })
      } else {
        return res.status(404).json({
          Success: false,
          Error: true,
          data: null,
          Message: 'Data Not Found',
        })
      }
  
    } catch (error) {
      return res.status(500).json({
        Success: false,
        Error: true,
        data: null,
        Message: 'Internal Server Error',
      })
    }
})

userRouter.get('/update_profile/:id', async (req, res) => {
    try {
      const objectId = req.params.id;
      const previousData = await userData.findOne({
        _id: objectId,
      });
      var updateData = {
        login_id: previousData.login_id,
        name: req.body.name ? req.body.name : previousData.name,
        mobile: req.body.mobile ? req.body.mobile : previousData.mobile,
        address: req.body.address ? req.body.address : previousData.address,
        // image: req.files && req.files.length > 0
        //   ? req.files.map((file) => file.path)
        //   : previousData.image,
      };
      const Data = await userData.updateOne(
        { _id: objectId },
        { $set: updateData }
      );
  
      if (Data.modifiedCount == 1) {
        return res.status(200).json({
          Success: true,
          Error: false,
          data: Data,
          Message: 'Profile updated successfully',
        });
      } else {
        return res.status(400).json({
          Success: false,
          Error: true,
          Message: 'Failed while updating profile',
        });
      }
    } catch (error) {
      return res.json({
        Success: false,
        Error: true,
        Message: 'Something went wrong',
      });
    }
  
  
  
  
})

userRouter.get('/delete_profile/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const userDatas = await userData.deleteOne({ _id: id });
      if (userDatas.deletedCount == 1) {
        const loginDatas = await loginData.deleteOne({ _id: userDatas.login_id });
        return res.status(200).json({
          Success: true,
          Error: false,
          data: userDatas,
          Message: 'Profile deleted successfully',
        });
      }
      else {
        return res.status(400).json({
          Success: false,
          Error: true,
          Message: 'Failed while deleting profile',
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

module.exports = userRouter;
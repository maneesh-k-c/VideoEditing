const express = require("express");
const userData = require("../../models/userModel");
const loginData = require("../../models/loginModel");
const requestData = require("../../models/requestModel");
const userRouter = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const editorData = require("../../models/editorModel");
const approvalData = require("../../models/approvalModel");
const { default: mongoose } = require("mongoose");
const outputData = require("../../models/outPutModel");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storageImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { content_type } = req.body;

    return {
      folder: "VideoEditing",
      resource_type: content_type === "video" ? "video" : "image", // Specify resource type
      format: content_type === "video" ? "mp4" : undefined, // Optional: convert videos to mp4
      public_id: `${Date.now()}_${file.originalname}`, // Generate a unique file ID
    };
  },
});

const uploadImage = multer({
  storage: storageImage,
  fileFilter: (req, file, cb) => {
    const videoMimeTypes = ["video/mp4", "video/avi", "video/mkv"];
    const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    console.log(file.mimetype, req);
    
    const isValid =
      (req.body.content_type === "video" && videoMimeTypes.includes(file.mimetype)) ||
      (req.body.content_type === "image" && imageMimeTypes.includes(file.mimetype));

    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type."));
    }
  },
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB limit
});

userRouter.post('/make_request', uploadImage.array('content_url', 1), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'No file uploaded. Please upload a file.',
      });
    }

    const { login_id, message, content_type } = req.body;

    if (!login_id || !message || !content_type) {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Missing required fields: login_id, message, content_type.',
      });
    }

    const data = {
      login_id,
      content_type,
      content_url: req.files.map((file) => file.path),
      description: message,
      status: 'pending',
    };

    const requestDatas = await new requestData(data).save();

    if (requestDatas) {
      return res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Content uploaded successfully.',
      });
    } else {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Failed to save request.',
      });
    }
  } catch (error) {
    console.error('Error in /make_request route:', error);

    return res.status(500).json({
      Success: false,
      Error: true,
      Message: 'An error occurred while processing the request.',
    });
  }
});

userRouter.post('/upload_output', uploadImage.array('content_url', 1), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0 || req.body.out_put_url=='') {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'No file uploaded. Please upload a file.',
      });
    }

    const { editor_login_id, description, content_type, request_id } = req.body;

    if (!editor_login_id || !description || !content_type || !request_id ) {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Missing required fields: login_id, message, content_type.',
      });
    }

    const data = {
      request_id,       
      editor_login_id,
      content_type,
      content_url: req.files.map((file) => file.path),
      description: description,
      status: 'completed',
    };

    const outputDatas = await new outputData(data).save();

    if (outputDatas) {
      return res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Content uploaded successfully.',
      });
    } else {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Failed to save request.',
      });
    }
  } catch (error) {
    console.error('Error in /upload_output route:', error);

    return res.status(500).json({
      Success: false,
      Error: true,
      Message: 'An error occurred while processing the request.',
    });
  }
});

userRouter.get('/profile/:loginId/:role', async (req, res) => {
  try {
    const id = req.params.loginId;
    const role = req.params.role;
    if (role == 'user') {
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
    } else {

      const user = await editorData.findOne({ login_id: id }).populate('login_id');
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

userRouter.get('/delete_request/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const requestDatas = await requestData.deleteOne({ _id: id });
    if (requestDatas.deletedCount == 1) {
      return res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Request has been deleted',
      });
    }
    else {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Failed while deleting request',
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

userRouter.get('/view_user_added_request/:login_id', async (req, res) => {
  try {
    const id = req.params.login_id;
    console.log(id);

    const requestDatas = await requestData.find({ login_id: id });
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

userRouter.get('/admin_view_request/', async (req, res) => {
  try {
   

    const requestDatas = await requestData.find();
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

userRouter.get('/view_single_request/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const requestDatas = await requestData.find({ _id: id });
    if (requestDatas) {
      return res.status(200).json({
        Success: true,
        Error: false,
        Data: requestDatas[0],
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

userRouter.get('/view_pending_approval_request/:id', async (req, res) => {
  try {

    const requestDatas = await approvalData.aggregate([
      {
        '$lookup': {
          'from': 'request_tbs',
          'localField': 'request_id',
          'foreignField': '_id',
          'as': 'requests'
        }
      },
      {
        '$lookup': {
          'from': 'editor_tbs',
          'localField': 'editor_login_id',
          'foreignField': 'login_id',
          'as': 'editor'
        }
      }, {
        '$lookup': {
          'from': 'output_tbs',
          'localField': 'request_id',
          'foreignField': 'request_id',
          'as': 'output'
        }
      },
      
      {
        '$unwind': '$requests'
      },
      {
        '$unwind': '$editor'
      },
      {
        '$match': {
          'request_id': new mongoose.Types.ObjectId(req.params.id)
        }
      }
    ])
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

userRouter.get('/view_out/:id', async (req, res) => {
  try {

    const requestDatas = await outputData.find({request_id:req.params.id})
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

userRouter.get('/user_accept_request/:request_id/:editor_id/:id', async (req, res) => {
  try {
    const { request_id, editor_id, id } = req.params;


    const Data = await approvalData.updateOne(
      { _id: id },
      { $set: { status: 'accepted' } }
    );

    if (Data.modifiedCount == 1) {
      const DataRequest = await requestData.updateOne(
        { _id: request_id },
        { $set: { editor_login_id: editor_id, status: 'ongoing' } }
      );
      if (DataRequest.modifiedCount == 1) {
        return res.status(200).json({
          Success: true,
          Error: false,
          Message: 'Request Confirmed',
        });
      }

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

userRouter.get('/editor_view_my_works/:id', async (req, res) => {
  try {

    const requestDatas = await requestData.aggregate([
      {
        '$lookup': {
          'from': 'user_tbs',
          'localField': 'login_id',
          'foreignField': 'login_id',
          'as': 'user'
        }
      },
      {
        '$unwind': '$user'
      },
      {
        '$match': {
          'editor_login_id': new mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        '$match': {
          'status': 'ongoing'
        }
      }
    ])
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





module.exports = userRouter;
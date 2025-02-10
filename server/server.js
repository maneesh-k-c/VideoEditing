const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const registerRouter = require('./src/routes/api/registerRouter');
const userRouter = require('./src/routes/api/userRouter');
const feedbackRouter = require('./src/routes/api/feedbackRouter');
const editorRouter = require('./src/routes/api/editorRouter');
const chatRouter = require('./src/routes/api/chatRouter');
require('dotenv').config();

app.use(express.static('./public'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log("Let's start");
});

app.use('/api/register',registerRouter);
app.use('/api/user',userRouter);
app.use('/api/feedback',feedbackRouter);
app.use('/api/editor',editorRouter);
app.use('/api/chat',chatRouter);


mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log('Database Error:', error);
});
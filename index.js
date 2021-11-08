/* eslint-disable no-undef */
const express = require('express');
const path = require('path');
const userRoute = require('./routers/userRouter');
const boardRoute = require('./routers/boardRouter');
const columnRoute = require('./routers/columnRouter');
const taskRoute = require('./routers/taskRouter');
const commentRoute = require('./routers/commentRouter');
const cors = require('cors');

const app = express();

const jsonParser = express.json();
app.use(cors({
    credentials:true
}));
app.use(jsonParser);
app.use('/user', userRoute);
app.use('/boards', boardRoute);
app.use('/boards/board', columnRoute);
app.use('/boards/board/column', taskRoute);
app.use('/avatars', express.static(path.join(__dirname,'avatars')));
app.use('/task', commentRoute);



app.listen(3003, (err) => {
    if (err) {
        console.log('Server cant start', err);
        process.exit(1);
    }
    console.log('Server has been started');
});

// const urlencodedParser = express.urlencoded({extended: false});
// app.use(urlencodedParser)
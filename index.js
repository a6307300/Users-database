const express = require("express");
const path = require("path");
const userRoute = require("./routers/userRouter");
const cors = require('cors')

const app = express();

const jsonParser = express.json();
app.use(cors({
  credentials:true
}));
app.use(jsonParser);
app.use("/user", userRoute);
app.use('/avatars', express.static(path.join(__dirname,'avatars')));



app.listen(3003, (err) => {
  if (err) {
    console.log('Server cant start', err);
    process.exit(1);
  }
  console.log("Server has been started");
});

  // const urlencodedParser = express.urlencoded({extended: false});
  // app.use(urlencodedParser)
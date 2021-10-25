const express = require("express");
const userRoute = require("./routers/userRouter");
const cors = require('cors')

const app = express();

const jsonParser = express.json();
app.use(cors());
app.use(jsonParser);
app.use("/user", userRoute);


app.listen(3003, (err) => {
  if (err) {
    console.log('Server cant start', err);
    process.exit(1);
  }
  console.log("Server has been started");
});

  // const urlencodedParser = express.urlencoded({extended: false});
  // app.use(urlencodedParser)
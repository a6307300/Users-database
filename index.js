const express = require("express");
const Sequelize = require("sequelize");
const userRoute = require ("./routers/userRouter");
const sequelize = require ("./sequelizeForModels");
const user = require("./models/User.js");
const role = require ("./models/Role.js");

const app = express();

const jsonParser = express.json();
app.use(jsonParser);

app.use("/user", userRoute);
role.hasMany(user);

async function start() {
    try {
      await sequelize.sync();
      app.listen(3000, () => {
        console.log("Server has been started");
      });
    } catch (e) {
      console.log(e);
    }
  }
  start();




  // const urlencodedParser = express.urlencoded({extended: false});
  // app.use(urlencodedParser)


  // const env = process.env.NODE_ENV || "development";
// const config = require("./config/config.json")[env];
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

const express = require("express");
const Sequelize = require("sequelize");
const userRoute = require ("./routers/userRouter");

const app = express();

app.use (userRoute);

const sequelize = new Sequelize("baseAPI", "anna", "fusion", {
    dialect: "postgres",
    host: "localhost"
});

async function start() {
    try {
      await sequelize.sync({force: true});
      app.listen(3000, () => {
        console.log("Server has been started");
      });
    } catch (e) {
      console.log(e);
    }
  }
  start();






  // const env = process.env.NODE_ENV || "development";
// const config = require("./config/config.json")[env];
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

// app.get("/create", function (req, res) {
//   res.render("create.hbs", {
//       title: "Регистрация",
//   });
// });

// app.post("/create", urlencodedParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400);
//   const username = req.body.name;
//   const useremail = req.body.email;
//   const userpassword = req.body.password;
//   const userdate = req.body.birthdate;
//   User.create({
//     fullName: username,
//     email: useremail,
//     password: userpassword,
//     dateOfBirth: userdate,
//   })
//     .then(() => {
//       res.redirect("/list");
//     })
//     .catch((err) => console.log(err));
// });

// app.get("/", function (req, res) {
//   res.render("index.hbs", {
//     title: "Аутентификация"
//   });
// });

// app.get("/info/:id", function (req, res) {
//   const userid = req.params.id;
//   User.findAll({ where: { id: userid }, raw: true })
//     .then((data) => {
//       res.render("info.hbs", {
//         title: "Данные о пользователе",
//         user: data[0],
//       });
//     })
//     .catch((err) => console.log(err));
// });

// app.post("/info", urlencodedParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400);
//     const username = req.body.name;
//     const useremail = req.body.email;
//     const userpassword = req.body.password;
//     const userdate = req.body.birthdate;
//     User.update({
//       fullName: username,
//       email: useremail,
//       password: userpassword,
//       dateOfBirth: userdate,
//     })
//       .then(() => {
//         res.redirect("/list");
//     }
//      )
//       .catch((err) => console.log(err));
//   });


// app.get("/list", function(req, res){
//     User.findAll({raw: true }).then(data=>{
//       res.render("list.hbs", {
//         users: data,
//         // title: "Список пользователей"
//       });
//     }).catch(err=>console.log(err));
// });



// userRouter.use("/create", userController.addUser);
// userRouter.use("/", userController.getUsers);
// userRouter.use("/edit/:id", userController.editUser);
// userRouter.use("/delete/:id", userController.deleteUser);
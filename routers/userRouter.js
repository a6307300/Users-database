const { Router } = require("express");
const userControllers = require("../controllers/userController.js");
const { check } = require('express-validator');
const { auth } = require("../middleware/auth");
const { authAdmin } = require("../middleware/authAdmin");


const userRouter = Router();

userRouter.get("/auth", userControllers.loginUser);
userRouter.post("/", [
    check('email', "Поле е-mail не должно быть пустым").notEmpty(),
    check('password', "Длина пароля должна составлять не менее 5 и не более 16 символов").isLength({ min: 5, max: 16 }),
],
    userControllers.addUser);
userRouter.get("/", auth, userControllers.getUsers);
userRouter.patch("/:id", auth, userControllers.editUser);
userRouter.delete("/:id", [auth, authAdmin], userControllers.deleteUser);
userRouter.post("/role", userControllers.addRole);


module.exports = userRouter;
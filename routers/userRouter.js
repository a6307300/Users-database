const {Router} = require ("express")
const userControllers = require("../controllers/userController.js");

const userRouter = Router();

userRouter.use("/create", userControllers.addUser);
userRouter.use("/", userControllers.getUsers);
userRouter.use("/edit/:id", userControllers.editUser);
userRouter.use("/delete/:id", userControllers.deleteUser);

module.exports = userRouter;
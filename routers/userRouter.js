const {Router} = require ("express")
const userControllers = require("../controllers/userController.js");

const userRouter = Router();

userRouter.post("/", userControllers.addUser);
userRouter.get("/", userControllers.getUsers);
userRouter.patch("/:id", userControllers.editUser);
userRouter.delete("/:id", userControllers.deleteUser);

module.exports = userRouter;
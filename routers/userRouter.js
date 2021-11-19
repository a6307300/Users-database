const { Router } = require('express');
const userControllers = require('../controllers/userController.js');
const { check } = require('express-validator');
const { auth } = require('../middleware/auth');
const imagesMiddleware = require ('../middleware/avatar');


const userRouter = Router();

userRouter.post('/auth', userControllers.loginUser);
userRouter.post('/', [
    check('email', 'Проверьте, пожалуйста, введенный e-mail').isEmail(),
    check('password', 'Длина пароля должна составлять не менее 3 и не более 9 символов').isLength({ min: 3, max: 9 },),
],
userControllers.addUser);
userRouter.get('/', userControllers.getUser);
userRouter.patch('/:id', auth, userControllers.editUser);
userRouter.post('/:id/avatar', [auth, imagesMiddleware.single('file')],  userControllers.uploadAvatar);


module.exports = userRouter;
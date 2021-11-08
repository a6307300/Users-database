const { Router } = require('express');
const commentControllers = require('../controllers/commentController.js');


const commentRouter = Router();

commentRouter.post('/comment/:task', commentControllers.addComment);
commentRouter.get('/comment/:task', commentControllers.getComments);
commentRouter.patch('/comments/edit/:id', commentControllers.editComment);
commentRouter.delete('/comments/:id',  commentControllers.deleteComment);


module.exports = commentRouter;
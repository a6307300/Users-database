const { Router } = require('express');
const boardControllers = require('../controllers/boardController.js');


const boardRouter = Router();

boardRouter.post('/', boardControllers.addBoard);
boardRouter.get('/', boardControllers.getBoards);
boardRouter.patch('/board/id/:id', boardControllers.editBoard);
boardRouter.delete('/board/id/:id',  boardControllers.deleteBoard);


module.exports = boardRouter;
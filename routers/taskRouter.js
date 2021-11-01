const { Router } = require('express');
const taskControllers = require('../controllers/taskController.js');


const taskRouter = Router();

taskRouter.post('/:column', taskControllers.addTask);
taskRouter.get('/:column', taskControllers.getTasks);
taskRouter.patch('/task/:id', taskControllers.editTask);
taskRouter.delete('/task/:id',  taskControllers.deleteTask);


module.exports = taskRouter;
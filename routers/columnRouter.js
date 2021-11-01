const { Router } = require('express');
const columnControllers = require('../controllers/columnController.js');


const columnRouter = Router();

columnRouter.post('/:board', columnControllers.addColumn);
columnRouter.get('/:board', columnControllers.getColumns);
columnRouter.patch('/column/id/:id', columnControllers.editColumn);
columnRouter.delete('/column/id/:id',  columnControllers.deleteColumn);


module.exports = columnRouter;
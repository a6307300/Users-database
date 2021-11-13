const db = require ('../db/models');

exports.addTask = async function (req, res) {
    try {
        const { taskName } = req.body;
        const columnID = +req.params.column;
        const notClone = await db.task.findOne({
            where: {
                taskName,
                columnID,
            }
        });
        if (notClone) {
            return res.status(400).json({
                message: 'У Вас уже есть задача с таким именем!'
            });
        }
        await db.task.create({
            taskName,
            columnID,
        });
        const newTask = await db.task.findOne({
            where: {
                taskName,
            }, raw: true
        });
        return res.json(newTask);
    }
    catch (error) {
        console.log('addTask error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async function (req, res) {
    try {
        const  id  = req.params.id;
        await db.task.destroy({
            where: {
                id,
            }
        });
        res.json(id);
    } catch (error) {
        console.log('deleteTask error', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.editTask = async function (req, res) {
    try {
        console.log(req.body);
        const { taskName, description, range } = req.body;
        const id = req.params.id;
        const changedTask = await db.task.findOne({
            where: {
                id,
            }
        });
        if (changedTask) {
            await db.task.update({
                taskName: taskName||db.task.taskName,
                description: description||db.task.description,
                range: range||db.task.range,
            },
            {
                where: {
                    id,
                }
            }
            );
            const changedTaskNew = await db.task.findOne({
                where: {
                    id,
                }, raw: true
            });
            return res.json(changedTaskNew);
        } else return res.status(403).json({ message: 'У вас нет такой задачи' });
    } catch (error) {
        console.log('editTask error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getTasks = async function (req, res) {
    try {
        // const column = +req.params.column;
        const taskList = await db.task.findAll({
            // where: {
            //     column,
            // },
            order: [
                ['range', 'DESC'],
                ['order', 'ASC'],
                ['updatedAt', 'DESC']
            ],
            raw: true });
        return res.json(taskList);
    } catch (error) {
        console.log('getTasks error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.replaceTask = async function (req, res) {
    try {
        const { current, replaced } = req.body;
        console.log(req.body);
        const currentTask = await db.task.findOne({
            where: {
                id: current,
            }
        });
        const replacedTask = await db.task.findOne({
            where: {
                id: replaced,
            }
        });
        console.log(currentTask);
        console.log(replacedTask);
        await db.task.update({
            order: replacedTask.order+1,
        },
        {
            where: {
                id: replaced,
            }
        }
        );
        
        await db.task.update({
            order: replacedTask.order,
            columnID: replacedTask.columnID,
            range: replacedTask.range,
        },
        {
            where: {
                id: current,
            }
        }
        );
        const taskList = await db.task.findAll({order: [
            ['range', 'DESC'],
            ['order', 'ASC'],
            ['updatedAt', 'DESC']
        ],
        raw: true });
        console.log(taskList);
        return res.json(taskList);

    } catch (error) {
        console.log('replaceColumns error:', error);
        return res.status(500).json({ message: error.message });
    }
};
const task = require('../db/models/Task');

exports.addTask = async function (req, res) {
    try {
        const { taskName } = req.body;
        const column = req.params.column;
        const notClone = await task.findOne({
            where: {
                taskName,
                column,
            }
        });
        if (notClone) {
            return res.status(400).json({
                message: 'У Вас уже есть задача с таким именем!'
            });
        }
        await task.create({
            taskName,
            column,
        });
        const newTask = await task.findOne({
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
        await task.destroy({
            where: {
                id,
            }
        });
        res.json(`Задача  номер ${id} удалена`);
    } catch (error) {
        console.log('deleteTask error', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.editTask = async function (req, res) {
    try {
        const { taskName, description, range } = req.body;
        const id = req.params.id;
        const changedTask = await task.findOne({
            where: {
                id,
            }
        });
        if (changedTask) {
            await task.update({
                taskName: taskName||task.taskName,
                description: description||task.description,
                range: range||task.range,
            },
            {
                where: {
                    id,
                }
            }
            );
            const changedTaskNew = await task.findOne({
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
        const column = req.params.column;
        const taskList = await task.findAll({ 
            where: { 
                column,
            }, raw: true
        });
        return res.json(taskList);
    } catch (error) {
        console.log('getTasks error:', error);
        return res.status(500).json({ message: error.message });
    }
};
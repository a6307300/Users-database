const column = require('../db/models/Column');

exports.addColumn = async function (req, res) {
    try {
        const { columnName } = req.body;
        const board = req.params.board;
        const notClone = await column.findOne({
            where: {
                columnName,
                board,
            }
        });
        if (notClone) {
            return res.status(400).json({
                message: 'У Вас уже есть колонка с таким именем!'
            });
        }
        await column.create({
            columnName,
            board,
        });
        const newColumn = await column.findOne({
            where: {
                columnName,
            }, raw: true
        });
        return res.json(newColumn);
    }
    catch (error) {
        console.log('addColumn error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteColumn = async function (req, res) {
    try {
        const  id  = req.params.id;
        const columnTarget = await column.findOne({
            where: {
                id,
            }
        });
        if (columnTarget) {
            await column.destroy({
                where: {
                    id,
                }
            });
            return res.json(`Колонка  номер ${id} удалена`);
        } else return res.status(403).json({message:`Колонки  номер ${id} не существует`});
    } catch (error) {
        console.log('deleteColumn error', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.editColumn = async function (req, res) {
    try {
        const { columnName } = req.body;
        const id = req.params.id;
        const changedColumn = await column.findOne({
            where: {
                id,
            }
        });
        if (changedColumn) {
            await column.update({
                columnName: columnName||column.columnName,
            },
            {
                where: {
                    id,
                }
            }
            );
            const changedColumnNew = await column.findOne({
                where: {
                    id,
                }, raw: true
            });
            return res.json(changedColumnNew);
        } else return res.status(403).json({ message: 'У вас нет такой колонки' });
    } catch (error) {
        console.log('editColumn error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getColumns = async function (req, res) {
    try {
        const board = req.params.board;
        const columnList = await column.findAll({ where: { board: board }, raw: true });
        return res.json(columnList);
    } catch (error) {
        console.log('getColumns error:', error);
        return res.status(500).json({ message: error.message });
    }
};
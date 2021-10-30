const board = require('../db/models/Board');

exports.addBoard = async function (req, res) {
    try {
        console.log('req.b', req.body);
        const { boardName } = req.body;
        const owner = req.params.id;
        const notClone = await board.findOne({
            where: {
                boardName: boardName,
                owner: owner
            }
        });
        if (notClon) {
            return res.status(400).json({
                message: "У Вас уже есть доска с таким именем!"
            })
        }
        await board.create({
            boardName,
            owner
        })
        const newBoard = await board.findOne({
            where: {
                boardName: boardName
            }, raw: true
        });
        return res.json(newBoard);
    }
    catch (error) {
        console.log('addUser error:', error)
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteBoard = async function (req, res) {
    try {
        const owner = req.params.id;
        const { boardName } = req.body;
        await board.destroy({
            where: {
                boardName: boardName,
                owner: owner
            }
        });
        res.json(`Доска с именем ${boardName} удалена`)
    } catch (error) {
        console.log('deleteUser error', error)
        return res.status(500).json({ message: error.message })
    }
};

exports.editBoard = async function (req, res) {
    try {
        const owner = req.params.id;
        const { boardName, newBoardName } = req.body;
        const changedBoard = await board.findOne({
            where: {
                boardName: boardName,
                owner: owner
            }
        });
        if (changedBoard) {
            await board.update({
                boardName: newBoardName || board.boardName,
            },
                {
                    where: {
                        boardName: boardName,
                        owner: owner
                    }
                }
            )
        }
        const changedBoardNew = await board.findOne({
            where: {
                boardName: newBoardName,
                owner: owner
            }, raw: true
        });
        return res.json(changedBoardNew);
    } catch (error) {
        console.log('editUser error:', error)
        return res.status(500).json({ message: error.message })
    }
};
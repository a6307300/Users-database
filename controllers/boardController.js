/* eslint-disable no-unused-vars */
const board = require('../db/models/Board');
const jwt = require('jsonwebtoken');
const { secret } = require('../tokenKey');
const sequelize = require('sequelize');
const {Op} = require('sequelize');

exports.addBoard = async function (req, res) {
    try {
        console.log('req.b', req.body);
        const { boardName } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const ownerData = jwt.verify(token, secret );
        const owner=ownerData.id;
        const notClone = await board.findOne({
            where: {
                boardName,
                owner,
            }
        });
        if (notClone) {
            return res.status(400).json({
                message: 'У Вас уже есть доска с таким именем!'
            });
        }
        await board.create({
            boardName,
            owner
        });
        const newBoard = await board.findOne({
            where: {
                boardName,
            }, raw: true
        });
        return res.json(newBoard);
    }
    catch (error) {
        if(error=='TokenExpiredError: jwt expired') {
            return res.status(401).json('11111');
        }
        console.log('addBoard error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteBoard = async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const ownerData = jwt.verify(token, secret );
        const owner=ownerData.id;
        const  id  = req.params.id;
        const boardTarget = await board.findOne({
            where: {
                id,
                owner
            }
        });
        if (boardTarget) {
            await board.destroy({
                where: {
                    id,
                }
            });
            return res.json(id);
        } else return res.status(403).json({ message: 'Доски с таким номером у Вас нет'});
    } catch (error) {
        if(error=='TokenExpiredError: jwt expired') {
            return res.status(401).json('11111');
        }
        console.log('deleteBoard error', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.editBoard = async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const ownerData = jwt.verify(token, secret );
        const owner=ownerData.id;
        const { boardName} = req.body;
        const id = +req.params.id;
        const changedBoard = await board.findOne({
            where: {
                id,
                owner,
            }
        });
        if (changedBoard) {
            await board.update({
                boardName: boardName || board.boardName,
            },
            {
                where: {
                    id,
                }
            }
            );
            const changedBoardNew = await board.findOne({
                where: {
                    id,
                }, raw: true
            });
            return res.json(changedBoardNew);
        } else return res.status(403).json({ message: 'У вас нет такой доски' });
    } catch (error) {
        console.log('editBoard error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getBoards = async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const owner = jwt.verify(token, secret );
        console.log(owner);
        const boardList = await board.findAll({ where: { owner: owner.id }, raw: true });
        return res.json(boardList);
    } catch (error) {
        if(error=='TokenExpiredError: jwt expired') {
            return res.status(401).json('11111');
        }
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.shareBoard = async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const ownerData = jwt.verify(token, secret );
        const owner=ownerData.id;
        const { contributor } = req.body;
        const id = +req.params.id;
        
        const changedBoard = await board.findOne({
            where: {
                id,
                owner,
            }
        });
        if (changedBoard) {
            if(changedBoard.contributors) {
                await board.update({
                    'contributors': sequelize.fn('array_append', sequelize.col('contributors'),contributor)
                
                },
                {
                    where: {
                        id,
                    }
                }
                );
            } else {
                const contributors2=[contributor];
                await board.update({
                    contributors: contributors2
                },
                {
                    where: {
                        id,
                    }
                }
                );
            }
            const changedBoardNew = await board.findOne({
                where: {
                    id,
                }, raw: true
            });
            return res.json(changedBoardNew);
        } else return res.status(403).json({ message: 'У вас нет такой доски' });
    } catch (error) {
        console.log('chareBoard error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getBoardsContribut = async function (req, res) {
    try {
        const { contributor, contributorId } = req.body;
        console.log(contributor);
        const boardList = await board.findAll({ 
            where: {
                contributors: {[Op.contains]:[contributor]}
            }
            , raw: true });
        return res.json(boardList);
    } catch (error) {
        if(error=='TokenExpiredError: jwt expired') {
            return res.status(401).json('jwt expired');
        }
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
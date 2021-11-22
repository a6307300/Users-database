/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const { secret } = require('../tokenKey');
const sequelize = require('sequelize');
const {Op} = require('sequelize');
const { keyPrivate } = require('../RSAprivate');

const db = require ('../db/models');

exports.addBoard = async function (req, res) {
    try {
        const { boardName } = req.body;
        const token = req.headers.authorization;
        const decoded = keyPrivate.decrypt(token, 'utf8');
        const decodedId=+decoded.slice(6,decoded.length-1);
        const notClone = await db.board.findOne({
            where: {
                boardName,
                owner:decodedId,
            }
        });
        if (notClone) {
            return res.status(400).json({
                message: 'У Вас уже есть доска с таким именем!'
            });
        }
        await db.board.create({
            boardName,
            owner:decodedId,
        });
        const newBoard = await db.board.findOne({
            where: {
                boardName,
            }, raw: true
        });
        return res.json(newBoard);
    }
    catch (error) {
        console.log('addBoard error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteBoard = async function (req, res) {
    try {
        const token = req.headers.authorization;
        const decoded = keyPrivate.decrypt(token, 'utf8');
        const decodedId=+decoded.slice(6,decoded.length-1);
        const  id  = req.params.id;
        const boardTarget = await db.board.findOne({
            where: {
                id,
                owner: decodedId,
            }
        });
        if (boardTarget) {
            await db.board.destroy({
                where: {
                    id,
                }
            });
            return res.json(id);
        } else return res.status(403).json({ message: 'Доски с таким номером у Вас нет'});
    } catch (error) {
        console.log('deleteBoard error', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.editBoard = async function (req, res) {
    try {
        const token = req.headers.authorization;
        const decoded = keyPrivate.decrypt(token, 'utf8');
        const decodedId=+decoded.slice(6,decoded.length-1);
        const { boardName} = req.body;
        const id = +req.params.id;
        const changedBoard = await db.board.findOne({
            where: {
                id,
                owner:decodedId,
            }
        });
        if (changedBoard) {
            await db.board.update({
                boardName: boardName || db.board.boardName,
            },
            {
                where: {
                    id,
                }
            }
            );
            const changedBoardNew = await db.board.findOne({
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
        const token = req.headers.authorization;
        const decoded = keyPrivate.decrypt(token, 'utf8');
        const decodedId=+decoded.slice(6,decoded.length-1);
        const boardList = await db.board.findAll({ where: { owner: decodedId }, raw: true });
        return res.json(boardList);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.shareBoard = async function (req, res) {
    try {
        const token = req.headers.authorization;
        const decoded = keyPrivate.decrypt(token, 'utf8');
        const decodedId=+decoded.slice(6,decoded.length-1);
        const { contributor } = req.body;
        const id = +req.params.id;
        
        const changedBoard = await db.board.findOne({
            where: {
                id,
                owner: decodedId,
                contributors: {[Op.contains]:[contributor]}
            }
        });
        if (!changedBoard) {
            await db.board.update({
                'contributors': sequelize.fn('array_append', sequelize.col('contributors'),contributor)
                
            },
            {
                where: {
                    id,
                }
            }
            );
            const changedBoardNew = await db.board.findOne({
                where: {
                    id,
                }, raw: true
            });
            return res.json(changedBoardNew);
        } else return res.status(400).json({ message: 'Этот контрибьютор уже заявлен в этой доске' });
    } catch (error) {
        console.log('chareBoard error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getBoardsContribut = async function (req, res) {
    try {
        const { contributor, contributorId } = req.body;
        const boardList = await db.board.findAll({ 
            where: {
                contributors: {[Op.contains]:[contributor]}
            },
            include: { model: db.user, attributes:['fullName', 'avatar'] },
        });
        return res.json(boardList);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
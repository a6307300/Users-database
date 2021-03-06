/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const { secret } = require('../tokenKey');
const { keyPrivate } = require('../RSAprivate');
const db = require ('../db/models');

exports.addComment = async function (req, res) {
    try {
        const { commentText} = req.body;
        const token = req.headers.authorization;
        const decoded = keyPrivate.decrypt(token, 'utf8');
        const decodedId=+decoded.slice(6,decoded.length-1);
        const taskID = req.params.task;
        await db.comment.create({
            comment: commentText,
            userID: decodedId,
            taskID,
        });
        const newComment = await db.comment.findOne({
            where: {
                comment: commentText,
            }, 
            include: { model: db.user, as: 'author', attributes:['fullName', 'avatar'] }
        });
        return res.json(newComment);
    }
    catch (error) {
        console.log('addComment error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteComment = async function (req, res) {
    try {
        const  id  = +req.params.id;
        const token = req.headers.authorization;
        const decoded = keyPrivate.decrypt(token, 'utf8');
        const decodedId=+decoded.slice(6,decoded.length-1);
        const targetComment = await db.comment.findOne({
            where: {
                id,
                userID: decodedId,
            }, raw: true
        });
        if (targetComment) {
            await db.comment.destroy({
                where: {
                    id,
                }
            });
            return res.json(id);
        } else return res.status(403).json('Нет права удалить этот комментарий');
    } catch (error) {
        console.log('deleteComment error', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.editComment = async function (req, res) {
    try {
        const { commentText} = req.body;
        const token = req.headers.authorization;
        const decoded = keyPrivate.decrypt(token, 'utf8');
        const decodedId=+decoded.slice(6,decoded.length-1);
        const id = +req.params.id;
        const changedComment = await db.comment.findOne({
            where: {
                id,
                userID: decodedId,
            }
        });
        if (changedComment) {
            await db.comment.update({
                comment: commentText,
            },
            {
                where: {
                    id,
                }
            }
            );
            const changedCommentNew = await db.comment.findOne({
                where: {
                    id,
                }, raw: true
            });
            return res.json(changedCommentNew);
        } else return res.status(401).json({ message: 'У вас нет доступа изменять этот комментарий' });
    } catch (error) {
        console.log('editComment error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getComments = async function (req, res) {
    try {
        const boardID = req.params.task;
        // const boardID = req.body.board;
        const commentList = await db.comment.findAll({
            include: [{ model: db.user, as: 'author', attributes:['fullName', 'avatar'] },
                { model: db.task, 
                    include: {model: db.column,
                        include: {model: db.board, 
                            where: {
                                id: boardID
                            }}
                    }
                }],
        
            order: [
                ['createdAt', 'DESC']
            ],
            // raw: true
        });
        return res.json(commentList);
    } catch (error) {
        console.log('getComments error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getComment = async function (req, res) {
    try {
        const id = req.params.id;
        const commentL = await db.comment.findOne({include: db.user});
        // const autho= await commentL.getUser();
        return res.json(commentL);
    } catch (error) {
        console.log('getComment error:', error);
        return res.status(500).json({ message: error.message });
    }
};

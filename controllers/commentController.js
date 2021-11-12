/* eslint-disable no-unused-vars */
// const comment = require('../db/models/Comment');
// const user = require ('../db/models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../tokenKey');
// const User = require('../db/models/User');

const db = require ('../db/models');

exports.addComment = async function (req, res) {
    try {
        const { commentText, authorName, authorAva} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const ownerData = jwt.verify(token, secret );
        const userID=ownerData.id;
        const taskID = req.params.task;
        await db.comment.create({
            comment: commentText,
            userID,
            taskID,
            authorName,
            authorAva,
        });
        const newComment = await db.comment.findOne({
            where: {
                comment: commentText,
            }, raw: true
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
        console.log(req.params);
        const  id  = +req.params.id;
        const token = req.headers.authorization.split(' ')[1];
        const ownerData = jwt.verify(token, secret );
        const userID=+ownerData.id;
        const targetComment = await db.comment.findOne({
            where: {
                id,
                userID,
            }, raw: true
        });
        console.log(targetComment);
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
        console.log(req.body);
        const { commentText} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const ownerData = jwt.verify(token, secret );
        const userID=ownerData.id;
        const id = +req.params.id;
        const changedComment = await db.comment.findOne({
            where: {
                id,
                userID,
            }
        });
        console.log(changedComment);
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
        const taskID = req.params.task;
        const commentList = await db.comment.findAll({where: {
            taskID,
        },
        include: { model: db.user, as: 'author1' },
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true });
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

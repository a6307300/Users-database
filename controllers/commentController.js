const comment = require('../db/models/Comment');
const jwt = require('jsonwebtoken');
const { secret } = require('../tokenKey');

exports.addComment = async function (req, res) {
    try {
        const { commentText} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const ownerData = jwt.verify(token, secret );
        const author=ownerData.id;
        const task = req.params.task;
        await comment.create({
            comment: commentText,
            author,
            task,
        });
        const newComment = await comment.findOne({
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
        const author=+ownerData.id;
        const targetComment = await comment.findOne({
            where: {
                id,
                author,
            }, raw: true
        });
        console.log(targetComment);
        if (targetComment) {
            await comment.destroy({
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
        const author=ownerData.id;
        const id = +req.params.id;
        const changedComment = await comment.findOne({
            where: {
                id,
                author,
            }
        });
        console.log(changedComment);
        if (changedComment) {
            await comment.update({
                comment: commentText,
            },
            {
                where: {
                    id,
                }
            }
            );
            const changedCommentNew = await comment.findOne({
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
        const task = req.params.task;
        const commentList = await comment.findAll({where: {
            task,
        },
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

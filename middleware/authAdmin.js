/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const { secret } = require('../tokenKey');
const NodeRSA = require('node-rsa');
const { keyPrivate } = require('../RSAprivate');

const authAdmin = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(' ')[1];
        const token = req.headers.authorization;
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Ошибка: нет ключа авторизации' });
        }
        // const candidateRole = jwt.verify(token, secret );
        const candidateRole = keyPrivate.decrypt(token, 'utf8');
        const candidate = JSON.parse(candidateRole);
        console.log(candidate);
        if ('admin' != candidate.roleUser) {
            return res.status(403).json({ message: 'У Вас нет доступа для выполнения этого действия' });
        }
    } catch (error) {
        console.log('auth error:', error);
        return res.status(500).json({ message: 'Проблема с модулем authAdmin.js' });
    }
    next();
};

module.exports = {
    authAdmin
};

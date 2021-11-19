/* eslint-disable no-unused-vars */
// const db = require('../db/models');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('../tokenKey');
var bcrypt = require('bcryptjs');
const NodeRSA = require('node-rsa');
const { keyPublic } = require('../RSApublic');
const { keyPrivate } = require('../RSAprivate');
const uuid = require ('uuid');

const db = require ('../db/models');

const generateToken = (id) => {
    const payload = {
        id,
    };
    return jwt.sign(payload, secret, { expiresIn: '24h' } );
};

exports.uploadAvatar = async function (req, res) {
    try {
        const userid = req.params.id;
        const file = req.file;
        console.log(file.path);
        await db.user.update({
            avatar: file.path,
        },
        {
            where: { id: userid }
        });
        const userTarget = await db.user.findOne({ where: { id: userid }, raw: true });
        return res.json(userTarget.avatar);
    } catch (error) {
        console.log('uploadAvatar error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async function (req, res) {
    try {
        console.log('req.b login', req.body);
        const { email, password } = req.body;
        const candidate = await db.user.findOne({ where: { email: email } });
        if (!candidate) {
            return res.status(400).json({ message: 'Пользователь с таким e-mail не существует' });
        }
        const checkPassword = bcrypt.compareSync(password, candidate.password);

        if (!checkPassword) {
            return res.status(402).json({ message: 'Неверный пароль' });
        }
        const tokenData = JSON.stringify({
            id: candidate.id,
        });
        // const token = generateToken(candidate.id);
        const token = keyPublic.encrypt(tokenData, 'base64');
        console.log({ token,candidate });
        
        return res.json({ token,candidate });

    } catch (error) {
        console.log('loginUser error', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.addUser = async function (req, res) {
    try {
        console.log('req.b', req.body);
        const { fullName, email, password, dateOfBirth } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Ошибка регистрации', errors });
        }
        const candidate = await db.user.findOne({ where: { email: email } });
        if (candidate) {
            return res.status(400).json({ message: 'Пользователь с таким e-mail уже существует' });
        }
        const hashPassword = bcrypt.hashSync(password);
        await db.user.create({
            fullName,
            email,
            password: hashPassword,
            dateOfBirth,
        });
        const userTarget = await db.user.findOne({ where: { email: email }, raw: true });
        const tokenData = JSON.stringify({
            id: userTarget.id,
        });
        // const token = generateToken(candidate.id);
        const token = keyPublic.encrypt(tokenData, 'base64');
        return res.json({token, userTarget});
    }
    catch (error) {
        console.log('addUser error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.editUser = async function (req, res) {
    try {
        const userid = req.params.id;
        console.log(req.body);
        console.log(req.params);
        const { fullName, email, password, oldPassword } = req.body;
        const userTarget = await db.user.findOne({ where: { id: +userid }, raw: true });
        console.log(userTarget);
        const checkPassword = bcrypt.compareSync(oldPassword, userTarget.password);
        console.log(checkPassword);
        if (!checkPassword) {
            return res.status(403).json('Неверный пароль');
        }
        await db.user.update({
            fullName: fullName || db.user.fullName,
            email: email || db.user.email,
            password: password?bcrypt.hashSync(password) : db.user.password,
        },
        {
            where: { id: +userid }
        });
        const candidate = await db.user.findOne({ where: { id: +userid }, raw: true });
        return res.json(candidate);
        
    } catch (error) {
        console.log('editUser error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getUser = async function (req, res) {
    try {
        const token = req.headers.authorization;
        console.log(`TOKEN                             ${token}`);
        // const candidate = jwt.verify(token, secret );
        const decoded = keyPrivate.decrypt(token, 'utf8');
        const decodedId=+decoded.slice(6,decoded.length-1);
        console.log(`DECODED                             ${decodedId}`);
        const userTarget = await db.user.findOne({ where: { id: decodedId }, raw: true });
        const name=userTarget.fullName;
        if (!userTarget) return res.status(401).json('Ошибка авторизации');
        return res.json({name,token});
    } catch (error) {
        console.log('getUser error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async function (req, res) {
    try {
        const userId = req.params.id;
        await db.user.destroy({ where: { id: userId }, raw: true });
        res.json(`пользователь c ${userId} удален`);
    } catch (error) {
        console.log('deleteUser error', error);
        return res.status(500).json({ message: error.message });
    }
};

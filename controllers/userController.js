/* eslint-disable no-unused-vars */
// const db = require('../db/models');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('../tokenKey');
var bcrypt = require('bcryptjs');
const NodeRSA = require('node-rsa');
const { keyPublic } = require('../RSApublic');
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
        // const tokenData = JSON.stringify({
        //   "id": candidate.id,
        //   "roleUser": candidate.roleValue,
        // });
        const token = generateToken(candidate.id);
        console.log({ token,candidate });
        // const token = keyPublic.encrypt(tokenData, 'base64');
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
        const token = generateToken(userTarget.id);
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
        const { fullName, email, password, oldPassword } = req.body;
        const userTarget = await db.user.findOne({ where: { id: userid }, raw: true });
        const checkPassword = bcrypt.compareSync(oldPassword, userTarget.password);
        if (checkPassword) {
            await db.user.update({
                fullName: fullName || db.user.fullName,
                email: email || db.user.email,
                password: password || db.user.password,
            },
            {
                where: { id: userid }
            });
        }
        const candidate = await db.user.findOne({ where: { id: userid }, raw: true });
        return res.json(candidate);
    } catch (error) {
        console.log('editUser error:', error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getUser = async function (req, res) {
    try {
        const token = req.headers.authorization;
        const candidate = jwt.verify(token, secret );
        console.log(candidate.id);
        const userTarget = await db.user.findOne({ where: { id: candidate.id }, raw: true });
        if (!userTarget) return res.status(401).json('Ошибка авторизации');
        return res.json({userTarget,token});
    } catch (error) {
        if(error=='TokenExpiredError: jwt expired') {
            return res.status(401).json('Срок действия ключа истек, авторизуйтесь, пожалуйста');
        }
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

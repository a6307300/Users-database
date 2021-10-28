// const db = require('../db/models');
const user = require("../db/models/User.js");
const role = require("../db/models/Role.js");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require("../tokenKey");
var bcrypt = require('bcryptjs');
const NodeRSA = require('node-rsa');
const { keyPublic } = require("../RSApublic");
const uuid = require ('uuid');



const generateToken = (id, roleUser) => {
  const payload = {
    id,
    roleUser,
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' } )
}

exports.uploadAvatar = async function (req, res) {
  try {
    const userid = req.params.id;
    const file = req.file;
    console.log(file.path)
    await user.update({
      avatar: file.path,
      },
      {
        where: { id: userid }
      });
    const userTarget = await user.findOne({ where: { id: userid }, raw: true });
    return res.json(userTarget.avatar);
  } catch (error) {
    console.log('uploadAvatar error:', error)
    return res.status(500).json({ message: error.message })
  }
};

exports.loginUser = async function (req, res) {
  try {
    console.log('req.b login', req.body);
    const { email, password } = req.body;
    const candidate = await user.findOne({ where: { email: email } });
    if (!candidate) {
      return res.status(400).json({ message: "Пользователь с таким e-mail не существует" })
    }
    const checkPassword = bcrypt.compareSync(password, candidate.password)

    if (!checkPassword) {
      return res.status(400).json({ message: "Неверный пароль" })
    }
    const tokenData = JSON.stringify({
      "id": candidate.id,
      "roleUser": candidate.roleValue,
    });
    const token = generateToken(candidate.id, candidate.roleUser);
    console.log({ token,candidate });
    // const token = keyPublic.encrypt(tokenData, 'base64');
    return res.json({ token,candidate });

  } catch (error) {
    console.log('loginUser error', error)
    return res.status(500).json({ message: error.message })
  }
}

exports.addUser = async function (req, res) {
  try {
    console.log('req.b', req.body);
    const { fullName, email, password, dateOfBirth } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Ошибка регистрации", errors })
    }
    const candidate = await user.findOne({ where: { email: email } });
    if (candidate) {
      return res.status(400).json({ message: "Пользователь с таким e-mail уже существует" })
    }
    const hashPassword = bcrypt.hashSync(password);
    await user.create({
      fullName,
      email,
      password: hashPassword,
      dateOfBirth,
    })
    const userTarget = await user.findOne({ where: { email: email }, raw: true });
    return res.json(userTarget);
  }
  catch (error) {
    console.log('addUser error:', error)
    return res.status(500).json({ message: error.message })
  }
};

exports.editUser = async function (req, res) {
  try {
    const userid = req.params.id;
    const { fullName, email, password, oldPassword } = req.body;
    const userTarget = await user.findOne({ where: { id: userid }, raw: true });
    const checkPassword = bcrypt.compareSync(oldPassword, userTarget.password)
    if (checkPassword) {
    await user.update({
      fullName: fullName||user.fullName,
      email: email || user.email,
      password: password || user.password,
    },
      {
        where: { id: userid }
      })
    }
    const userTargetNew = await user.findOne({ where: { id: userid }, raw: true });
    return res.json(userTargetNew);
  } catch (error) {
    console.log('editUser error:', error)
    return res.status(500).json({ message: error.message })
  }
};

exports.getUser = async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const candidate = jwt.verify(token, secret );
    console.log(candidate)
    const userTarget = await user.findOne({ where: { id: candidate.id }, raw: true })
    const userTargetData = {
      name: userTarget.fullName,
      email: userTarget.email,
      id: userTarget.id
    }
    res.json(true)
  } catch (error) {
    console.log('getUsers error:', error)
    return res.status(500).json({ message: error.message })
  }
};

exports.deleteUser = async function (req, res) {
  try {
    const userId = req.params.id;
    await user.destroy({ where: { id: userId }, raw: true });
    res.json(`пользователь c ${userId} удален`)
  } catch (error) {
    console.log('deleteUser error', error)
    return res.status(500).json({ message: error.message })
  }
};

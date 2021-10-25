// const db = require('../db/models');
const user = require("../db/models/User.js");
const role = require("../db/models/Role.js");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require("../tokenKey");
var bcrypt = require('bcryptjs');
const NodeRSA = require('node-rsa');
const { keyPublic } = require("../RSApublic");


// const generateToken = (id, roleUser) => {
//   const payload = {
//     id,
//     roleUser,
//   }
//   return jwt.sign(payload, secret, { expiresIn: '24h' } )
// }


exports.loginUser = async function (req, res) {
  try {
    console.log('req.b', req.body);
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
    console.log(tokenData);
    // const token = generateToken(candidate.id, candidate.roleUser);
    const token = keyPublic.encrypt(tokenData, 'base64');
    return res.json({ token });

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
    const { fullName, email, password, dateOfBirth } = req.body;
    await user.update({
      fullName,
      email,
      password,
      dateOfBirth,
    },
      {
        where: { id: userid }
      })
    const userTarget = await user.findOne({ where: { id: userid }, raw: true });
    return res.json(userTarget);
  } catch (error) {
    console.log('editUser error:', error)
    return res.status(500).json({ message: error.message })
  }
};

exports.getUsers = async function (req, res) {
  try {
    const usersList = await user.findAll({ raw: true })
    res.json(usersList)
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

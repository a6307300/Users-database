const User = require('../models/User.js');

exports.addUser = function (req, res) {
    User.create({
        fullName: "111",
        email: "111@MediaList",
        password: "userpassword",
        dateOfBirth: 1980-11-11,
    })
        .catch((err) => console.log(err));
};

exports.editUser = function (req, res) {
    const userid = req.params.id;
    User.findAll({ where: { id: userid }, raw: true })
    const username = req.body.name;
    const useremail = req.body.email;
    const userpassword = req.body.password;
    const userdate = req.body.birthdate;
    User.update({
        fullName: username,
        email: useremail,
        password: userpassword,
        dateOfBirth: userdate,
    })
        .catch((err) => console.log(err));
};

exports.getUsers = function (req, res) {
    User.findAll({ raw: true })
        .catch(err => console.log(err));
};

exports.deleteUser = function (req, res) {
    const userid = req.params.id;
    User.destroy({ where: { id: userid } })
        .catch(err => console.log(err));
};
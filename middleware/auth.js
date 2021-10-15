const jwt = require ('jsonwebtoken');
const {secret} = require ("../tokenKey");
const NodeRSA = require('node-rsa');
const {keyPrivate} = require("../RSAprivate");

const auth = (req,res,next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1]
        // console.log(token)
        const token = req.headers.authorization;

        if (!token) {
        return res.status(400).json({ message: "Пожалуйста, авторизуйтесь для доступа к этой странице" })
        }
        // const decoded = jwt.verify(token, secret);
        const decoded = keyPrivate.decrypt(token,'utf8');
        console.log(decoded);
        req.user = decoded;
    } catch (error) {
        console.log('auth error:', error)
        return res.status(400).json({ message: "Проблема в auth.js" })
      }
      next();
}

module.exports = {
    auth
}

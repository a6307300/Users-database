const jwt = require ('jsonwebtoken');
const {secret} = require ("../tokenKey");

const authAdmin = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        if (!token) {
        return res.status(400).json({ message: "Проблема авторизации" })
        }
        const candidateRole = jwt.verify(token, secret );
        console.log(candidateRole)
        if ("admin"!==candidateRole) {
        return res.status(400).json({ message: "Проблема прав доступа" })
        }
    } catch (error) {
        console.log('auth error:', error)
        return res.status(400).json({ message: "Проблема в authAdmin.js" })
      }
      next();
}

module.exports = {
    authAdmin
}

const jwt = require ('jsonwebtoken');
const {secret} = require ("../tokenKey");

const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)

        if (!token) {
        return res.status(400).json({ message: "Проблема авторизации" })
        }
        const decoded = jwt.verify(token, secret);
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

const multer = require('multer');
const uuid = require ('uuid');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '/home/fusion_tech/Documents/node/UserAPI/avatars/')
    },
    filename(req, file, cb) {
        console.log(file);
        cb(null, new Date().toISOString()+"+"+file.originalname)
    },
})

const imagesTypes = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, file, cb) => {
if (imagesTypes.includes(file.mimetype)) {
    cb(null, true)
} else cb(null, false)
}

module.exports = multer ({storage, fileFilter})
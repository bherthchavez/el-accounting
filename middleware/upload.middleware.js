// image upload
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/attachment');
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + "_" + file.originalname)
    },
})

var upload = multer({
    storage: storage
}).single('documents');

module.exports = upload;
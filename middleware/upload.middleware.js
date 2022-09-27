// image upload
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + "_" + file.originalname)
    },
})

var upload = multer({
    storage: storage
}).single('image');

module.exports = upload;
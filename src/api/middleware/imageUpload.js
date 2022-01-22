const path = require('path');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dmauomliu',
  api_key: '746423764133236',
  api_secret: 'SYfvaHyi-l-c2XpiVV-U2QnuKrQ',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'bookStore',
    allowedFormats: ['png, jpg', 'jpeg'],
    public_id: (req, file) => `${new Date().toISOString()}_${file.originalname.split('.')[0]}`,
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
module.exports = multer({storage, fileFilter});

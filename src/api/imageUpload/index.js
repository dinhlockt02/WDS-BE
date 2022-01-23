const express = require('express');
const imageUpload = require('../middleware/imageUpload');
const imageController = require('./image.controller');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.post(
  '/',
  [isAuth.isLoggedIn, isAuth.isAdmin],
  imageUpload.single('image'),
  imageController.imageUpload
);

module.exports = router;

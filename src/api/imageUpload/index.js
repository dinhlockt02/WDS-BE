const express = require('express');
const imageUpload = require('../middleware/imageUpload');
const imageController = require('./image.controller');

const router = express.Router();

router.post('/', imageUpload.single('image'), imageController.imageUpload);

module.exports = router;

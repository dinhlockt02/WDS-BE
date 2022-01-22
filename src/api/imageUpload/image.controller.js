module.exports = {
  imageUpload: (req, res, next) => {
    console.log(req.file);
    res.status(201).json({
      message: 'Upload successful',
      url: req.file.path,
    });
  },
};

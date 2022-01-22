module.exports = {
  imageUpload: (req, res, next) => {
    console.log(req.file);
    res.json(200);
  },
};

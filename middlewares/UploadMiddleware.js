const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_res, _file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};

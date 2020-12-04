const mkdirp = require('mkdirp');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dest = 'images/';
    mkdirp.sync(dest);
    callback(null, dest);
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    const extension = file.mimetype.split('/');
    req.savePath = `localhost:3000/images/${id}.${extension[1]}`;
    callback(null, `${id}.${extension[1]}`);
  },
});

const upload = multer({ storage });

module.exports = { upload };

//  https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer
//  https://github.com/expressjs/multer/issues/287

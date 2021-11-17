const multer = require("multer");

const multerConfig = {
  storage: (fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "../../../uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      cb(null, `${Date.now()}.${ext}`);
    },
  })),
};

module.exports = multerConfig;

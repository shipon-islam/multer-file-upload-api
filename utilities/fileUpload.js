const path = require("path");
const multer = require("multer");

const fileUpload = (subFolder) => {
  const uploadFolder = `${__dirname}/../public/uploads/${subFolder}`;
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, " ")
          .toLowerCase()
          .split("")
          .join("") +
        "_" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });
  const upload = multer({ storage: storage });
  return upload;
};
module.exports = fileUpload;
